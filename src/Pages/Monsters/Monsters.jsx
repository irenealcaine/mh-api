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
            className="monsterImg"
          />
          <h2 className="name">{monster.name}</h2>
          <p className="specie">{monster.species}</p>
        </Link>
      ));
  };

  return (
    <div>
      <h1>Larges</h1>
      <div className="monsters">{renderMonsters("large")}</div>
      <h1>Smalls</h1>
      <div className="monsters">{renderMonsters("small")}</div>
    </div>
  );
};

export default Monsters;
