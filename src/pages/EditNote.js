import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form } from 'react-bootstrap';
import { updateNote, setNewNotes, setIsEditSubmitted, setIsEditClicked, setPreviousNotes} from '../redux/actions/notesActions';

const EditNote = ({ dispatch, previousNotes }) => {

    const submitUpdate = (e) => {
        e.preventDefault();
        dispatch(updateNote());
        dispatch(setIsEditSubmitted(true));
        dispatch(setIsEditClicked(false));
        dispatch(setPreviousNotes(''));
    }

    const editForm = (
        <Form className="container mt-5 col-sm-8">
            <Form.Group>
                <Form.Label>Enter New Notes </Form.Label>
                <Form.Control as='textarea' rows='2'
                    type='text'
                    defaultValue={previousNotes}
                    placeholder= 'Enter new notes here...'
                    onChange={e => dispatch(setNewNotes(e.target.value))}
                />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={submitUpdate}>
                Submit
            </Button>
        </Form> 
    )

    return (
        <Container>
            {editForm}
        </Container>
    )
}

const mapStateToProps = state => ({
    previousNotes: state.notesReducer.previousNotes,
    isEditClicked: state.notesReducer.isEditClicked,
    isEditSubmitted: state.notesReducer.isEditSubmitted,
});

export default connect(mapStateToProps)(EditNote);