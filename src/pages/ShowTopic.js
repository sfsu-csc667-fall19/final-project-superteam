import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import Topic from './Topic';
import { getAllTopic, setIsNewTopicAdded } from '../redux/actions/topicActions';


const ShowTopic = ({dispatch, isNewTopicAdded, allTopic}) => {

    useEffect(() => {
        dispatch(getAllTopic());
        dispatch(setIsNewTopicAdded(false));
    }, [isNewTopicAdded]);

    return(
        <ScrollToBottom>
            {allTopic.map((subject, i) => (    
                <Topic key={i} topic={subject.topic}/>
            ))}
        </ScrollToBottom>

    )
}

const mapStateToProps = state => ({
    topic: state.topicReducer.topic,
    allTopic: state.topicReducer.allTopic,
    isNewTopicAdded: state.topicReducer.isNewTopicAdded,
})

export default connect(mapStateToProps)(ShowTopic);