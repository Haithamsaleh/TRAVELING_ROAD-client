import React from 'react'
import {Route,Routes, useNavigate  } from "react-router-dom";
import'./style.css'
import Button from '@restart/ui/esm/Button';
import Login from '../Login';
import {Link} from "react-router-dom";

const Home = () => {
        
    return (
        <div className='hero-container'>
          <video src='/videos/video-2.mp4' autoPlay loop muted />
          <br />
          <h1>ADVENTURE AWAITS</h1>

          <p>What are you waiting for?</p>
          <div className='hero-btns'>
            <Button
              className='info__button'
              buttonStyle='btn--outline'
              buttonSize='btn--large'
            ><Link className='text' to="/Login">Login</Link>

              
            </Button>
            <br/>
            <Button
              className='info__button'
              buttonStyle='btn--primary'
              buttonSize='btn--large'
            ><Link className='text' to="/Singup">Signup</Link>
            <i className='far fa-play-circle' />
            </Button>
            
          </div>
        </div>
      );
    }
    
export default Home;
