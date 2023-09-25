import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
      <p>Rarity: {weapon.rarity}</p>
      <p>Damage: {weapon?.attack?.display}</p>
      <p>Damage type: {weapon.damageType}</p>
      {weapon?.elements?.length >= 1 && <p>Weapon elements:</p>}
      {weapon?.crafting?.craftable ? (
        <div>
          <p>Crafting items:</p>
          {weapon.crafting.craftingMaterials.map((material, index) => (
            <Link to={`/items/${material.item.id}`}>
              {material.item.name} x {material.quantity}
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p>Upgrade from:</p>
          <Link to={`/weapons/${previous?.type}/${weapon?.crafting?.previous}`}>
            {previous?.name}
          </Link>
          <p>Upgrade items:</p>
          {weapon?.crafting?.upgradeMaterials.map((material, index) => (
            <Link to={`/items/${material.item.id}`}>
              {material.item.name} x {material.quantity}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeaponPage;
