import axios from 'axios';

export const setNotes = notes => ({ 
    type: 'SET_NOTES',
    notes,
});
export const setNoteID = noteID => ({
    type: 'SET_NOTE_ID',
    noteID,
});
export const setNewNotes = newNotes => ({ 
    type: 'SET_NEW_NOTES',
    newNotes,
});
export const setEmail = email => ({
    type: 'SET_EMAIL',
    email,
});
export const setContent = content => ({ 
    type: 'SET_CONTENT',
    content,
});
export const setPreviousNotes = previousNotes => ({ 
    type: 'SET_PREVIOUS_NOTES',
    previousNotes,
});

export const setUsername = username => ({ 
    type: 'SET_CONTENT',
    username,
});

export const setIsNoteAdded = isNoteAdded => ({ 
    type: 'SET_IS_NOTE_ADDED',
    isNoteAdded,
});

export const setIsEditClicked = isEditClicked => ({
    type: 'SET_IS_EDIT_CLICKED',
    isEditClicked,
});
export const setIsEditSubmitted = isEditSubmitted => ({
    type: 'SET_IS_EDIT_SUBMITTED',
    isEditSubmitted,
});

export const getAllNotes = () => (dispatch, getState) => {
    axios.get('/service2/notes')
    .then((res) => {
        dispatch(setNotes(res.data))
    })
    .then(console.log);
}

export const updateNote = () => (dispatch, getState) => {
    const { newNotes, noteID } = getState().notesReducer;
    axios.get(`/service2/update?id=${noteID}&notes=${newNotes}`)
        .then(response => { 
            console.log(response);
        })
        .catch(err => {
            console.log('error: ' + err);
        })
}

export const addNotes = () => (dispatch, getState) => {
    const { content } = getState().notesReducer;
    const { email, username } = getState().loginReducer;
    return axios.post('/service2/newNotes', {
        content: content,
        username: username,
        email: email
    })
    .then(response => {
        if(response.data.response){
            dispatch(setEmail(response.data.email))
            return true;
        }else{
            return false;
        }
    })
    .catch(err => {
        console.log('error: '+ err);
    });
}









  