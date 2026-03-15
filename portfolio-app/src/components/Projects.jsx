import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Fake News Detection using ML',
      description: 'Developed an NLP classification pipeline achieving 99% accuracy. Applied TF-IDF vectorization and ensemble models (Random Forest, Gradient Boosting). Performed comprehensive evaluation using confusion matrices and cross-validation.',
      tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Ensemble Models'],
      links: { github: '#' }
    },
    {
      title: 'Epileptic Seizure Detection using LSTM',
      description: 'Designed a deep learning model for EEG time-series classification. Achieved 98% accuracy using a Sequential LSTM architecture, applying advanced signal preprocessing and feature scaling techniques.',
      tech: ['TensorFlow/Keras', 'LSTM', 'Python', 'Signal Processing'],
      links: { github: '#' }
    },
    {
      title: 'Resume AI (Portfolio Generator)',
      description: 'An AI-powered tool designed to extract information from PDF resumes and automatically generate and scaffold professional portfolio websites.',
      tech: ['JavaScript', 'HTML/CSS', 'React', 'AI/ML Integration'],
      links: { github: 'https://github.com/Hirtheesh1/resume_ai' }
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">04.</span> Featured Projects
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass-panel reveal" style={{transitionDelay: `${index * 0.2}s`}}>
              <div className="project-content">
                <div className="project-top">
                  <div className="folder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="project-links">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub Link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link" aria-label="External Link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <ul className="project-tech-list">
                  {project.tech.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
