import React from 'react';
import { Link } from 'react-router-dom';
import Logo            from '../assets/logos/lifelink-logo-icon.svg';
import AboutImg        from '../assets/images/lifelink.jpg';
import DirectImpact    from '../assets/images/lifelink 1.jpg';   
import CommunityEngage from '../assets/images/lifelink 2.jpg';   
import ResourceAvail   from '../assets/images/lifelink 3.jpg';   
import PatientCare     from '../assets/images/lifelink 4.jpg';   

export default function LandingPage() {
  return (
    <>
      {/* ----------  NAVBAR  ---------- */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={Logo} alt="LifeLink logo" className="logo" />
          <span className="brand">LifeLink</span>
        </div>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#how">How it works</a>
          <a href="#contact">Contact</a>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* ----------  HERO / ABOUT SECTION ---------- */}
      <header id="about" className="hero">
        <div className="hero-text">
          <h1>Connecting Donors, Hospitals & Patients</h1>
          <p>
            A seamless platform for managing emergency donations, tracking
            inventory, and saving lives—transparently and efficiently.
          </p>
        </div>
        <div className="hero-image">
          <img src={AboutImg} alt="About LifeLink" />
        </div>
      </header>

      {/* ----------  BENEFITS SECTION ---------- */}
      <section id="how" className="benefits">
        <h2>Benefits for Donors</h2>
        <div className="benefits-grid">

          {/* Direct Impact */}
          <article className="benefit">
            <img src="client/src/assets/images/lifelink 1.jpg" alt="Direct impact of donations" />
            <h3>Direct Impact</h3>
            <p>
              See exactly how your donation changes lives by viewing real-time
              updates on patients and hospitals you’ve supported.
            </p>
          </article>

          {/* Community Engagement */}
          <article className="benefit">
            <img src="client/src/assets/images/lifelink 2.jpg" alt="Community engagement among donors" />
            <h3>Community Engagement</h3>
            <p>
              Join a vibrant community of donors and healthcare providers,
              sharing stories and inspiring one another to give more.
            </p>
          </article>

          {/* Resource Availability */}
          <article className="benefit">
            <img src="client/src/assets/images/lifelink 3.jpg" alt="Resource availability ensured" />
            <h3>Resource Availability</h3>
            <p>
              Ensure hospitals have the critical blood supplies they need, when
              they need them, improving emergency response times.
            </p>
          </article>

          {/* Improved Patient Care */}
          <article className="benefit">
            <img src="client/src/assets/images/lifelink 4.jpg" alt="Improved patient care with faster access" />
            <h3>Improved Patient Care</h3>
            <p>
              Faster access to critical resources means better outcomes for
              patients in need of lifesaving transfusions.
            </p>
          </article>

        </div>
      </section>

      {/* ----------  FOOTER ---------- */}
      <footer id="contact" className="footer">
        <p>© 2025 LifeLink – Connecting hearts, saving lives.</p>
      </footer>
    </>
  );
}
