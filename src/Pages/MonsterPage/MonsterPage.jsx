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
      <p>{monster.species}</p>
      {renderMonsterImage()}
      <p>{monster.description}</p>
      {monster.elements !== undefined && monster.elements.length > 0 && (
        <p>
          Elements:
          {monster.elements.map((element, index) => (
            <img
              key={index}
              src={icons[element]}
              alt={element}
              className="icon"
            />
          ))}
        </p>
      )}

      {monster.resistances !== undefined && monster.resistances.length > 0 && (
        <p>
          Resistances:
          {monster.resistances.map((resistance, index) => (
            <img
              key={index}
              src={icons[resistance.element]}
              alt={resistance.element}
              className="icon"
            />
          ))}
        </p>
      )}

      {monster.weaknesses !== undefined && monster.weaknesses.length > 0 && (
        <div>
          Weakness:
          {monster.weaknesses
            .filter((weakness) => weakness.condition === null)
            .map((weakness, index) => (
              <div key={index}>
                <img
                  src={icons[weakness.element]}
                  alt={weakness.element}
                  className="icon"
                />
                <span>{weakness.stars}</span>
                <span>{weakness.condition}</span>
              </div>
            ))}
          {monster.weaknesses
            .filter((weakness) => weakness.condition !== null)
            .slice(0, 1)
            .map((weakness, index) => (
              <div key={index}>
                <span>{weakness.condition}</span>
              </div>
            ))}
          {monster.weaknesses
            .filter((weakness) => weakness.condition !== null)
            .map((weakness, index) => (
              <div key={index}>
                <img
                  src={icons[weakness.element]}
                  alt={weakness.element}
                  className="icon"
                />
                <span>{weakness.stars}</span>
              </div>
            ))}
        </div>
      )}

      <p>
        Locations:
        {monster.locations &&
          monster.locations.map((location, index) => (
            <span key={index}>{location.name}</span>
          ))}
      </p>

      {monster.rewards !== undefined && monster.rewards.length > 0 && (
        <p>
          Rewards:
          {monster.rewards.map((reward, index) => (
            <div key={index}>
              {console.log(reward)}
              {reward.item.name}
              Rarity: {reward.item.rarity}
              Value: {reward.item.value}
              {reward.item.description}
            </div>
          ))}
        </p>
      )}
    </div>
  );
};

export default MonsterPage;
