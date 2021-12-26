import './App.css';
import React from 'react'
import {Route,Routes,Link} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/navbar';
import Login from './components/Login';
import Regestier from './components/Singup';
import Footer from './components/Footer/Footer';

function App() {
  return (
<>
  <div>
<Navbar />
</div>
<div>
  <Footer />
  </div>
  </>
)

}


export default App;
