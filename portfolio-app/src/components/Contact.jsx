import './Contact.css';

const Contact = () => {
  return (
    <footer id="contact" className="section contact-section">
      <div className="container contact-container">
        <h2 className="section-title">
          <span className="text-gradient">05.</span> What's Next?
        </h2>
        
        <h3 className="contact-heading glass-panel">Get In Touch</h3>
        <p className="contact-text">
          I'm currently looking for new opportunities, whether it's an internship or a full-time role. 
          My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <a href="mailto:hirtheeshvj.23aid@kongu.edu" className="btn btn-primary contact-btn">Say Hello</a>

        <div className="social-links">
          <a href="https://github.com/Hirtheesh1" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://leetcode.com/u/hirtheesh" target="_blank" rel="noreferrer" className="social-link" aria-label="LeetCode">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </a>
        </div>
        
        <div className="footer-credits">
          <p>Designed & Built by Hirtheesh VJ</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
