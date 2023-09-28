import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
    fetch(`https://mhw-db.com/items`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <div className="itemsPage">
      <h1>Items</h1>
      <div className="inputs">
        <input
          placeholder="Search"
          className="input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <select
          onChange={(e) => setSelectValue(e.target.value)}
          className="input"
        >
          <option value={""}>Rarity</option>
          {/* <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option> */}
          {[...Array(13).keys()].map((value) => (
            <option key={value} value={value + 1}>
              {value + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="buttonContainer">
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()),
          )
          .filter((item) =>
            selectValue
              ? parseInt(item.rarity) === parseInt(selectValue)
              : item,
          )
          .map((item, index) => (
            <Link className="button" to={`/items/${item.id}`} key={index}>
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Items;
