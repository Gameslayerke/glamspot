import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaRegStar, FaSpinner } from 'react-icons/fa';
import './ProductList.css';

/**
 * ProductList Component
 * Displays a grid of available products with the ability to order
 * @returns {JSX.Element} The product listing component
 */
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://Njambi.pythonanywhere.com/api/get_products');
        // Add dummy ratings to products
        const productsWithRatings = response.data.map(product => ({
          ...product,
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
          review_count: Math.floor(Math.random() * 100) + 1 // Random review count between 1 and 100
        }));
        setProducts(productsWithRatings);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    navigate('/mpesapayment', { state: { product } });
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const numericRating = parseFloat(rating);
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-icon" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="star-icon half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2 className="section-title">Available Products</h2>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={`https://Njambi.pythonanywhere.com/static/images/${product.product_photo}`}
                  alt={product.product_name}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-product.png';
                  }}
                />
                {product.is_new && <span className="new-badge">New</span>}
                {product.discount > 0 && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.product_name}</h3>
                <p className="product-description">
                  {product.product_description.length > 100
                    ? `${product.product_description.substring(0, 100)}...`
                    : product.product_description}
                </p>

                <div className="product-meta">
                  <div className="product-rating">
                    {renderRatingStars(product.rating)}
                    <span className="rating-value">{product.rating}</span>
                    <span className="review-count">({product.review_count} reviews)</span>
                  </div>
                  <p className="product-price">
                    Ksh {parseFloat(product.product_cost).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleOrderClick(product)}
                  className="order-button"
                  aria-label={`Order ${product.product_name}`}
                >
                  <FaShoppingCart className="cart-icon" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ProductList.propTypes = {
  // Add prop types if needed
};

export default ProductList;