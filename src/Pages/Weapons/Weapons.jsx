import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Weapons.css";
import Loader from "../../Components/Loader/Loader";

const Weapons = () => {
  const { slug } = useParams();

  const [weaponsData, setWeaponsData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);
  const [elementValue, setElementValue] = useState(null);
  const [rangeValue, setRangeValue] = useState(10);
  const [checkValue, setCheckValue] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mhw-db.com/weapons`);
        const data = await response.json();
        const filteredData = data
          .filter((weapon) => weapon.type === slug)
          .filter(
            (weapon) =>
              !elementValue ||
              weapon.elements.some((element) => element.type === elementValue),
          )
          .filter(
            (weapon) =>
              !rangeValue || weapon.attack.display >= parseInt(rangeValue),
          )
          .filter((weapon) => !checkValue || weapon.crafting.craftable);

        setWeaponsData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, rangeValue, checkValue, elementValue]);

  const filteredWeapons = weaponsData.filter((weapon) =>
    weapon.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const filteredByRarity = selectValue
    ? filteredWeapons.filter(
        (weapon) => parseInt(weapon.rarity) === parseInt(selectValue),
      )
    : filteredWeapons;

  const renderLoader = () => {
    if (isLoading) {
      return <Loader />;
    }
    return null;
  };

  return (
    <div className="weapons">
      <h1>Weapons</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value={null}>Rarity</option>
        {Array.from({ length: 8 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <select onChange={(e) => setElementValue(e.target.value)}>
        <option value={null}>Element damage</option>
        <option value={"fire"}>Fire</option>
        <option value={"water"}>Water</option>
        <option value={"dragon"}>Dragon</option>
        <option value={"ice"}>Ice</option>
        <option value={"thunder"}>Thunder</option>
        <option value={"blast"}>Blast</option>
        <option value={"poison"}>Poison</option>
        <option value={"sleep"}>Sleep</option>
        <option value={"paralysis"}>Paralysis</option>
      </select>

      <input
        type="range"
        min="10"
        max="1500"
        step="10"
        value={rangeValue}
        onChange={(e) => setRangeValue(e.target.value)}
      />
      <p>{rangeValue}</p>

      <input type={"checkbox"} onChange={(e) => setCheckValue(!checkValue)} />
      <p>Craftable</p>

      {renderLoader()}

      <div className="buttonContainer">
        {filteredByRarity.map((weapon, index) => (
          <Link
            key={index}
            to={`/weapons/${slug}/${weapon.id}`}
            className="button weapon"
          >
            {weapon.assets?.icon && (
              <img src={weapon.assets.icon} alt={weapon.name} />
            )}
            <p>{weapon.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Weapons;
