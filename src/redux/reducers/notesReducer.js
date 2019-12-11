const INITIAL_STATE = {
    content: '',
    username: '',
    email: '',
    notes: [],
    newNotes: '',
    noteID: '',
    previousNotes: '',
    isEditSubmitted: false,
    isEditClicked: false,
    isNoteAdded: false,
  };
  
  const notesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_EMAIL':
        return{
          ...state,
          email: action.email,
        };
      case 'SET_NOTES':
        return{
          ...state,
          notes: action.notes,
        };
      case 'SET_NOTE_ID':
        return{
          ...state,
          noteID: action.noteID,
        };
      case 'SET_NEW_NOTES':
        return{
          ...state,
          newNotes: action.newNotes,
        };
      case 'SET_CONTENT':
        return {
          ...state, 
          content: action.content,
        };
      case 'SET_PREVIOUS_NOTES':
        return{
          ...state,
          previousNotes: action.previousNotes,
        };
      case 'SET_USERNAME':
        return {
          ...state, 
          username: action.username,
        };
      case 'SET_IS_NOTE_ADDED':
        return {
          ...state, 
          isNoteAdded: action.isNoteAdded,
        };
        case 'SET_IS_EDIT_CLICKED':
          return{
            ...state,
            isEditClicked: action.isEditClicked,
          };
        case 'SET_IS_EDIT_SUBMITTED':
          return{
            ...state,
            isEditSubmitted: action.isEditSubmitted,
          };
      default:
        return state;
    }
  };
  
  export default notesReducer;
  
  