const About = () => {
  return (
    <div className="about">

      <div className="about-hero">
        <h1>About Ride Nepal</h1>
        <p>Nepal's most trusted bike rental service since 2015</p>
      </div>

      <div className="about-story">
        <div className="about-story-text">
          <h2>Our Story</h2>
          <p>Ride Nepal was founded with one simple goal — to make exploring Nepal easier and more adventurous. Whether you are a local commuter or a traveler wanting to discover hidden roads, we have the perfect bike for you.</p>
          <p>Located in the heart of Kathmandu, we have been serving riders for over a decade with passion, reliability and love for the open road.</p>
        </div>
        <div className="about-story-image">
          <img src="/images/about-story.jpg" alt="Our Shop" />
        </div>
      </div>

      <div className="about-stats">
        <div className="stat">
          <h2>1000+</h2>
          <p>Bikes Rented</p>
        </div>
        <div className="stat">
          <h2>10+</h2>
          <p>Years Experience</p>
        </div>
        <div className="stat">
          <h2>5000+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat">
          <h2>30+</h2>
          <p>Bike Models</p>
        </div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <span>🏍️</span>
          <h3>Our Mission</h3>
          <p>To make travel and commuting across Nepal easy and affordable by offering well-maintained bikes at the best prices.</p>
        </div>
        <div className="about-card">
          <span>🗺️</span>
          <h3>Our Vision</h3>
          <p>To be the most trusted and recognized bike rental service across Nepal and South Asia.</p>
        </div>
        <div className="about-card">
          <span>⭐</span>
          <h3>Why Choose Us</h3>
          <p>Well-maintained bikes, flexible rental plans, 24/7 support and the best prices guaranteed.</p>
        </div>
      </div>

      <div className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">S</div>
            <h3>Saphal Singh</h3>
            <p>Founder & Bike Expert</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">P</div>
            <h3>Punit Shrestha</h3>
            <p>Manager</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">S</div>
            <h3>Srija Singh</h3>
            <p>Customer Support</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About