import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import audioFile from '../../assets/audio.mp3'
import BMWLogo from '../../assets/logo-light.svg'
import MLogo from '../../assets/bmw-m-seeklogo.png'
import profile from '../../assets/user (1).png'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'


const Navbar = () => {

    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

    const navigate = useNavigate();

    const audioRef = useRef(null);

    const playSound = () => {
        audioRef.current?.play();
    }

    const changeRole = async () => {
      try {
        const {data} = await axios.post('/api/owner/change-role');
        if (data.success) {
          setIsOwner(true)
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
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
            <Link to='/'><img src={BMWLogo} alt='BMW Logo' className="logo1"/></Link>   
            <Link to='/'><img src={MLogo} alt='BMW M Logo' className="logo2"/></Link>
            </nav>
            <div className='flex max-sm:flex-col items-start sm:items-center gap-4'>
              <motion.button 
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95 }}
              className='login-btn' onClick={()=>{user ? logout() : setShowLogin(true)}}>{user ? 'Logout' : 'Login'}</motion.button>
              <img className='h-11 w-11 object-cover cursor-pointer rounded-full' src={user ? user.image : profile} onClick={()=>{isOwner ? navigate('/owner') : changeRole()}}/>
            </div>
            </div>
        </div>
    )
}

export default Navbar
//login button click kar!