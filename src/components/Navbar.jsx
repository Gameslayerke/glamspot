import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaTimes, FaBars, FaUser, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [credentials, setCredentials] = useState({
    password: '',
    username: ''
  });
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Admin credentials (in production, use proper authentication)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'sassy'
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdminAccessClick = (e) => {
    e.preventDefault();
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (authError) setAuthError('');
  };

  const handleAdminAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('authToken', 'admin-token');
        setIsAuthenticated(true);  // Update authentication state
        navigate('/addproduct');
        closeAuthModal();
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setAuthError("Access denied. Please check your username and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);  // Update authentication state
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthError('');
    setCredentials({ password: '', username: '' });
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <span className="logo-text">The Glam Spot</span>
          </Link>

          <button 
            className="navbar-toggle" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <div className="navbar-main-links">
              <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              
              {isAuthenticated && (
                <Link to="/addproduct" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}
            </div>

            <div className="navbar-auth-links">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="navbar-auth-button login-button"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="auth-icon" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="navbar-auth-button signup-button"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserPlus className="auth-icon" />
                    <span>Sign Up</span>
                  </Link>
                  <button 
                    className="navbar-admin-link" 
                    onClick={handleAdminAccessClick}
                    aria-label="Request admin access"
                  >
                    <span>Admin</span>
                    <FaLock className="lock-icon" />
                  </button>
                </>
              ) : (
                <button 
                  className="navbar-auth-button logout-button"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="auth-icon" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {showAuthModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <button 
              className="auth-modal-close" 
              onClick={closeAuthModal}
              aria-label="Close authentication modal"
            >
              <FaTimes />
            </button>
            
            <h3 className="auth-modal-title">
              Admin Portal
            </h3>
            
            {authError && (
              <div className="auth-modal-error">
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="auth-modal-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleCredentialChange}
                  className="form-input"
                  required
                  autoComplete="username"
                  placeholder="Enter admin username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleCredentialChange}
                  className="form-input"
                  required
                  autoComplete="current-password"
                  placeholder="Enter admin password"
                />
              </div>

              <button 
                type="submit" 
                className="auth-modal-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;