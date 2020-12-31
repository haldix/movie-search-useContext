import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <NavLink to='/' exact>
        ACTOR SEARCH
      </NavLink>
      <NavLink to='/movie' exact>
        MOVIE SEARCH
      </NavLink>
    </nav>
  );
};

export default Navbar;
