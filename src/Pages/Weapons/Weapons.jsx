import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Weapons = () => {
  const { slug } = useParams(); // Obtiene el valor de slug de la URL
  console.log(slug);

  const [weaponsData, setWeaponsData] = useState([]);

  useEffect(() => {
    fetch(`https://mhw-db.com/weapons`)
      .then((response) => response.json())
      .then((weaponsData) => {
        const filteredWeaponsData = weaponsData.filter((weapon) => {
          return weapon.type === slug;
        });
        setWeaponsData(filteredWeaponsData);
        console.log(weaponsData.type);
      });
  }, [slug]); // Añade slug como dependencia para que se actualice cuando cambie

  return (
    <div className="weapons">
      {weaponsData.map((weaponsItem, index) => (
        <Link to={`/weapons/${slug}/${weaponsItem.id}`}>
          <p>{weaponsItem.name}</p>
          {weaponsItem?.assets?.icon && <img src={weaponsItem.assets.icon} />}
        </Link>
      ))}
    </div>
  );
};

export default Weapons;
