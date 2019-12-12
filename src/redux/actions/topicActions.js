import axios from 'axios';


export const setTopic = topic => ({ 
    type: 'SET_TOPIC',
    topic,
  });
  export const setMessages = messages => ({ 
    type: 'SET_MESSAGES',
    messages,
  });
  export const setMessage = message => ({ 
    type: 'SET_MESSAGE',
    message,
  });
  export const setSenderName = senderName => ({ 
    type: 'SET_SENDER_NAME',
    senderName,
  });

  export const setIsNewTopicAdded = isNewTopicAdded => ({ 
    type: 'SET_IS_NEW_TOPIC_ADDED',
    isNewTopicAdded,
  });

  export const setCurrentTopic = currentTopic => ({ 
    type: 'SET_CURRENT_TOPIC',
    currentTopic,
  });

  export const setAllTopic = allTopic => ({ 
    type: 'SET_ALL_TOPIC',
    allTopic,
  });

export const addNewTopic = () => (dispatch, getState) => {
    const { topic } = getState().topicReducer;
    const { username } = getState().loginReducer;
    return axios.post('/service2/newTopic', {
        topic: topic,
        username: username
    })
    .then(response => {
        if(response.data.response) {
            return true;
        }else{
            return false;
        }
    })
}

export const getAllTopic = () => (dispatch, getState) => {
    axios.get('/service2/topic')
        .then((res) => {
            dispatch(setAllTopic(res.data));
        })
        .then(console.log);
}

