import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { setMessage } from '../redux/actions/topicActions';

const Input = ({ dispatch, message, sendMessage }) => {

    const onClick = (e) => {
        e.preventDefault();
        sendMessage();
    }

    return(
        <Form>
            <Form.Group>
                <Form.Control 
                    type='text'
                    placeholder= 'Type a message...'
                    value={message}
                    onChange ={ e => dispatch(setMessage(e.target.value))}
                />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={onClick}>
                send
            </Button>
        </Form> 
    )
}

const mapStateToProps = state => ({
    message: state.topicReducer.message,
});

export default connect(mapStateToProps)(Input);
