import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Weapons.css";

const Weapons = () => {
  const { slug } = useParams();

  const [weaponsData, setWeaponsData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);
  const [elementValue, setElementValue] = useState(null);
  const [rangeValue, setRangeValue] = useState(10);
  const [checkValue, setCheckValue] = useState(false);

  const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   fetch(`https://mhw-db.com/weapons`)
  //     .then((response) => response.json())
  //     .then((weaponsData) => {
  //       const filteredWeaponsData = weaponsData
  //         .filter((weapon) => {
  //           return weapon.type === slug;
  //         })
  //         .filter((weapon) =>
  //           elementValue
  //             ? weapon.elements.some((element) => element.type === elementValue)
  //             : weapon,
  //         )
  //         .filter(
  //           (weapon) =>
  //             rangeValue && weapon.attack.display >= parseInt(rangeValue),
  //         )
  //         .filter((weapon) =>
  //           checkValue ? weapon.crafting.craftable : weapon,
  //         );
  //       setWeaponsData(filteredWeaponsData);
  //     });
  // }, [slug, rangeValue, checkValue, elementValue]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mhw-db.com/weapons`);
        const data = await response.json();
        const filteredData = data
          .filter((weapon) => weapon.type === slug)
          .filter((weapon) => !elementValue || weapon.elements.some((element) => element.type === elementValue))
          .filter((weapon) => !rangeValue || weapon.attack.display >= parseInt(rangeValue))
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
    weapon.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const filteredByRarity = selectValue
    ? filteredWeapons.filter((weapon) => parseInt(weapon.rarity) === parseInt(selectValue))
    : filteredWeapons;

  const renderLoader = () => {
    if (isLoading) {
      return (
        <div className="loader">

          Loading...
        </div>
      );
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
      {/* <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value={null}>Rarity</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
      </select> */}
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
        <option value={"dragon"}>dragon</option>
        <option value={"ice"}>ice</option>
        <option value={"thunder"}>thunder</option>
        <option value={"blast"}>blast</option>
        <option value={"poison"}>poison</option>
        <option value={"sleep"}>sleep</option>
        <option value={"paralysis"}>paralysis</option>
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
      {/* <div className="buttonContainer">
        {console.log(weaponsData)}

        {weaponsData
          .filter((weapon) =>
            weapon.name.toLowerCase().includes(inputValue.toLowerCase()),
          )
          .filter((weapon) =>
            selectValue
              ? parseInt(weapon.rarity) === parseInt(selectValue)
              : weapon,
          )

          .filter((weapon) =>
            elementValue
              ? weapon.elements.some((element) => element.type === elementValue)
              : weapon,
          )
          .filter(
            (weapon) =>
              rangeValue && weapon.attack.display >= parseInt(rangeValue),
          )
          .filter((weapon) => (checkValue ? weapon.crafting.craftable : weapon))
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
              {console.log(weaponsItem.elements)}
            </Link>
          ))}
      </div> */}

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
