import React from 'react';
import './Footer.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="footer-title">About Us</h2>
                    <p>We are committed to providing the best services. Our platform helps you to achieve your goals efficiently.</p>
                </div>
                <div className="footer-section links">
                    <h2 className="footer-title">Useful Links</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2 className="footer-title">Contact Us</h2>
                    <p>Email: info@example.com</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Address: 123 Main Street, Anytown, USA</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Company Name. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
