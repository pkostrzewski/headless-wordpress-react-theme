import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="wrapper">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;