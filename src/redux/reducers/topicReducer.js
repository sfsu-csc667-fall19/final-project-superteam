const INITIAL_STATE = {
    topic: '',
    currentTopic: '',
    message: '',
    senderName: '',
    allTopic: [],
    messages: [],
    isNewTopicAdded: false,
  };
  
  const topicReducer = (state = INITIAL_STATE, action) => {
    // Step 3 create switch for action types
    switch (action.type) {
        case 'SET_TOPIC':
            return {
                ...state, 
                topic: action.topic,
            };
        case 'SET_ALL_TOPIC':
            return {
                ...state, 
                allTopic: action.allTopic,
        };
        case 'SET_MESSAGE':
            return {
                ...state, 
                message: action.message,
        };
        case 'SET_CURRENT_TOPIC':
            return {
                ...state, 
                currentTopic: action.currentTopic,
        };
        case 'SET_MESSAGES':
            return {
                ...state, 
                messages: [...state.messages, action.messages],
        };
        case 'SET_SENDER_NAME':
            return {
                ...state, 
                senderName: action.senderName,
        };
        case 'SET_IS_NEW_TOPIC_ADDED':
          return {
              ...state, 
              isNewTopicAdded: action.isNewTopicAdded,
        };
      default:
        return state;
    }
  };
  
  export default topicReducer;
  
  