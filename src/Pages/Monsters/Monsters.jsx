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
            loading="lazy"
          />
          <h3 className="name">{monster.name}</h3>
          <p className="specie">{monster.species}</p>
        </Link>
      ));
  };

  return (
    <div>
      <h1>Monsters</h1>
      <h2>Larges</h2>
      <div className="monsters">{renderMonsters("large")}</div>
      <h2>Smalls</h2>
      <div className="monsters">{renderMonsters("small")}</div>
    </div>
  );
};

export default Monsters;
