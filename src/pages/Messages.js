import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({ senderName, messages }) => (
    <ScrollToBottom > 
        {messages.map((message, i) => (    
          <Message key={i} message={message} senderName={senderName}/>
      ))}
    </ScrollToBottom>
);

const mapStateToProps = state => ({
    messages: state.topicReducer.messages,
    senderName: state.topicReducer.senderName,
});

export default connect(mapStateToProps)(Messages);
