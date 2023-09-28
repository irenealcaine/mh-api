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

  const filteredItems = items.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    const rarityMatch =
      !selectValue || parseInt(item.rarity) === parseInt(selectValue);
    return nameMatch && rarityMatch;
  });

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
          value={selectValue || ""}
        >
          <option value={""}>Rarity</option>
          {[...Array(12).keys()].map((value) => (
            <option key={value} value={value + 1}>
              {value + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="buttonContainer">
        {filteredItems.map((item) => (
          <Link className="button" to={`/items/${item.id}`} key={item.id}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Items;
