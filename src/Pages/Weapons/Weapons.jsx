import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Weapons.css";

const Weapons = () => {
  const { slug } = useParams();

  const [weaponsData, setWeaponsData] = useState([]);

  useEffect(() => {
    fetch(`https://mhw-db.com/weapons`)
      .then((response) => response.json())
      .then((weaponsData) => {
        const filteredWeaponsData = weaponsData.filter((weapon) => {
          return weapon.type === slug;
        });
        setWeaponsData(filteredWeaponsData);
      });
  }, [slug]);

  return (
    <div className="weapons">
      <h1>Weapons</h1>
      <div className="buttonContainer">
        {weaponsData.map((weaponsItem, index) => (
          <Link
            key={index}
            to={`/weapons/${slug}/${weaponsItem.id}`}
            className="button weapon"
          >
            {weaponsItem?.assets?.icon && (
              <img src={weaponsItem.assets.icon} alt={weaponsItem.name} />
            )}
            <p>{weaponsItem.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Weapons;
