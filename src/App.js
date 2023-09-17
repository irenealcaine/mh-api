import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    fetch("https://mhw-db.com/monsters")
      .then((response) => response.json())
      .then((data) => {
        setMonsters(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Larges</h1>
      {monsters
        .filter((monster) => monster.type === "large")
        .map((monster) => (
          <div key={monster.id} className="card">

            <img src={require(`./assets/images/monsters/${monster.id}.png`)} alt={monster.name} />
            <h2>{monster.name}</h2>
            <p>
              {monster.species}
            </p>
            <p>{monster.description}</p>
            {monster.elements.length >= 1 && "Element: " + monster.elements}
            {monster.resistances.length >= 1 && (
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

            {monster.locations && (
              <p>
                Locations:
                {monster.locations.map((location, index) => (
                  <span key={index}> {location.name}</span>
                ))}
              </p>
            )}
          </div>
        ))}

      <h1>Smalls</h1>
      {monsters
        .slice(0, 50)
        .filter((monster) => monster.type === "small")
        .map((monster) => (
          <div key={monster.id} className="card">

            <img src={require(`./assets/${monster.id}.png`)} alt={monster.name} />
            <h2>{monster.name}</h2>
            <p>
              {monster.species}
            </p>
            <p>{monster.description}</p>
            {monster.elements.length >= 1 && "Element: " + monster.elements}
            {monster.resistances.length >= 1 && (
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

            {monster.locations && (
              <p>
                Locations:
                {monster.locations.map((location, index) => (
                  <span key={index}> {location.name}</span>
                ))}
              </p>
            )}
          </div>
        ))}
    </div>
  );
}

export default App;
