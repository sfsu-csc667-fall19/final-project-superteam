import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../App.css';

//const levenSort = require('leven-sort')

const Messenger = ({ user, messages }) => {
    React.useEffect(() => {
        axios.get('/service1/search')
            .then((res) => {
                setUserList(res.data);
            })
            .catch(console.log);
    }, [])

    // console.log('user.groups: ', JSON.stringify(user.groups));

    const [userList, setUserList] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [chatMembers, setChatMembers] = React.useState([]);

    // console.log('chatMembers: ', JSON.stringify(chatMembers));
    // console.log("messenger.js: user._id: ", user._id);
    
    const logOut = () => {
        axios.post('/service1/logout', { withCredentials: true })
        .then((res) => {
            document.cookie = 'username=username';
            document.cookie = 'password=password';
            
            window.location = '/';
        })
        .catch(console.log);
    }
    
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
                    if (userList[i].username !== user.username) {
                        temp.push(userList[i]);
                    }
                }
            }
        }
        // Sorting users by edit distance.
        setUsers(temp);
    }
    
    const createChat = (id) => {
        // console.log('user_id= ' + id);
        addToGroup(id);
        const members = chatMembers;
        // console.log('chatMembers: ', chatMembers);
        const body = {
            members: members,
        }
        // console.log('body: ' + JSON.stringify(body));
        axios.post('/service2/create', body)
        .then((res) => {
            console.log(res);
        })
        .catch(console.log);
    }
    
    /*JORDAN
    trying to implement an add to group, before creating chat
    */
   const addToGroup = (id) => {
       setChatMembers(chatMembers => chatMembers.concat(id));
       // console.log('chatMembers: ', chatMembers);
    }
   
    
    /*
    JORDAN
    */
    const sendMessage = () => {
        const data = {
            type: 'SEND_MESSAGE',
            newMessage: message,
        }
        window.ws.send(JSON.stringify(data));
        setMessage('');
    };

    let componentMain =
        <div className="main">
            <div className="side-bar">

            </div>
            <div className="chat-area">
                {messages.map((message, i) => <div key={i} className="message">{message}</div>)}


                <div className="message-field">
                    <input
                        value={message}
                        placeholder="Send Message..."
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>

    if (query !== '') {
        componentMain =
            <div>
                {users.map((user, i) => (
                    <div key={i} className="search-result">
                        <div>
                            <h3>{user.firstName} {user.surname}</h3>
                            <p>{user.username}</p>
                        </div>
                        <button onClick={() => addToGroup(user._id)}>Add</button>
                    </div>
                ))}
                <div className="search-result">
                    <button onClick={() => createChat(user._id)}>Chat</button>
                </div>
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
            {componentMain}
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.userReducer.user,
    messages: state.messagesReducer.messages,
});

export default connect(mapStateToProps)(Messenger);