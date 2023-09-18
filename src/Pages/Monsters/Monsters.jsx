import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Monsters.css";

const Monsters = () => {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    fetch("https://mhw-db.com/monsters")
      .then((response) => response.json())
      .then((data) => {
        const sortedMonsters = data.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setMonsters(sortedMonsters);
      });
  }, []);

  const renderMonsters = (type) => {
    return monsters
      .filter((monster) => monster.type === type)
      .map((monster) => (
        <Link key={monster.id} className="card" to={`/monsters/${monster.id}`}>
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
      ));
  };

  return (
    <div className="monsters">
      <h1>Larges</h1>
      {renderMonsters("large")}

      <h1>Smalls</h1>
      {renderMonsters("small")}
    </div>
  );
};

export default Monsters;
