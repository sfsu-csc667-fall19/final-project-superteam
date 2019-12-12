import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentTopic } from '../redux/actions/topicActions';

const Topic = ({ topic, dispatch }) => {
    return(
        <Link onClick={e => topic ? dispatch(setCurrentTopic(topic)) : e.preventDefault()}>
            <h3>#{topic}</h3>
        </Link>
    ) 
}

const mapStateToProps = state => ({
    currentTopic: state.topicReducer.currentTopic,
})

export default connect(mapStateToProps)(Topic);