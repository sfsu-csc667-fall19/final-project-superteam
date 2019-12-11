import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({ username, messages }) => (
    <ScrollToBottom > 
        {messages.map((message, i) => (    
          <Message key={i} message={message} username={username}/>
      ))}
    </ScrollToBottom>
);

const mapStateToProps = state => ({
    messages: state.topicReducer.messages,
    username: state.loginReducer.username,
});

export default connect(mapStateToProps)(Messages);
