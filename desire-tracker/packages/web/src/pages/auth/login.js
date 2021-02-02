import React from 'react';
import { Redirect } from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase";
// Locals
import { configui } from "./config";
import { useIsLoggedIn } from "./hooks";

const Login = () => {
  const isLoggedIn = useIsLoggedIn();
  if (isLoggedIn) return <Redirect to="/" />

  return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={configui} firebaseAuth={firebase.auth()}/>
      </div>
  )
}

export default Login;