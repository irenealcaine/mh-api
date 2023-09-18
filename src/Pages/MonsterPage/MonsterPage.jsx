import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MonsterPage.css";
import dragonIcon from "../../assets/images/icons/dragon.png";
import fireIcon from "../../assets/images/icons/fire.png";
import iceIcon from "../../assets/images/icons/ice.png";
import thunderIcon from "../../assets/images/icons/thunder.png";
import waterIcon from "../../assets/images/icons/water.png";
import blastIcon from "../../assets/images/icons/blast.png";
import poisonIcon from "../../assets/images/icons/poison.png";
import sleepIcon from "../../assets/images/icons/sleep.png";
import paralysisIcon from "../../assets/images/icons/paralysis.png";
import stunIcon from "../../assets/images/icons/stun.png";

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

  const icons = {
    blast: blastIcon,
    fire: fireIcon,
    water: waterIcon,
    dragon: dragonIcon,
    thunder: thunderIcon,
    ice: iceIcon,
    paralysis: paralysisIcon,
    poison: poisonIcon,
    sleep: sleepIcon,
    stun: stunIcon,
  };

  return (
    <div className="monsterPage">
      <h1>{monster.name}</h1>
      {renderMonsterImage()}
      <p>{monster.description}</p>
      {console.log(monster.elements)}
      {monster.elements && (
        <p>
          Elements:
          {monster.elements.map((element, index) => (
            <img key={index} src={icons[element]} alt={element} />
          ))}
        </p>
      )}

      {monster.resistances && (
        <p>
          Resistances:
          {monster.resistances.map((resistance, index) => (
            <img
              key={index}
              src={icons[resistance.element]}
              alt={resistance.element}
            />
          ))}
        </p>
      )}

      {monster.weaknesses && (
        <p>
          Weakness:
          {monster.weaknesses.map((weakness, index) => (
            // <span key={index}> {weakness.element}</span>
            <img
              key={index}
              src={icons[weakness.element]}
              alt={weakness.element}
            />
          ))}
        </p>
      )}
    </div>
  );
};

export default MonsterPage;
