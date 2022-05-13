import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="bg-purple-100">
      <nav className="w-4/5 mx-auto">
        <NavLink className="inline-block p-4 -ml-4" to="/dogs">Dogs</NavLink>
        <NavLink className="inline-block p-4" to="/feeds">Feedings</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
