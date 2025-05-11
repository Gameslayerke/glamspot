import React, { useState } from 'react';
import axios from 'axios';

const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_cost: ''
  });
  const [product_photo, setProductPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductPhoto(file);
    
    // Create preview URL
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!product_photo) {
      setMessage('Please select an image.');
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append('product_name', formData.product_name);
    data.append('product_description', formData.product_description);
    data.append('product_cost', formData.product_cost);
    data.append('product_photo', product_photo);

    try {
      const response = await axios.post('https://Njambi.pythonanywhere.com/api/add_products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.success || 'Product uploaded successfully!');
      // Reset form on success
      setFormData({
        product_name: '',
        product_description: '',
        product_cost: ''
      });
      setProductPhoto(null);
      setPreviewImage(null);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Upload failed. Please try again.');
      } else {
        setMessage('Server error. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '25px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '25px',
      fontSize: '24px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    input: {
      padding: '12px 15px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s',
      ':focus': {
        borderColor: '#4a90e2',
        boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)'
      }
    },
    textarea: {
      padding: '12px 15px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '16px',
      minHeight: '100px',
      resize: 'vertical',
      outline: 'none',
      transition: 'all 0.3s',
      ':focus': {
        borderColor: '#4a90e2',
        boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)'
      }
    },
    fileInput: {
      width: '100%',
      padding: '10px 0'
    },
    button: {
      padding: '14px',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ':hover': {
        backgroundColor: '#357ab8',
        transform: 'translateY(-1px)'
      },
      ':disabled': {
        backgroundColor: '#cccccc',
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    message: {
      marginTop: '20px',
      padding: '12px',
      borderRadius: '6px',
      textAlign: 'center',
      fontSize: '15px'
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    previewContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '15px'
    },
    previewImage: {
      maxWidth: '200px',
      maxHeight: '200px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      marginTop: '10px',
      objectFit: 'cover'
    },
    loadingSpinner: {
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTop: '3px solid white',
      width: '20px',
      height: '20px',
      animation: 'spin 1s linear infinite'
    }
  };

  const messageStyle = {
    ...styles.message,
    ...(message.includes('failed') || message.includes('error') ? styles.error : styles.success)
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          name="product_name" 
          placeholder="Product Name" 
          value={formData.product_name} 
          onChange={handleChange} 
          required 
          style={styles.input}
        />
        
        <textarea 
          name="product_description" 
          placeholder="Product Description" 
          value={formData.product_description} 
          onChange={handleChange} 
          required 
          style={styles.textarea}
        />
        
        <input 
          type="number" 
          name="product_cost" 
          placeholder="Price ($)" 
          value={formData.product_cost} 
          onChange={handleChange} 
          min="0"
          step="0.01"
          required 
          style={styles.input}
        />
        
        <div style={styles.previewContainer}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
            style={styles.fileInput}
          />
          {previewImage && (
            <img 
              src={previewImage} 
              alt="Product preview" 
              style={styles.previewImage}
            />
          )}
        </div>
        
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span style={styles.loadingSpinner}></span>
              Uploading...
            </>
          ) : 'Add Product'}
        </button>
      </form>
      
      {message && <p style={messageStyle}>{message}</p>}
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductUploadForm;