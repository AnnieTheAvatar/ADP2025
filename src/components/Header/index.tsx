'use client'; // Ensure the hamburger uses client-side JavaScript

import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import { Degree } from '@/payload-types'; 

interface HeaderProps {
  degrees: Degree[]; // List of degrees passed as a prop
}

const Header = ({ degrees }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
    
      <nav className="navbar">
      <h2>
          <Link href="/">ADP Grad 2025</Link>
        </h2>
        {/* Hamburger Menu Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Degrees List */}
        <ul className={`degree-list ${isMenuOpen ? 'open' : ''}`}>
          {degrees.map((degree) => (
            <li key={degree.slug}>
              <a href={`/degrees/${degree.slug}`}>{degree.degreeType} of {degree.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
