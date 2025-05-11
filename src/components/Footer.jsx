import React from 'react';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, 
  FaYoutube, FaPinterest, FaReddit, FaTiktok, FaWhatsapp,
  FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Info</h3>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Nairobi, Kenya</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:njambi@gmail.com">njambi@example.com</a>
            </li>
            <li>
              <FaPhone className="contact-icon" />
              <a href="tel:+254795944856">+254 795 944856</a>
            </li>
            <li>
              <FaWhatsapp className="contact-icon" />
              <a href="https://wa.me/254795944856">WhatsApp</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Connect With Us</h3>
          <div className="social-links">
            <a href="https://github.com/njambi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/njambi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://twitter.com/njambi" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://facebook.com/njambi" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com/njambi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://youtube.com/njambi" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube className="social-icon" />
            </a>
            <a href="https://pinterest.com/njambi" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FaPinterest className="social-icon" />
            </a>
            <a href="https://reddit.com/u/njambi" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
              <FaReddit className="social-icon" />
            </a>
            <a href="https://tiktok.com/@njambi" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} MyStore. Developed by Njambi Njuguna. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;