import axios from 'axios';

export const updateGroups = groups => {
    return {
        type: 'UPDATE_GROUPS',
        groups,
    };
};

export const insertGroup = newGroup => {
    return {
        type: 'INSERT_GROUP',
        newGroup,
    };
};

export const handleGroupChange = group => {
    return {
        type: 'UPDATE_GROUP',
        group,
    };
};

export const submitGroup = (docs) => (dispatch) => {
    axios.post('/messenger/postGroup', docs)
        .then((docs) => { 
            dispatch(handleGroupChange(docs.data));
        })
        .catch(e => console.log(e));
};