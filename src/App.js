import './App.css';
import React from 'react'
import {Route,Routes} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/navbar';
import Login from './components/Login';
import Signup from './components/Singup';
import Footer from './components/Footer/Footer';
import Account from './components/Account';
import Posts from './components/Posts'
import Reset from './components/Reset'
import Meetup from './components/meetup'
import Service from './components/Service';
function App() {
  return (
<><Navbar />

<Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Posts" element={<Posts/>} />
          <Route path="/Meetup" element={<Meetup/>} />
          <Route path="/Service" element={<Service/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Navbar" element={<Navbar/>} />
          <Route path="/Singup" element={<Signup/>} />
          <Route path="/Account/:id" element={<Account/>} />
          <Route path="/ResetPass/:id" element={<Reset/>} />
          
     </Routes>  <div>
</div>
<div>
  </div>
  <Footer /></>
)

}


export default App;
