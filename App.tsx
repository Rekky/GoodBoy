import React from 'react';
import firebase from 'firebase';
import AuthNavigator from "./src/navigation/AuthNavigator";
import {environment} from "./src/environment/environment";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(environment.firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
  }

  return (
      <AuthNavigator />
  );
}