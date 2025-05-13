import React from 'react';
import { FaLeaf, FaHandsHelping, FaRegSmile, FaShippingFast } from 'react-icons/fa';
import './AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Our Pharmaceutical Story</h1>
          <p>Where nature meets science for your optimal health</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Philosophy</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <FaLeaf className="mission-icon" />
              <h3>Natural Remedies</h3>
              <p>We formulate with ethically-sourced, natural ingredients that support your wellness journey.</p>
            </div>
            <div className="mission-card">
              <FaHandsHelping className="mission-icon" />
              <h3>Ethical Sourcing</h3>
              <p>Partnering with sustainable suppliers who share our values of fair trade and eco-conscious practices.</p>
            </div>
            <div className="mission-card">
              <FaRegSmile className="mission-icon" />
              <h3>Inclusive Health</h3>
              <p>Products designed for all ages, backgrounds, and health needs—because wellness is universal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2>Our Journey</h2>
            <p>
              Founded in 2020 by pharmacist Njambi Wanjiru, Medi Haven began as a small community dispensary offering
              personalized health solutions. After seeing the power of tailored natural and clinical remedies, we set
              out to make these accessible to everyone.
            </p>
            <p>
              Today, we're a team of pharmacists, researchers, and wellness advocates committed to redefining
              pharmaceutical care while upholding our values of transparency, sustainability, and efficacy.
            </p>
          </div>
        </div>
      </section>

      {/* Product Promise */}
      <section className="promise-section">
        <h2>Our Product Promise</h2>
        <div className="promise-grid">
          <div className="promise-item">
            <div className="promise-number">01</div>
            <h3>Cruelty-Free</h3>
            <p>Never tested on animals - we use advanced in-vitro testing methods</p>
          </div>
          <div className="promise-item">
            <div className="promise-number">02</div>
            <h3>Clinically Tested</h3>
            <p>All products pharmacist-reviewed for safety and efficacy</p>
          </div>
          <div className="promise-item">
            <div className="promise-number">03</div>
            <h3>Transparent Formulas</h3>
            <p>Full ingredient disclosure - no hidden chemicals</p>
          </div>
          <div className="promise-item">
            <div className="promise-number">04</div>
            <h3>Fast Shipping</h3>
            <p>Delivered promptly to your door in eco-friendly packaging</p>
            <FaShippingFast className="shipping-icon" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Pharmaceutical Experts</h2>
          <div className="team-grid">
            {[
              {
                name: 'Njambi Wanjiru',
                role: 'Founder & Pharmacist',
                bio: 'Licensed pharmacist with 15 years experience in natural and clinical formulations.',
                image: '/images/team/njambi.jpg'
              },
              {
                name: 'Dr. Amani Okoth',
                role: 'Chief Medical Advisor',
                bio: 'Board-certified physician ensuring all products meet clinical standards.',
                image: '/images/team/amani.jpg'
              },
              {
                name: 'Lena Muthoni',
                role: 'Sustainability Lead',
                bio: 'Environmental scientist dedicated to reducing our pharmaceutical footprint.',
                image: '/images/team/lena.jpg'
              }
            ].map((member, index) => (
              <div key={index} className="team-member">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Join Our Health Movement</h2>
          <p>Explore pharmaceutical products that care for your body and the planet</p>
          <Link to="/" className="cta-button">Shop Now</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
