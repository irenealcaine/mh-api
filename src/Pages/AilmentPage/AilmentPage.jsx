import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AilmentPage = () => {
  const [ailmentData, setAilmentData] = useState([]);
  const [monsters, setMonsters] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/ailments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAilmentData(data);
      });

    fetch(`https://mhw-db.com/monsters`)
      .then((response) => response.json())
      .then((monstersData) => {
        const filteredMonstersData = monstersData.filter((monster) => {
          for (const ailment of monster.ailments) {
            if (ailment.name === ailmentData.name) {
              return true;
            }
          }
          return false;
        });
        setMonsters(filteredMonstersData);
      });
  }, [id, ailmentData.id, ailmentData.name]);

  return (
    <div className="ailmentPage">
      <h1>{ailmentData.name}</h1>
      <p>{ailmentData.description}</p>
      <h2>Recovery</h2>
      <p>Actions:</p>
      {ailmentData?.recovery?.actions &&
        ailmentData.recovery.actions.map((action, index) => (
          <span key={index}>{action}</span>
        ))}
      <p>Items:</p>
      <div className="buttonContainer">
        {ailmentData?.recovery?.items &&
          ailmentData.recovery.items.map((item, index) => (
            <Link key={index} to={`/items/${item.id}`} className="button">
              {item.name}
            </Link>
          ))}
      </div>
      <h2>Protection</h2>
      <p>Items:</p>
      <div className="buttonContainer">
        {ailmentData?.protection?.items &&
          ailmentData.protection.items.map((item, index) => (
            <Link key={index} to={`/items/${item.id}`} className="button">
              {item.name}
            </Link>
          ))}
      </div>
      <p>Skills:</p>
      <div className="buttonContainer">
        {ailmentData?.protection?.skills &&
          ailmentData.protection.skills.map((skill, index) => (
            <Link key={index} to={`/skills/${skill.id}`} className="button">
              {skill.name}
            </Link>
          ))}
      </div>
      <p>Monsters:</p>
      <div className="buttonContainer">
        {monsters.map((monsterItem, index) => (
          <Link
            className="button"
            key={index}
            to={`/monsters/${monsterItem.id}`}
          >
            {monsterItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AilmentPage;
