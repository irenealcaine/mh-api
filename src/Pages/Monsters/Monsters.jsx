import React from "react";
import { useState, useEffect } from "react";
import "./Monsters.css";
import { Link } from "react-router-dom";

const Monsters = () => {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    fetch("https://mhw-db.com/monsters")
      .then((response) => response.json())
      .then((data) => {
        setMonsters(
          data.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          }),
        );
      });
  }, []);

  return (
    <div className="monsters">
      <h1>Larges</h1>
      {monsters

        .filter((monster) => monster.type === "large")
        .map((monster) => (
          <Link
            key={monster.id}
            className="card"
            to={`/monsters/${monster.id}`}
          >
            <img
              src={require(`../../assets/images/monsters/${monster.id}.png`)}
              alt={monster.name}
            />
            <h2>{monster.name}</h2>
            <p>{monster.species}</p>

            {monster.locations && (
              <p>
                Locations:
                {monster.locations.map((location, index) => (
                  <span key={index}> {location.name}</span>
                ))}
              </p>
            )}
          </Link>
        ))}

      <h1>Smalls</h1>
      {monsters
        .slice(0, 50)
        .filter((monster) => monster.type === "small")
        .map((monster) => (
          <Link
            key={monster.id}
            className="card"
            to={`/monsters/${monster.id}`}
          >
            <img
              src={require(`../../assets/images/monsters/${monster.id}.png`)}
              alt={monster.name}
            />
            <h2>{monster.name}</h2>
            <p>{monster.species}</p>

            {monster.locations && (
              <p>
                Locations:
                {monster.locations.map((location, index) => (
                  <span key={index}> {location.name}</span>
                ))}
              </p>
            )}
          </Link>
        ))}
    </div>
  );
};

export default Monsters;
