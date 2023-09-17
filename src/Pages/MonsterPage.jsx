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
    </div>
  )
}

export default MonsterPage
