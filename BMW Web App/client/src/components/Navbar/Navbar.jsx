import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import audioFile from '../../assets/audio.mp3'
import BMWLogo from '../../assets/logo-light.svg'
import MLogo from '../../assets/bmw-m-seeklogo.png'
import profile from '../../assets/user (1).png'


const Navbar = ({setShowLogin}) => {

    const navigate = useNavigate();

    const audioRef = useRef(null);

    const playSound = () => {
        audioRef.current?.play();
    }

    

    return (
        <div>
            <div className="nav">
            <nav>
            <div className="menu">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/cars">Cars</Link></li>
                  <li>
                    <a href="#motorsport">Motorsport▾</a>
                    <ul className="dropdown">
                      <li><Link to="/gallery">M Gallery</Link></li>
                      <li><Link to="/race-cars">Race Cars</Link></li>
                      <li><Link to="/racing-series">Racing Series</Link></li>
                      <li><Link to="/overview">Overview</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/my-bookings">My Bookings</Link></li>
                </ul>
                <hr/>
                <h1 id="clickText" onClick={playSound}>Hear The Ultimate Performance Machine</h1>
                <audio ref={audioRef} src={audioFile} id="sound"></audio>
            </div>
            <Link to='/'><img src={BMWLogo} alt='BMW Logo' className="logo"/></Link>   
            <Link to='/'><img src={MLogo} alt='BMW M Logo' className="logo"/></Link>
            </nav>
            <div className='flex max-sm:flex-col items-start sm:items-center gap-4'>
              <button className='login-btn' onClick={()=>setShowLogin(true)}>Login</button>
              <img className='h-11 cursor-pointer' src={profile} onClick={()=>navigate('/owner')}/>
            </div>
            </div>
        </div>
    )
}

export default Navbar
//login button click kar!