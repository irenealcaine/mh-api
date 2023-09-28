import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SkillPage.css";
import Loader from "../../Components/Loader/Loader";

const SkillPage = () => {
  const [skillData, setSkillData] = useState([]);
  const [armorData, setArmorData] = useState([]);
  const [ailmentData, setAilmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
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

  const renderLoader = () => {
    if (isLoading) {
      return <Loader />;
    }
    return null;
  };

  return (
    <div className="skillPage">
      <h1>{skillData?.name}</h1>
      <p>{skillData?.description}</p>
      <ul className="ranks">
        {skillData?.ranks?.map((rank, index) => (
          <li className="rank" key={index}>
            <span>Rank {rank.level}:</span> {rank.description}
          </li>
        ))}
      </ul>

      {armorData?.length >= 1 && (
        <div>
          <h2>Armor</h2>
          <div className="buttonContainer">
            {armorData.map((armorItem, index) => (
              <Link
                className="button"
                key={index}
                to={`/sets/${armorItem.armorSet.id}`}
              >
                {armorItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {ailmentData?.length >= 1 && (
        <div>
          <h2>Ailment:</h2>
          <div className="buttonContainer">
            {ailmentData.map((ailmentItem, index) => (
              <Link
                className="button"
                key={index}
                to={`/ailments/${ailmentItem.id}`}
              >
                {ailmentItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {renderLoader()}

    </div>
  );
};

export default SkillPage;
