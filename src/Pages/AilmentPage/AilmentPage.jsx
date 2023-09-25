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
        console.log(data);
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
      {ailmentData?.recovery?.items &&
        ailmentData.recovery.items.map((item, index) => (
          <Link key={index} to={`/items/${item.id}`}>
            {item.name}
          </Link>
        ))}

      <h2>Protection</h2>
      <p>Items:</p>
      {ailmentData?.protection?.items &&
        ailmentData.protection.items.map((item, index) => (
          <Link key={index} to={`/items/${item.id}`}>
            {item.name}
          </Link>
        ))}
      <p>Skills:</p>
      {ailmentData?.protection?.skills &&
        ailmentData.protection.skills.map((skill, index) => (
          <Link key={index} to={`/skills/${skill.id}`}>
            {skill.name}
          </Link>
        ))}

      <p>Monsters:</p>
      {monsters.map((monsterItem, index) => (
        <Link
          className="monsterItem"
          key={index}
          to={`/monsters/${monsterItem.id}`}
        >
          {monsterItem.name}
        </Link>
      ))}
    </div>
  );
};

export default AilmentPage;
