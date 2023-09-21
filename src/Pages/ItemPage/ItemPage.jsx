import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const [item, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        console.log(data);
      });
  }, [id, item.id]);

  return (
    <div className="itemPage">
      <h1> {item.name}</h1>
      <p> {item.description}</p>
      <p>Value: {item.value}</p>
      <p>Rarity: {item.rarity}</p>
      <p>Carry limit: {item.carryLimit}</p>
    </div>
  );
};

export default ItemPage;
