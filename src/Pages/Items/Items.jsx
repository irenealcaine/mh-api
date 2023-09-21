import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://mhw-db.com/items`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="itemsPage">
      <h1>Items</h1>
      <div className="items">
        {items.map((item, index) => (
          <Link className="item" to={`/items/${item.id}`} key={index}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Items;
