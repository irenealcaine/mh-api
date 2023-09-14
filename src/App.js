import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    fetch('https://mhw-db.com/monsters')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMonsters(data);
      });
  }, []);

  return (
    <div className="App">
      {monsters.map((monster) => (
        <div key={monster.id} className="card">

          <p>{monster.name}</p>
          <p>{monster.type}{" "}{monster.species}</p>
          <p>{monster.description}</p>
          {monster.elements && monster.elements}
          {monster.resistances && monster.resistances.map((resistance) => (
            <p>Resistance: {resistance.element}</p>
          ))}
          {console.log(monster.weaknesses)}
          {monster.weaknesses && monster.weaknesses.map((weakness) => (
            <p>Weakness: {weakness.element}</p>
          ))}
          {monster.locations.map((location) => (
            <p>Location: {location.name}</p>
          ))}

        </div>
      ))}
    </div>
  );
}

export default App;
