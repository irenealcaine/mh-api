import React from 'react'

const MonsterPage = () => {

  const [monster, setMonster] = useState([]);

  useEffect(() => {
    fetch("https://mhw-db.com/monsters/1")
      .then((response) => response.json())
      .then((data) => {
        setMonster(data);
      });
  }, []);

  return (
    <div>
      <h1>{monster.name}</h1>
      {/* <p>{monster.description}</p>
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
            )} */}
    </div>
  )
}

export default MonsterPage
