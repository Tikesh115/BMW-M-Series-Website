import React from 'react';
import * as assets from '../../assets/assets';
import BMWLogo from '../../assets/BMW_logo_(gray).svg.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 pt-13 pb-1 text-sm text-gray-400 bg-black'>

            <div className='flex flex-wrap justify-between item-start gap-8 pb-6 border-gray-400 border-b'>
                <div>
                    <Link to='/'>
                        <img src={BMWLogo} alt="logo" className='h-10 md:h-11' />
                    </Link>
                    <p className='max-w-80 mt-3 text-white'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                        <a href="#"><img src={assets.assets.facebook_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.assets.instagram_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.assets.twitter_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.assets.gmail_logo} className='w-5 h-5' alt="" /></a>
                    </div>
                </div>

                <div>
                    <h2 className='text-base font-medium text-white uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Of Cars</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-white uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>          
                <div>
                    <h2 className='text-base font-medium text-white uppercase'>Contacts</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">1234 Luxury Drive</a></li>
                        <li><a href="#">San Francisco, CA 94107</a></li>
                        <li><a href="#">+1 234 567890</a></li>
                        <li><a href="#">info@example.com</a></li>
                    </ul>
                </div>

            </div>

            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer