import './About.css';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">01.</span> About Me
        </h2>
        
        <div className="about-content">
          <div className="about-text glass-panel reveal">
            <p>
              Hello! I'm Hirtheesh, currently pursuing my B.Tech in Artificial Intelligence and Data Science at 
              <strong> Kongu Engineering College</strong> (2023–2027) with a CGPA of 7.30/10.
            </p>
            <p>
              My journey into tech started with a strong foundation in Mathematics and Computer Science (75.3% in 12th grade). 
              Today, my main focus is on building scalable backend architectures, exploring Deep Learning, and creating 
              automation solutions that provide measurable performance improvements.
            </p>
            <p>
              I recently obtained two major certifications in 2025:
            </p>
            <ul className="about-list">
              <li>▹ Oracle Cloud Infrastructure 2025 – Data Science Professional</li>
              <li>▹ Oracle Cloud Infrastructure 2025 – Generative AI Professional</li>
              <li>▹ NPTEL – Design & Implementation of Human Computer Interfaces</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
