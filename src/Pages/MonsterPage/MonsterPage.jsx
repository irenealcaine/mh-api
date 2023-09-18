import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MonsterPage = () => {
  const [monster, setMonster] = useState([]);
  const [monsterImg, setMonsterImg] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/monsters/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMonster(data);
        setMonsterImg(`../../assets/images/monsters/${monster.id}.png`);
      });
  }, [id]);

  const renderMonsterImage = () => {
    return monsterImg ? (
      <img
        src={require(`../../assets/images/monsters/${monster.id}.png`)}
        alt={monster.name}
      />
    ) : null;
  };

  return (
    <div>
      <h1>{monster.name}</h1>
      {renderMonsterImage()}
      <p>{monster.description}</p>
      {monster.elements && "Element: " + monster.elements}
      {monster.resistances && (
        <p>
          Resistances:
          {monster.resistances.map((resistance, index) => (
            <span key={index}> {resistance.element}</span>
          ))}
        </p>
      )}

      {monster.weaknesses && (
        <p>
          Weakness:
          {monster.weaknesses.map((weakness, index) => (
            <span key={index}> {weakness.element}</span>
          ))}
        </p>
      )}
    </div>
  );
};

export default MonsterPage;
