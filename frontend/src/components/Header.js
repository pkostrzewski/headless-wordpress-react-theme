import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../logo.svg';
import { API_URL } from '../config';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [siteTitle, setSiteTitle] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Kontroluje widoczność menu

  useEffect(() => {
    fetch(`${API_URL}primary-menu`)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu:', error));

    fetch(`${API_URL}site-title`)
      .then(response => response.json())
      .then(data => setSiteTitle(data))
      .catch(error => console.error('Error fetching site title:', error));
  }, []);

  // Funkcja do zamykania i otwierania menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo"> {/* Logo */}
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="site-title">{siteTitle}</h1> {/* Site title */}
          </Link>
        </div>
        
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <Link to={item.url.replace('http://localhost/klienci/white_label_coders/backend/', '')}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;