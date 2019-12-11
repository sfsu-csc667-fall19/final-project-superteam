import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Notes from './Notes';

 
const Landing = ({ isLoggedIn, isEditClicked, loggedInUser }) => {

  let landing;

  if(isLoggedIn && !isEditClicked){
    //NewNotes form is hidden in the landing page if user is editing the notes
    landing = <div>
                <Notes/>
              </div>
  }else{
    landing = <Notes/>
  }

    return (
      <Container>
        {loggedInUser.map((user) => (
                    <p>{user}</p>
                ))}
        {landing}
      </Container>
    )
}

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn,
  loggedInUser: state.loginReducer.loggedInUser,
  isEditClicked: state.notesReducer.isEditClicked,
})

export default connect(mapStateToProps)(Landing);