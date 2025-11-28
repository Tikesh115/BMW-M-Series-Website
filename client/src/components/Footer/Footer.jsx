import React from 'react';
import * as assets from '../../assets/assets';
import BMWLogo from '../../assets/BMW_logo_(gray).svg.png';
import { Link } from 'react-router-dom';
import {motion} from 'motion/react'

const Footer = () => {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 pt-13 pb-1 text-sm text-gray-400 bg-black'>

            <div className='flex flex-wrap justify-between item-start gap-8 pb-6 border-gray-400 border-b'>
                <div>
                    <Link to='/'>
                        <motion.img 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        src={BMWLogo} alt="logo" className='h-10 md:h-11' />
                    </Link>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    className='max-w-80 mt-3 text-white'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    className='flex items-center gap-3 mt-6'>
                        <a href="#"><img src={assets.assets.facebook_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.assets.instagram_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.assets.twitter_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.assets.gmail_logo} className='w-5 h-5' alt="" /></a>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                className='flex flex-wrap justify-between w-1/2 gap-8'>
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
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                </ul>
            </motion.div>
        </div>
    )
}

export default Footer