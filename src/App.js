import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/ProductList';
import SignupForm from './components/SignupForm';
import ProductUploadForm from './components/ProductUploadForm';
import MpesaPayment from './components/MpesaPayment'; 
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/Aboutus';
import ContactUs from './components/Contact';
import LoadingSpinner from './components/LoadingSpinner'; // Create this component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token with backend
          const response = await axios.get(
            'https://Njambi.pythonanywhere.com/api/verify-token',
            { 
              headers: { 
                'Authorization': `Bearer ${token}` 
              } 
            }
          );
          
          if (response.data.valid) {
            setIsAuthenticated(true);
            setUserRole(response.data.role || 'user');
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  // Public Route component
  const PublicRoute = ({ children }) => {
    return !isAuthenticated ? children : <Navigate to="/" replace />;
  };

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}
          userRole={userRole}
        />
        
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<ProductList />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* Auth routes */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginForm 
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              </PublicRoute>
            } />
            
            <Route path="/signup" element={
              <PublicRoute>
                <SignupForm />
              </PublicRoute>
            } />
            
            {/* Protected routes */}
            {/* <Route path="/addproduct" element={
              <ProtectedRoute requiredRole="user">
                <ProductUploadForm />
              </ProtectedRoute>
            } /> */}

            <Route path='addproduct' element={<ProductUploadForm/>}/>
            
            <Route path="/mpesapayment" element={
              <ProtectedRoute>
                <MpesaPayment />
              </ProtectedRoute>
            } />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;