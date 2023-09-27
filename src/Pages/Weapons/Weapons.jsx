import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Weapons.css";

const Weapons = () => {
  const { slug } = useParams();

  const [weaponsData, setWeaponsData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);

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
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option defaultValue hidden>
          Rarity
        </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
      </select>
      <div className="buttonContainer">
        {weaponsData
          .filter((weapon) =>
            weapon.name.toLowerCase().includes(inputValue.toLowerCase()),
          )
          .filter((weapon) =>
            selectValue
              ? parseInt(weapon.rarity) === parseInt(selectValue)
              : weapon,
          )
          .map((weaponsItem, index) => (
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
