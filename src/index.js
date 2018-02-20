import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB7ltyHhf1nCjDFU3foh_U1m_8AWUipd7c",
  authDomain: "swichelecki-6ca15.firebaseapp.com",
  databaseURL: "https://swichelecki-6ca15.firebaseio.com",
  projectId: "swichelecki-6ca15",
  storageBucket: "swichelecki-6ca15.appspot.com",
  messagingSenderId: "239858227302"
};

firebase.initializeApp(config);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
