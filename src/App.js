import "./App.css";
import { useState, useEffect } from "react";
import { images } from "./assets/icons";
import { Aptonoth } from "./assets/icons";

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
      {monsters.slice(0, 5).map((monster) => (
        <div key={monster.id} className="card">
          <img
            // src={`./assets/${monster.id}.png`}
            src={monster.name}
            alt={monster.name}
          />
          {console.log(images[monster.id - 1].src)}
          <h2>{monster.name}</h2>
          <p>
            {monster.type} {monster.species}
          </p>
          <p>{monster.description}</p>
          {monster.elements.length >= 1 && "Element: " + monster.elements}
          {monster.resistances.length >= 1 && (
            <p>
              Resistances:
              {monster.resistances.map((resistance) => (
                <span> {resistance.element}</span>
              ))}
            </p>
          )}

          {monster.weaknesses && (
            <p>
              Weakness:
              {monster.weaknesses.map((weakness) => (
                <span> {weakness.element}</span>
              ))}
            </p>
          )}

          {monster.locations && (
            <p>
              Locations:
              {monster.locations.map((location) => (
                <span> {location.name}</span>
              ))}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
