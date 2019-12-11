import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import Messages from "./Messages";
import NewTopic from "./NewTopic";
import ShowTopic from './ShowTopic';
import Input from "./Input";
import io from "socket.io-client";
import { setMessages, setMessage } from '../redux/actions/topicActions';

let socket;

const ChatRoom = ({dispatch, currentTopic, username, messages, message}) => {

  const ENDPOINT = 'http://localhost:3003';
  
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', {username, currentTopic}, (err) => {
      if(err) {
        alert(err);
      }
    });
  }, [currentTopic]);

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(setMessages(message.text));
    }, [messages]);

    return () => {
      socket.emit('disconnect', (username, currentTopic));
      socket.off();
    }
  })

  const sendMessage = () => {
    if(message) {
      const data = {
        message: message,
        currentTopic: currentTopic,
      }
      socket.emit('sendMessage', data, () => dispatch(setMessage('')));
    }
  }

  return (
    <Container className="container mt-5">
        <Row>
          <Col sm={4} style={{backgroundColor: '#c1e5f7'}}>
            <NewTopic/>
            <ShowTopic/>
          </Col>
          <Col sm={8} style={{backgroundColor: '#ebf3fc'}}>
            <Messages/>
            <Input sendMessage={sendMessage}/>   
          </Col>
        </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  username: state.loginReducer.username,
  messages: state.topicReducer.messages,
  message: state.topicReducer.message,
  currentTopic: state.topicReducer.currentTopic,
});

export default connect(mapStateToProps)(ChatRoom);
