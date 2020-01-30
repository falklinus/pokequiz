import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <p className='nav-logo'>PokeQuiz</p>
      <ul>
        <li>
          <Link className='nav-link' to='/'>
            Quiz
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='/practise'>
            Practise
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
