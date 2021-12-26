import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import navbar from './components/navbar';
import './index.css';
import App from './App';

  ReactDOM.render(
    <BrowserRouter>
    <navBar />
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
  
