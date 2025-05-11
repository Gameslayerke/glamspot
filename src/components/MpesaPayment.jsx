import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * MpesaPayment component for handling mobile payments via M-Pesa
 * @component
 */
const MpesaPayment = () => {
  const [formData, setFormData] = useState({
    phone: '',
    amount: ''
  });
  const [paymentState, setPaymentState] = useState({
    isLoading: false,
    message: '',
    isError: false
  });
  const [productDetails, setProductDetails] = useState({
    name: '',
    photo: '',
    cost: ''
  });
  
  const location = useLocation();
  const MPESA_API_ENDPOINT = 'https://Njambi.pythonanywhere.com/api/mpesa_payment';
  const IMAGE_BASE_URL = 'https://Njambi.pythonanywhere.com/static/images/';

  useEffect(() => {
    if (location.state?.product) {
      const { product_name, product_photo, product_cost, } = location.state.product;
      setProductDetails({
        name: product_name,
        photo: `${IMAGE_BASE_URL}${product_photo}`,
        cost: product_cost
      });
      setFormData(prev => ({ ...prev, amount: product_cost }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!/^254[0-9]{9}$/.test(formData.phone)) {
      setPaymentState({
        isLoading: false,
        message: 'Please enter a valid Safaricom number starting with 254',
        isError: true
      });
      return false;
    }
    
    if (parseFloat(formData.amount) <= 0) {
      setPaymentState({
        isLoading: false,
        message: 'Amount must be greater than 0',
        isError: true
      });
      return false;
    }
    
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaymentState(prev => ({ ...prev, isLoading: true, message: '' }));
    
    if (!validateForm()) return;

    const paymentPayload = new FormData();
    paymentPayload.append('phone', formData.phone);
    paymentPayload.append('amount', formData.amount);
    
    if (location.state?.product) {
      paymentPayload.append('product_id', location.state.product.id);
    }

    try {
      const response = await fetch(MPESA_API_ENDPOINT, {
        method: 'POST',
        body: paymentPayload,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setPaymentState({
        isLoading: false,
        message: data.message || 'Payment initiated successfully!',
        isError: false
      });

      // Reset form on success
      setFormData({ phone: '', amount: '' });

    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentState({
        isLoading: false,
        message: error.message || 'Payment failed. Please try again.',
        isError: true
      });
    }
  };

  return (
    <div className="payment-container">
      {/* <img
        // src="https://www.safaricom.co.ke/images/M-PESA-Logo.png"
        alt="M-Pesa Logo"
        className="mpesa-logo"
      />
       */}
      <h2 className="payment-title">Pay with M-Pesa</h2>
      
      {productDetails.name && (
        <div className="product-info">
          {productDetails.photo && (
            <img
              src={productDetails.photo}
              alt={productDetails.name}
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          )}
          <p>You are paying for: <strong>{productDetails.name}</strong></p>
          {productDetails.cost && (
            <p className="product-amount">Amount: Ksh {parseFloat(productDetails.cost).toFixed(2)}</p>
          )}
        </div>
      )}

      <form onSubmit={handlePayment} className="payment-form">
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="254712345678"
            pattern="^254[0-9]{9}$"
            title="Please enter a valid Safaricom number starting with 254"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (Ksh)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            min="1"
            step="1"
            placeholder="Enter Amount"
          />
        </div>

        <button
          type="submit"
          className="payment-button"
          disabled={paymentState.isLoading}
        >
          {paymentState.isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Processing...
            </>
          ) : 'Pay Now'}
        </button>
      </form>

      {paymentState.message && (
        <div className={`message ${paymentState.isError ? 'error' : 'success'}`}>
          {paymentState.message}
        </div>
      )}

      <style jsx>{`
        .payment-container {
          max-width: 450px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .mpesa-logo {
          width: 100px;
          margin: 0 auto 1.5rem;
          display: block;
        }
        
        .payment-title {
          text-align: center;
          color: #2d3748;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .product-info {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          color: #4a5568;
          padding: 1rem;
          background-color: #f8fafc;
          border-radius: 8px;
        }
        
        .product-image {
          max-width: 100px;
          max-height: 100px;
          margin: 0 auto 0.5rem;
          display: block;
          border-radius: 4px;
        }
        
        .product-amount {
          font-weight: 600;
          color: #2d3748;
          margin-top: 0.5rem;
        }
        
        .payment-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a5568;
        }
        
        .form-group input {
          padding: 0.875rem 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        
        .form-group input:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          outline: none;
        }
        
        .payment-button {
          padding: 0.875rem;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .payment-button:hover {
          background-color: #3182ce;
          transform: translateY(-1px);
        }
        
        .payment-button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
          transform: none;
        }
        
        .message {
          margin-top: 1.25rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9375rem;
        }
        
        .message.success {
          background-color: #f0fff4;
          color: #2f855a;
          border: 1px solid #c6f6d5;
        }
        
        .message.error {
          background-color: #fff5f5;
          color: #c53030;
          border: 1px solid #fed7d7;
        }
        
        .loading-spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

MpesaPayment.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        product_name: PropTypes.string,
        product_photo: PropTypes.string,
        product_cost: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    })
  })
};

export default MpesaPayment;