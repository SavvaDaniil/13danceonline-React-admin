import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {Provider} from "react-redux";
import {createStore} from "redux";

const initialState = {
  url : "https://13danceonline.com",
  //url : "http://13danceonline-local.com",
  token : "",
  auth : 1
};

function reducerAuth(state = initialState, action){
  switch(action.type){
    case "login":
      initialState["token"] = action.value;
      initialState["auth"] = 2;
      return initialState;
    case "logout":
      initialState["token"] = "";
      initialState["auth"] = 1;
      return initialState;
    default:
      return state;
  }
}

const store = createStore(reducerAuth)
/*
store.subscribe(() => 
  console.info("Обновился store "+ store.getState()["token"] + " " + store.getState()["auth"])
)
*/


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
