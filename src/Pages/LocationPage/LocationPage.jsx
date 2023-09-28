import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./LocationPage.css";
const LocationPage = () => {
  const [locationData, setLocationData] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [locationImg, setLocationImg] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/locations/${id}`)
      .then((response) => response.json())
      .then((locationData) => {
        setLocationData(locationData);
        setLocationImg(
          `../../assets/images/locations/${locationData.name}.webp`,
        );
      });

    fetch(`https://mhw-db.com/monsters`)
      .then((response) => response.json())
      .then((monstersData) => {
        const filteredMonstersData = monstersData.filter((monster) => {
          for (const location of monster.locations) {
            if (location.name === locationData.name) {
              return true;
            }
          }
          return false;
        });
        setMonsters(filteredMonstersData);
      });
  }, [id, locationData.id, locationData.name]);

  const renderLocationImage = () => {
    return locationImg ? (
      <img
        className="locationImage"
        src={require(`../../assets/images/locations/${locationData.name}.webp`)}
        alt={locationData.name}
      />
    ) : null;
  };

  return (
    <div className="locationPage">
      <h1>{locationData.name}</h1>
      {renderLocationImage()}
      <ul className="camps">
        {locationData?.camps?.map((camp, index) => (
          <li key={index}>
            <span>{camp.name}</span>, zone: {camp.zone}
          </li>
        ))}
      </ul>

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

export default LocationPage;
