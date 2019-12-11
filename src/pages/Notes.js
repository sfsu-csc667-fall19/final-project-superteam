import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { getAllNotes, setIsNoteAdded, setIsEditClicked, setNoteID, setIsEditSubmitted, setPreviousNotes } from '../redux/actions/notesActions';
import EditNote from './EditNote';

const Notes = ({ dispatch, notes, isNoteAdded, isLoggedIn, username, isEditClicked, isEditSubmitted }) => {

    useEffect(() => {
        dispatch(getAllNotes());
        dispatch(setIsNoteAdded(false));//reset after new notes have been created
        dispatch(setIsEditSubmitted(false));
    }, [isNoteAdded, isEditSubmitted]);//update each time isNotesAdded changes

    const editClick = (e, id, content) => {
        //click counts can be added here
        e.preventDefault();
        dispatch(setNoteID(id));
        dispatch(setPreviousNotes(content));
        dispatch(setIsEditClicked(true));
    }

    const editButton = (id, content) => (
        <Button 
            variant="outline-danger" 
            size='sm'
            style={{fontSize:'9px', float: 'right', display:'inline-block'}}
            onClick={ e => editClick(e, id, content)}
        >
            edit
        </Button>
    )

    const showAllNotes = (
        <Container className='mt-3 col-sm-8'>
            <Row>
                {notes.map((note, i) => (
                    <Col key={i} className='mb-3 col-sm-12'>
                        <Card>
                            <div style={{margin: '4px 4px 4px 4px'}}>
                                <p style={{fontSize:'12px', display:'inline-block'}}>Posted by {note.username} at {note.dateCreated} </p>
                                {isLoggedIn && note.username === username? editButton(note._id, note.content) : null}
                            </div>
                            <div style={{margin: '4px 4px 4px 4px'}}>
                                <p>{note.content}</p>
                            </div>
                        </Card>
                    </Col>
                )).reverse() /*print the most recent added notes first*/}
            </Row>
        </Container>   
    )

    return (
        <Container>
            {isEditClicked? <EditNote/> : showAllNotes}
        </Container>
    )
}

const mapStateToProps = state => ({
    notes: state.notesReducer.notes,
    email: state.notesReducer.email,
    isEditClicked: state.notesReducer.isEditClicked,
    isEditSubmitted: state.notesReducer.isEditSubmitted,
    isNoteAdded: state.notesReducer.isNoteAdded,
    previousNotes: state.notesReducer.previousNotes,
    noteID: state.notesReducer.noteID,
    isLoggedIn: state.loginReducer.isLoggedIn,
    username: state.loginReducer.username,
});

export default connect(mapStateToProps)(Notes);