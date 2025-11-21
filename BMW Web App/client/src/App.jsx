import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import CarDetails from './pages/Cars/CarDetails'
import Cars from './pages/Cars/Cars'
import MyBookings from './pages/Cars/MyBookings'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import Mgallery from './pages/Motor Sport/Mgallery'
import Overview from './pages/Motor Sport/Overview'
import Login from './components/Login'



const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin}/>}
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/gallery' element={<Mgallery />} />
        <Route path='/overview' element={<Overview />}/>
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} /> 
        </Route>

      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
