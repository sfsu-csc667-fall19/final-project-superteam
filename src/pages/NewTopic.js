import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Button, Form } from "react-bootstrap";
import { setTopic, setIsNewTopicAdded, addNewTopic } from '../redux/actions/topicActions';

const NewTopic = ({dispatch, topic}) => { 

  const onClick = (e) => {
    e.preventDefault();
    dispatch(addNewTopic()).then((res) => {
      if(res === true) {
        dispatch(setIsNewTopicAdded(true));
        dispatch(setTopic('')); // clear the text field 
      }
    });
  }

  return (
    <Form>
        <Form.Group>
            <Form.Control 
                type='text'
                placeholder= 'Create a new topic...'
                value={topic}
                onChange = {e => dispatch(setTopic(e.target.value))}
            />
        </Form.Group>
        <Button variant='primary' type='submit'
          onClick={onClick}
        >
            +
        </Button>
    </Form> 
  );
}

const mapStateToProps = state => ({
  topic: state.topicReducer.topic,
  isNewTopicAdded: state.topicReducer.isNewTopicAdded,
});

export default connect(mapStateToProps)(NewTopic);
