import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SkillPage = () => {
  const [skillData, setSkillData] = useState([]);
  const [armorData, setArmorData] = useState([]);
  const [ailmentData, setAilmentData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/skills/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSkillData(data);
      });

    fetch(`https://mhw-db.com/armor`)
      .then((response) => response.json())
      .then((armorData) => {
        const filteredArmorData = armorData.filter((armor) => {
          for (const skill of armor.skills) {
            if (skill.skillName === skillData.name) {
              return true;
            }
          }
          return false;
        });
        setArmorData(filteredArmorData);
      });

    fetch(`https://mhw-db.com/ailments`)
      .then((response) => response.json())
      .then((ailmentData) => {
        const filteredArmorData = ailmentData.filter((ailment) => {
          for (const skill of ailment.protection.skills) {
            if (skill.name === skillData.name) {
              return true;
            }
          }
          return false;
        });
        setAilmentData(filteredArmorData);
      });
  }, [id, skillData.id, skillData.name]);

  return (
    <div className="skillPage">
      <h1>{skillData?.name}</h1>
      <p>{skillData?.description}</p>
      {skillData?.ranks?.map((rank, index) => (
        <p key={index}>
          Rank {rank.level}: {rank.description}
        </p>
      ))}

      <p>Armor:</p>
      <div className="needed">
        {armorData.map((armorItem, index) => (
          <Link
            className="neededArmor"
            key={index}
            to={`/sets/${armorItem.armorSet.id}`}
          >
            {armorItem.name}
          </Link>
        ))}
      </div>

      <p>Ailment:</p>
      <div className="needed">
        {ailmentData.map((ailmentItem, index) => (
          <Link
            className="neededArmor"
            key={index}
            to={`/ailments/${ailmentItem.id}`}
          >
            {ailmentItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SkillPage;
