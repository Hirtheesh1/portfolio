import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: "Data Analytics Intern",
      company: "Tata GenAI Powered",
      date: "2025",
      points: [
        "Conducted exploratory data analysis and risk profiling.",
        "Developed ML models for delinquency prediction.",
        "Designed AI-driven reporting strategies."
      ]
    },
    {
      title: "Data Visualization Virtual Intern",
      company: "Tata",
      date: "2025",
      points: [
        "Built business dashboards and visual analytics reports.",
        "Applied storytelling techniques for data-driven decisions."
      ]
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">03.</span> Where I've Worked
        </h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item reveal" style={{transitionDelay: `${index * 0.2}s`}}>
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <h3 className="timeline-title">{exp.title} <span className="timeline-company">@ {exp.company}</span></h3>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <ul className="timeline-points">
                  {exp.points.map((point, pIndex) => (
                    <li key={pIndex}>{point}</li>
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

export default Experience;
