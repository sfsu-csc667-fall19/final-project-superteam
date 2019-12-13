import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setIsLoading } from '../redux/actions/userActions';
import { updateMessages, handlTextChange, submitMessage } from '../redux/actions/messageActions';
import '../App.css';

const Messenger = ({ dispatch, isLoading, text, messages }) => {
    React.useEffect(() => {
        axios.get('/users/verify', { withCredentials: true })
            .then((res) => {
                console.log(res);
                setName(res.data);
            })
            .catch(() => {
                window.location = '/';
            });
        axios.get('/messenger/getMessages', { withCredentials: true })
            .then((res) => {
                setGroups(res.data.groups);
                dispatch(updateMessages(res.data.messages));
                console.log(res.data);
                dispatch(setIsLoading(false));
            })
            .catch((e) => {
                console.log(e);
            });
        axios.get('/users/getUsers', { withCredentials: true })
            .then((res) => {
                setUserList(res.data);
            })
            .catch((e) => {
                console.log(e);
            });

    }, [dispatch]);

    const [name, setName] = React.useState('');
    const [userList, setUserList] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [groups, setGroups] = React.useState([]);
    const [currentGroup, setCurrentGroup] = React.useState('');

    const search = (query) => {
        setQuery(query);

        // Dealt with possible injection attack by only keeping alphanumerical input.
        var regex = '/' + query.replace(new RegExp('[^a-zA-Z0-9]'), '') + '/';

        const temp = [];
        if (regex === '//') {
            setUsers([])
        } else {
            for (var i = 0; i < userList.length; i++) {
                // eslint-disable-next-line
                if (userList[i].username.match(eval(regex))) {
                    //if (userList[i].username !== user.username) {
                    temp.push(userList[i]);
                    //}
                }
            }
        }
        // Sorting users by edit distance.
        setUsers(temp);
    }

    const createChat = (id) => {
        const body = {
            you: id,
        }
        axios.post('/users/createGroup', body, { withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch(console.log);
    }

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

    const onSubmit = () => {
        dispatch(submitMessage(currentGroup));
    }

    const handleTextChange = (e) => {
        dispatch(handlTextChange(e.target.value));

        console.log(groups.map((group) => group))
        console.log(messages.map((message) => message.group === currentGroup && (message)))
    }

    let sideComponent = <div></div>

    let messagesComponent = <div></div>

    if (!isLoading) {
        sideComponent =
            <div>
                {groups.map((group, i) =>
                    <div key={i}>
                        <button onClick={() => setCurrentGroup(group.group)}>{group.group}</button>
                    </div>
                )}
            </div>

        messagesComponent =
            <div>
                {messages.map((message, i) =>
                    ((message.group === currentGroup) && (message.author !== name)) ? (
                        <div key={i} className="message">
                            <p>{message.author}</p>
                            <div className="message-container">
                                <div className="other-message">
                                    {message.message}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ((message.group === currentGroup) && (message.author === name)) ? (
                            <div key={i} className="message right">
                                <p>{message.author}</p>
                                <div className="message-container">
                                    <div className="your-message">
                                        {message.message}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key={i}>
                            </div>
                        )
                    )
                )}
            </div>
    }

    let mainComponent =
        <div className="main">
            <div className="side-bar">
                {sideComponent}
            </div>
            <div className="chat-area">
                {messagesComponent}
                <div className="message-field">
                    <input
                        placeholder="Send Message..."
                        value={text}
                        onChange={handleTextChange}
                    />
                    <button onClick={onSubmit}>Send</button>
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
                        <button onClick={() => createChat(user._id)}>Chat</button>
                    </div>
                ))}
            </div>
    }

    return (
        <div className="messenger">
            <nav>
                <input
                    placeholder="Search User..."
                    onChange={e => search(e.target.value)}
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
    messages: state.messageReducer.messages,
});

export default connect(mapStateToProps)(Messenger);