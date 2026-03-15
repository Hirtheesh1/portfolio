import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'AI / ML',
      skills: ['TensorFlow', 'Keras', 'Scikit-learn', 'LSTM', 'XGBoost', 'Deep Learning', 'NLP', 'Computer Vision']
    },
    {
      title: 'Programming',
      skills: ['Python', 'C', 'Java', 'JavaScript', 'SQL']
    },
    {
      title: 'Data Science',
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'TF-IDF', 'EDA']
    },
    {
      title: 'Web & Backend',
      skills: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Streamlit', 'REST APIs', 'MongoDB', 'MySQL']
    },
    {
      title: 'Tools & Cloud',
      skills: ['Git', 'GitHub', 'Linux Systems', 'Oracle Cloud', 'Automation']
    }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">02.</span> Technical Arsenal
        </h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card glass-panel reveal" style={{transitionDelay: `${index * 0.1}s`}}>
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
