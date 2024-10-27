import React from 'react'
import ContactList from './ContactList/ContactList';
import './NavbarAndContactList.css';
import VerticalNavbar from './VerticalNavbar/VerticalNavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavContactList from '../FavConatact/FavContactList';

const NavbarAndContactList = () => {
  return (
    <div className='navbar-and-list'>
      <Router>
        <VerticalNavbar />
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="fav" element={<FavContactList />} />
        </Routes>
      </Router>
    </div>
  )
}

export default NavbarAndContactList