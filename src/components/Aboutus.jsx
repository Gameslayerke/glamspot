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
          <h1>Our Beauty Story</h1>
          <p>Where nature meets science for your perfect glow</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Philosophy</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <FaLeaf className="mission-icon" />
              <h3>Clean Beauty</h3>
              <p>We formulate with ethically-sourced, natural ingredients that are good for you and the planet.</p>
            </div>
            <div className="mission-card">
              <FaHandsHelping className="mission-icon" />
              <h3>Ethical Sourcing</h3>
              <p>Partnering with sustainable suppliers who share our values of fair trade and eco-conscious practices.</p>
            </div>
            <div className="mission-card">
              <FaRegSmile className="mission-icon" />
              <h3>Inclusive Beauty</h3>
              <p>Products designed for all skin types, tones, and ages because beauty has no boundaries.</p>
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
              Founded in 2020 by beauty therapist Njambi Wanjiru, Glow Haven began as a small boutique formulating
              custom skincare for clients. After seeing the transformative power of clean, personalized beauty
              solutions, we set out to make these products accessible to everyone.
            </p>
            <p>
              Today, we're a team of cosmetic chemists, dermatologists, and beauty enthusiasts committed to
              redefining beauty standards while maintaining our core values of transparency, sustainability, and
              efficacy.
            </p>
          </div>
          {/* The image has been removed */}
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
            <p>All products dermatologist-reviewed for safety and efficacy</p>
          </div>
          <div className="promise-item">
            <div className="promise-number">03</div>
            <h3>Transparent Formulas</h3>
            <p>Full ingredient disclosure - no hidden nasties</p>
          </div>
          <div className="promise-item">
            <div className="promise-number">04</div>
            <h3>Fast Shipping</h3>
            <p>Delivered fresh to your door in eco-friendly packaging</p>
            <FaShippingFast className="shipping-icon" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Beauty Experts</h2>
          <div className="team-grid">
            {[
              {
                name: 'Njambi Wanjiru',
                role: 'Founder & Formulator',
                bio: 'Licensed aesthetician with 15 years experience in organic skincare formulation.',
                image: '/images/team/njambi.jpg'
              },
              {
                name: 'Dr. Amani Okoth',
                role: 'Chief Dermatologist',
                bio: 'Board-certified dermatologist ensuring all products meet medical-grade standards.',
                image: '/images/team/amani.jpg'
              },
              {
                name: 'Lena Muthoni',
                role: 'Sustainability Lead',
                bio: 'Environmental scientist dedicated to reducing our beauty footprint.',
                image: '/images/team/lena.jpg'
              }
            ].map((member, index) => (
              <div key={index} className="team-member">
                {/* The member image has been removed */}
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
          <h2>Join Our Beauty Revolution</h2>
          <p>Discover products that love your skin and the planet</p>
          <Link to="/" className="cta-button">Shop Now</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;