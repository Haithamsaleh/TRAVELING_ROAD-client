import './App.css';
import React from 'react'
import {Route,Routes,Link} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/navbar';
import Login from './components/Login';
import Singup from './components/Singup';
import Footer from './components/Footer/Footer';
import Account from './components/Account';

function App() {
  return (
<>
<Navbar />

<Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Navbar" element={<Navbar/>} />
          <Route path="/Singup" element={<Singup/>} />
          <Route path="/Account/:id" element={<Account/>} />

          
     </Routes>  <div>
</div>
<div>
  <Footer />
  </div>
  </>
)

}


export default App;
