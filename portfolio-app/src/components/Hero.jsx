import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-content">
        <div className="hero-text reveal">
          <p className="hero-greeting text-gradient">Hi, my name is</p>
          <h1 className="hero-name">Hirtheesh VJ.</h1>
          <h2 className="hero-role">I build solutions with AI and Data.</h2>
          
          <p className="hero-desc">
            I'm an AI/ML Developer & Data Science student at Kongu Engineering College.
            Passionate about Deep Learning, Backend Engineering, and crafting elegant full-stack applications solving scalable problems.
          </p>
          
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">Check out my work</a>
            <a href="#contact" className="btn btn-secondary">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
