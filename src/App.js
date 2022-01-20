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
import PostsList from './components/postlist'
import MeetsupList from './components/meetuplist'
import ServicesList from './components/serviceslist'
import Profile from './components/Profile'
function App() {
  return (
<><Navbar />

<Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Posts" element={<PostsList/>} />
          <Route path="/post/:id" element={<Posts/>} />
          <Route path="/meetup/:id" element={<Meetup/>} />

          <Route path="/meetup" element={<MeetsupList/>} />
          <Route path="/Service" element={<ServicesList/>} />
          <Route path="/Service/:id" element={<Service/>} />

          <Route path="/Login" element={<Login/>} />
          <Route path="/Navbar" element={<Navbar/>} />
          <Route path="/Singup" element={<Signup/>} />
          <Route path="/Account/:id" element={<Account/>} />
          <Route path="/ResetPass/:id" element={<Reset/>} />
          <Route path="/Profile" element={<Profile/>} />

     </Routes>  <div>
</div>
<div>
  </div>
  <Footer />
  </>
)

}


export default App;
