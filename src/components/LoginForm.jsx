import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const form = new FormData();
      form.append('email', formData.email);
      form.append('password', formData.password);

      const response = await axios.post(
        'https://Njambi.pythonanywhere.com/api/signin',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.message === 'login successful') {
        // Store the authentication token
        localStorage.setItem('authToken', response.data.token || 'authenticated');
        
        // Update global authentication state
        setIsAuthenticated(true);
        
        // Show success message
        setMessage({ 
          text: 'Login successful! Redirecting...', 
          type: 'success' 
        });
        
        // Redirect to home page after a brief delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMessage({ 
          text: response.data.message || 'Login successful but no token received', 
          type: 'warning' 
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'An unexpected error occurred. Please try again.';
      setMessage({ 
        text: errorMessage, 
        type: 'error' 
      });
      
      // Ensure we're logged out if there was an error
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="username"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="current-password"
              placeholder="Enter your password"
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {message.text && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <div className="auth-footer">
          <p>Don't have an account? <a href="/signup" className="auth-link">Register</a></p>
          {/* Uncomment when you implement password recovery
          <p><a href="/forgot-password" className="auth-link">Forgot password?</a></p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;