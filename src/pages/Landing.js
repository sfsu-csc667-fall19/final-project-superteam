import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChatRoom from './ChatRoom';
import ShowTopic from './ShowTopic';

const Landing = ({ isLoggedIn, loggedInUser }) => {

  let landing;

  if(isLoggedIn){
    //NewNotes form is hidden in the landing page if user is editing the notes
    landing = <div>
                <ChatRoom/>
              </div>
  }else{
    landing = <ShowTopic/>
  }

    return (
      <Container>
        {landing}
      </Container>
    )
}

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn,
  loggedInUser: state.loginReducer.loggedInUser,
})

export default connect(mapStateToProps)(Landing);