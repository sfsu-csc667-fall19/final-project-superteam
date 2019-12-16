import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { setIsLoading } from '../redux/actions/userActions';
import { updateMessages, handleTextChange, submitMessage } from '../redux/actions/messageActions';
import { updateGroups, handleGroupChange, submitGroup } from '../redux/actions/groupActions';
import '../App.css';

const Messenger = ({ dispatch, isLoading, text, currentGroup, groups, messages }) => {
    React.useEffect(() => {
        axios.get('/users/verify', { withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch(() => {
                window.location = '/';
            });
        axios.get('/users/getUsers', { withCredentials: true })
            .then((res) => {
                setUserList(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
        axios.get('/messenger/getMessages', { withCredentials: true })
            .then((res) => {
                dispatch(updateMessages(res.data));
            })
            .catch((e) => {
                console.log(e);
            });
        axios.get('/messenger/getGroups', { withCredentials: true })
            .then((res) => {
                dispatch(updateGroups(res.data));
                dispatch(setIsLoading(false));
            })
            .catch((e) => {
                console.log(e);
            });
    }, [dispatch]);

    const [userList, setUserList] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [query, setQuery] = React.useState('');

    const logOut = () => {
        axios.post('/users/logout')
            .then(() => {
                document.cookie = 'id=id';
                document.cookie = 'username=username';
                document.cookie = 'password=password';
                document.cookie = 'firstName=firstName';
                document.cookie = 'lastName=lastName';

                window.location = '/';
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const search = (e) => {
        setQuery(e.target.value);

        var regex = '/' + e.target.value.replace(new RegExp('[^a-zA-Z0-9]'), '') + '/';

        const temp = [];
        if (regex === '//') {
            setUsers([])
        } else {
            for (var i = 0; i < userList.length; i++) {
                // eslint-disable-next-line
                if (userList[i].username.match(eval(regex))) {
                    if (userList[i].username !== Cookies.get('username')) {
                        temp.push(userList[i]);
                    }
                }
            }
        }
        setUsers(temp);
    }

    const sendMessage = () => {
        dispatch(submitMessage());
    }

    const createChat = (them) => {
        const body = {
            you: [Cookies.get('username'), Cookies.get('firstName') + ' ' + Cookies.get('lastName')],
            them: them,
        }
        dispatch(submitGroup(body));
        setQuery('');
    }

    const textChange = (e) => {
        dispatch(handleTextChange(e.target.value));
    }

    const groupChange = (group) => {
        dispatch(handleGroupChange(group));
    }

    const inGroup = (members) => {
        for (var i=0; i < members.length; i++) {
            if (Cookies.get('username') === members[i][0]) {
                return true;
            }
        }
        return false;
    }

    let mainComponent =
        <div className="main">
            <div className="side-bar">
                {groups.map((group, i) =>
                    (inGroup(group.members)) ? (
                        <div key={i}>
                            <button onClick={() => groupChange(group)}>
                                {group.members.map((member, i) => 
                                    (member[0] !== Cookies.get('username')) && (
                                        member[1]
                                    )
                                )}
                                <br />
                            </button>
                        </div>
                    ) : (
                        <div key={i}></div>
                    )
                )}
            </div>
            <div className="chat-area">
                {messages.map((message, i) =>
                    ((message.group === currentGroup._id) && (message.author === Cookies.get('firstName') + ' ' + Cookies.get('lastName'))) ? (
                        <div key={i} className="message right">
                            <p>{message.author}</p>
                            <div className="message-container">
                                <div className="your-message">
                                    {message.message}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ((message.group === currentGroup._id) && (message.author !== Cookies.get('firstName') + ' ' + Cookies.get('lastName'))) && (
                            <div key={i} className="message">
                                <p>{message.author}</p>
                                <div className="message-container">
                                    <div className="other-message">
                                        {message.message}
                                    </div>
                                </div>
                            </div>
                        ) 
                    )
                )}
                <div className="message-field">
                    <input
                        placeholder="Send Message..."
                        value={text}
                        onChange={textChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>

    if (query !== '') {
        mainComponent =
            <div>
                {users.map((user, i) => (
                    <div key={i} className="search-result">
                        <div>
                            <h3>{user.firstName} {user.surname}</h3>
                            <p>{user.username}</p>
                        </div>
                        <button onClick={() => createChat([user.username, user.firstName + ' ' + user.lastName])}>Chat</button>
                    </div>
                ))}
            </div>
    }

    return (
        <div className="messenger">
            <nav>
                <input
                    placeholder="Search User..."
                    value={query}
                    onChange={search}
                />
                <button onClick={logOut}>Log Out</button>
            </nav>
            {mainComponent}
        </div >
    );
};

const mapStateToProps = state => ({
    isLoading: state.userReducer.isLoading,
    text: state.messageReducer.text,
    currentGroup: state.groupReducer.group,
    groups: state.groupReducer.groups,
    messages: state.messageReducer.messages,
});

export default connect(mapStateToProps)(Messenger);