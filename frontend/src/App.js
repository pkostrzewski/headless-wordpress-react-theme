import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import SinglePost from './components/SinglePost';
import './App.scss';

const App = () => {
  return (
    <Router>
      <Header />
        <main>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} index />
          {/* path redirection /home-page na / */}
          <Route path="/home-page" element={<Navigate to="/" />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:category/:postname" element={<SinglePost />} /> {/* New route for single post */}
        </Routes>
        </main>
      <Footer />
    </Router>
  );
};

export default App;
