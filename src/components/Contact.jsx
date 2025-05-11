import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';
import './ContactUs.css'; // Make sure your CSS includes styles for FAQ
import './FAQ.css'; // Create a separate FAQ.css for FAQ specific styles

const ContactUs = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: 'What are your business hours?',
      answer: 'Our customer support team is available Monday to Friday, from 9:00 AM to 5:00 PM EAT.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number on our website or the courier\'s website to track your shipment.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase, provided the items are unused and in their original packaging. Please visit our Returns & Exchanges page for detailed information.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to select countries. Please check our shipping policy during checkout to see if your country is eligible.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods, including Visa, Mastercard, American Express, and M-Pesa.',
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:sassy@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-us-container">
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you!</p>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container">
          <h2>Contact Information</h2>
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email Us</h3>
              <p>sassy@gmail.com</p>
            </div>
            <div className="contact-info-card">
              <FaPhone className="contact-icon" />
              <h3>Call Us</h3>
              <p>+254 795 944 856</p>
            </div>
            <div className="contact-info-card">
              <FaMapMarkerAlt className="contact-icon" />
              <h3>Visit Us</h3>
              <p>Glow Haven Headquarters</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required 
                value={formData.subject} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                required 
                value={formData.message} 
                onChange={handleInputChange} 
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">
                    {expandedFAQ === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {expandedFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
