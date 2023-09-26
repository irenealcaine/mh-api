import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`https://mhw-db.com/skills`)
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
      });
  }, []);

  return (
    <div className="skills">
      <h1>Skills</h1>
      <div className="buttonContainer">
        {skills.map((skill, index) => (
          <Link key={index} to={`/skills/${skill.id}`} className="button">
            {skill.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Skills;
