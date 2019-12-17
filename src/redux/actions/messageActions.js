import axios from 'axios';

export const updateMessages = messages => {
    return {
        type: 'UPDATE_MESSAGES',
        messages,
    };
};

export const insertMessage = message => {
    return {
        type: 'INSERT_MESSAGE',
        message,
    };
};

export const handleTextChange = text => {
    return {
        type: 'UPDATE_TEXT',
        text,
    };
};

export const submitMessage = () => (dispatch, getState) => {
    const docs = {
        group: getState().groupReducer.group._id,
        message: getState().messageReducer.text,
    }
    axios.post('/messenger/postMessage', docs, { withCredentials: true })
        .then(() => { })
        .catch(e => console.log(e));
    dispatch(handleTextChange(''));
};