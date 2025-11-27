import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import BMWLogo from '../../assets/logo-light.svg'
import MLogo from '../../assets/bmw-m-seeklogo.png'
import { useAppContext } from '../../context/AppContext'

const NavBarOwner = () => {
    let {user} = useAppContext();

    return (
        <div className='flex items-center justify-between pr-6 
        md:px-10 py-2 text-light border-b border-borderColor 
        relative transition-all bg-[#0f0f17]'>
            <div className='flex'>
                <Link to='/'><img src={BMWLogo} alt='BMW Logo' className='p-2.5 h-20'/></Link>
                <Link to='/'><img src={MLogo} alt='BMW M Logo' className='p-2.5 h-20'/></Link>
            </div>
            <p>Welcome, {user?.name || 'Owner'}</p>
        </div>
    )
}

export default NavBarOwner