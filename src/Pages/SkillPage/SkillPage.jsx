import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SkillPage = () => {
  const [skill, setSkill] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/skills/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSkill(data);
        console.log(data);
      });
  }, [id, skill.id]);

  return (
    <div className="skillPage">
      <h1>{skill?.name}</h1>
      <p>{skill?.description}</p>
      {skill?.ranks?.map((rank, index) => (
        <p>Rank {rank.level}: {rank.description}</p>
      ))}
    </div>
  );
};

export default SkillPage;
