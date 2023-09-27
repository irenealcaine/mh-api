import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./WeaponPage.css";

const WeaponPage = () => {
  const [weapon, setWeapon] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [previous, setPrevious] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/weapons/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setWeapon(data);
      });

    fetch(`https://mhw-db.com/weapons`)
      .then((response) => response.json())
      .then((weaponsData) => {
        setWeapons(weaponsData);
        if (weapon?.crafting) {
          const previousWeapon = weaponsData.find(
            (prevWeapon) => prevWeapon.id === weapon?.crafting?.previous,
          );
          setPrevious(previousWeapon);
        }
      });
  }, [id, previous, weapons, weapon?.crafting?.previous, weapon?.crafting]);

  return (
    <div className="weaponPage">
      <h1>{weapon.name}</h1>
      <img src={weapon?.assets?.image} alt={weapon.name} />
      <h2>Rarity</h2>
      <p>{weapon.rarity}</p>
      <h2>Damage</h2>
      <p>{weapon?.attack?.display}</p>
      <h2>Damage type</h2>
      <p>{weapon.damageType}</p>
      {weapon?.elements?.length >= 1 && (
        <div>
          <h2>Element damage</h2>
          <div>
            {weapon.elements.map((element, index) => (
              <div key={index}>
                <p>
                  {element.type} <span>{element.damage}</span>{" "}
                </p>

                {console.log(element)}
              </div>
            ))}
          </div>
        </div>
      )}
      {weapon?.crafting?.craftable ? (
        <div>
          <h2>Crafting items</h2>
          <div className="buttonContainer">
            {weapon.crafting.craftingMaterials.map((material, index) => (
              <Link to={`/items/${material.item.id}`} className="button">
                {material.item.name} x {material.quantity}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Upgrade from</h2>
          <Link
            className="button"
            to={`/weapons/${previous?.type}/${weapon?.crafting?.previous}`}
          >
            {previous?.name}
          </Link>

          <h2>Upgrade items</h2>
          <div className="buttonContainer">
            {weapon?.crafting?.upgradeMaterials.map((material, index) => (
              <Link
                key={index}
                to={`/items/${material.item.id}`}
                className="button"
              >
                {material.item.name} x {material.quantity}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeaponPage;
