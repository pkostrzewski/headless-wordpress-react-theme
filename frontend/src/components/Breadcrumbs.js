import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/Breadcrumbs.scss';

const Breadcrumbs = () => {
  const location = useLocation(); // Getting the current URL path
  const { category, postname } = useParams(); // Getting URL parameters if available

  // Creating breadcrumbs based on the URL path
  const generateBreadcrumbs = () => {
    const path = location.pathname.split('/').filter((crumb) => crumb !== '');

    if (path.length === 0) {
      // Home Page
      return (
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
        </div>
      );
    }

    // Portfolio Page
    if (path[0] === 'portfolio') {
      return (
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <span>Portfolio</span>
        </div>
      );
    }

    // Services Page
    if (path[0] === 'services') {
      return (
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <span>Services</span>
        </div>
      );
    }

    // Contact Page
    if (path[0] === 'contact') {
      return (
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <span>Contact</span>
        </div>
      );
    }

    // Single Post Page
    if (category && postname) {
      return (
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <Link to={`/${category}`}>{category}</Link> / <span>{postname}</span>
        </div>
      );
    }

    // Handling other dynamic pages
    return (
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / {path.map((crumb, index) => (
          <span key={index}>
            {index > 0 && ' / '}
            <Link to={`/${path.slice(0, index + 1).join('/')}`}>{crumb}</Link>
          </span>
        ))}
      </div>
    );
  };

  return <div className="wrapper">{generateBreadcrumbs()}</div>;
};

export default Breadcrumbs;