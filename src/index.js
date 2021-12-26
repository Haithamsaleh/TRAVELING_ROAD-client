import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import navbar from './components/navbar';
import './index.css';
import store from "./reducers";
import App from './App';

  ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <navBar />
      <App />
    </BrowserRouter>,
    </Provider>,

    document.getElementById("root")
  );
  
