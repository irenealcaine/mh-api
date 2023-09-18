import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MonsterPage.css";
import { AiFillFire } from "react-icons/ai";
import fireIcon from "../../assets/images/icons/fire.png";

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

  const resistanceIcons = {
    fire: fireIcon,
    water: "faWater",
  };

  return (
    <div className="monsterPage">
      <h1>{monster.name}</h1>
      {renderMonsterImage()}
      <p>{monster.description}</p>
      {monster.elements && "Element: " + monster.elements}
      {monster.resistances && (
        <p>
          Resistances:
          {monster.resistances.map((resistance, index) => (
            <span key={index}>
              {/* {resistance.element} */}
              {/* {resistanceIcons[resistance.element]} */}
              <img src={resistanceIcons[resistance.element]} />
            </span>
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
