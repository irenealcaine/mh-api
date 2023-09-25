import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
      {weaponsData.map((weaponsItem, index) => (
        <Link to={`/weapons/${slug}/${weaponsItem.id}`}>
          <p>{weaponsItem.name}</p>
          {weaponsItem?.assets?.icon && (
            <img src={weaponsItem.assets.icon} alt={weaponsItem.name} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default Weapons;
