import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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
  }, [id, monster.id]);

  const renderMonsterImage = () => {
    return monsterImg ? (
      <img
        className="monsterImage"
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
      {monster?.elements?.length >= 1 && (
        <div>
          <h2>Elements</h2>
          {monster.elements.map((element, index) => (
            <img
              key={index}
              src={icons[element]}
              alt={element}
              className="icon"
            />
          ))}
        </div>
      )}

      {monster?.resistances?.length >= 1 && (
        <div>
          <h2>Resistances</h2>
          {monster.resistances
            .filter((resistance) => resistance.condition === null)
            .map((resistance, index) => (
              <img
                key={index}
                src={icons[resistance.element]}
                alt={resistance.element}
                className="icon"
              />
            ))}
          {monster.resistances
            .filter((resistance) => resistance.condition !== null)
            .slice(0, 1)
            .map((resistance, index) => (
              <div key={index}>
                <h3>{resistance.condition}</h3>
              </div>
            ))}
          {monster.resistances
            .filter((resistance) => resistance.condition !== null)
            .map((resistance, index) => (
              <img
                key={index}
                src={icons[resistance.element]}
                alt={resistance.element}
                className="icon"
              />
            ))}
        </div>
      )}

      {monster?.weaknesses?.length >= 1 && (
        <div>
          <h2>Weakness</h2>
          <div className="weaknesses">
            {monster.weaknesses
              .filter((weakness) => weakness.condition === null)
              .map((weakness, index) => (
                <div key={index} className="weakness">
                  <img
                    src={icons[weakness.element]}
                    alt={weakness.element}
                    className="icon"
                  />
                  <div className="starsContainer">
                    {Array.from({ length: 3 }, (_, i) => (
                      <span key={i} className="star">
                        {i < weakness.stars ? (
                          <AiFillStar />
                        ) : (
                          <AiOutlineStar />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {monster.weaknesses.some(
            (weakness) => weakness.condition !== null,
          ) && (
            <div>
              {console.log(monster.weaknesses)}
              {monster.weaknesses
                .filter((weakness) => weakness.condition !== null)
                .slice(0, 1)
                .map((weakness, index) => (
                  <div key={index}>
                    <h3>{weakness.condition}</h3>
                  </div>
                ))}

              <div className="weaknesses">
                {monster.weaknesses
                  .filter((weakness) => weakness.condition !== null)
                  .map((weakness, index) => (
                    <div key={index} className="weakness">
                      <img
                        src={icons[weakness.element]}
                        alt={weakness.element}
                        className="icon"
                      />
                      <div className="starsContainer">
                        {Array.from({ length: 3 }, (_, i) => (
                          <span key={i} className="star">
                            {i < weakness.stars ? (
                              <AiFillStar />
                            ) : (
                              <AiOutlineStar />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {monster.locations && (
        <div>
          <h2>Locations</h2>
          <div className="buttonContainer">
            {monster.locations.map((location, index) => (
              <Link
                key={index}
                to={`/locations/${location.id}`}
                className="button"
              >
                {location.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {monster?.ailments?.length >= 1 && (
        <div>
          <h2>Ailments</h2>
          <div className="buttonContainer">
            {monster.ailments.map((ailment, index) => (
              <Link
                key={index}
                to={`/ailments/${ailment.id}`}
                className="button"
              >
                {ailment.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {monster?.rewards?.length >= 1 && (
        <div>
          <h2>Rewards</h2>
          <div className="buttonContainer">
            {monster.rewards.map((reward, index) => (
              <Link
                className="button"
                key={index}
                to={`/items/${reward.item.id}`}
              >
                {reward.item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonsterPage;
