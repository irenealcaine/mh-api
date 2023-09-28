import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AilmentPage.css";

const AilmentPage = () => {
  const [ailmentData, setAilmentData] = useState([]);
  const [monsters, setMonsters] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/ailments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAilmentData(data);
      });

    fetch(`https://mhw-db.com/monsters`)
      .then((response) => response.json())
      .then((monstersData) => {
        const filteredMonstersData = monstersData.filter((monster) => {
          for (const ailment of monster.ailments) {
            if (ailment.name === ailmentData.name) {
              return true;
            }
          }
          return false;
        });
        setMonsters(filteredMonstersData);
      });
  }, [id, ailmentData.id, ailmentData.name]);

  return (
    <div className="ailmentPage">
      <h1>{ailmentData.name}</h1>
      <p>{ailmentData.description}</p>

      {ailmentData?.recovery?.actions.length >= 1 ||
      ailmentData?.recovery?.items.length >= 1 ? (
        <div>
          <h2>Recovery</h2>
          {ailmentData?.recovery?.actions.length >= 1 && (
            <div>
              <h3>Actions</h3>
              <div>
                {ailmentData.recovery.actions.map((action, index) => (
                  <span key={index}>{action}</span>
                ))}
              </div>
            </div>
          )}

          {ailmentData?.recovery?.items.length >= 1 && (
            <div>
              <h3>Items</h3>
              <div className="buttonContainer">
                {ailmentData.recovery.items.map((item, index) => (
                  <Link key={index} to={`/items/${item.id}`} className="button">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {ailmentData?.protection?.items.length >= 1 ||
      ailmentData?.protection?.skills.length >= 1 ? (
        <div>
          <h2>Protection</h2>

          {ailmentData?.protection?.items.length >= 1 && (
            <div>
              <h3>Items</h3>
              <div className="buttonContainer">
                {ailmentData.protection.items.map((item, index) => (
                  <Link key={index} to={`/items/${item.id}`} className="button">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {ailmentData?.protection?.skills.length >= 1 && (
            <div>
              <h3>Skills</h3>
              <div className="buttonContainer">
                {ailmentData.protection.skills.map((skill, index) => (
                  <Link
                    key={index}
                    to={`/skills/${skill.id}`}
                    className="button"
                  >
                    {skill.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {monsters.length >= 1 && (
        <div>
          <h2>Monsters</h2>
          <div className="buttonContainer">
            {monsters.map((monsterItem, index) => (
              <Link
                className="button"
                key={index}
                to={`/monsters/${monsterItem.id}`}
              >
                {monsterItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AilmentPage;
