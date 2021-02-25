import { useEffect, useContext } from 'react'
import firebase from '../../firebase'
import UserContext from './UserContext'

/* 
 * This component is an empty div.
 * It is meant to be displayed at the top level, but outside
 * the router, so that on refresh, this component will trigger
 * the state update to load the current user.
 */

function UserAuth() {

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(fireUser => {
          setUser(fireUser);
          if (user) signInUser(user);
        });
        return () => unregisterAuthObserver();
      }, [user, setUser]);

    return <></>;
}

// Checks for user entry in DATABASE.
// If user exists, call updateExistingUser.
// If new user, call setupNewUser.
function signInUser(user) {
  const userRef = firebase.database().ref('users/' + user.uid);
  userRef.on('value', (snapshot) => {
    snapshot.exists() ? updateExistingUser(user) : setupNewUser(user);
  });
}

// Prompt user for Canvas token, then set user's entry
// in DATABASE to include the token.
function setupNewUser(user) {
  const token = prompt("Please enter your Canvas token:");
  const userRef = firebase.database().ref('users/' + user.uid)
  userRef.set({
    canvas_token: token,
    email: user.email
  });
}

// Do some stuff, like calling the Canvas API to get fresh data.
function updateExistingUser(user) {
  const userRef = firebase.database().ref('users/' + user.uid);
  userRef.on('value', (snapshot) => {
     console.log(snapshot.val().canvas_token);
  });
}

export default UserAuth;