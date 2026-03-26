import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Company Info Section */}
        <div className="footer-section brand-section">
          <h2 className="footer-logo">MEN'S WEAR</h2>
          <p className="footer-description">
            Elevating men's fashion with premium quality, timeless designs, and unmatched comfort. Dress sharp, live bold.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/shirts">Shirts</a></li>
            <li><a href="/phant">Pants</a></li>
            <li><a href="/tshirt">T-Shirts</a></li>
            <li><a href="/inner">Innerwear</a></li>
          </ul>
        </div>

        {/* Customer Support Section */}
        <div className="footer-section support-section">
          <h3>Customer Support</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>



      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Men's Wear. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
