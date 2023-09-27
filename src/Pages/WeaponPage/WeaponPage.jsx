import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./WeaponPage.css";
import dragonIcon from "../../assets/images/icons/dragon.png";
import fireIcon from "../../assets/images/icons/fire.png";
import iceIcon from "../../assets/images/icons/ice.png";
import thunderIcon from "../../assets/images/icons/thunder.png";
import waterIcon from "../../assets/images/icons/water.png";
import blastIcon from "../../assets/images/icons/blast.png";
import poisonIcon from "../../assets/images/icons/poison.png";
import sleepIcon from "../../assets/images/icons/sleep.png";
import paralysisIcon from "../../assets/images/icons/paralysis.png";
import stunIcon from "../../assets/images/icons/stun.png";

const WeaponPage = () => {
  const [weapon, setWeapon] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [previous, setPrevious] = useState([]);
  const { id } = useParams();

  const icons = {
    blast: blastIcon,
    fire: fireIcon,
    water: waterIcon,
    dragon: dragonIcon,
    thunder: thunderIcon,
    ice: iceIcon,
    paralysis: paralysisIcon,
    poison: poisonIcon,
    sleep: sleepIcon,
    stun: stunIcon,
  };

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
              <div key={index} className="weaponElement">
                <span>{element.damage}</span>
                {/* {element.type} */}
                <img
                  key={index}
                  src={icons[element.type]}
                  alt={element.type}
                  className="icon"
                />
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
