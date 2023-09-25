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
      {skills.map((skill, index) => (
        <Link key={index} to={`/skills/${skill.id}`}>
          {skill.name}
        </Link>
      ))}
    </div>
  );
};

export default Skills;
