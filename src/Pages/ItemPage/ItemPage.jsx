import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const [armor, setArmor] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/items/${id}`)
      .then((response) => response.json())
      .then((itemData) => {
        setItemData(itemData);
      });

    fetch(`https://mhw-db.com/armor`)
      .then((response) => response.json())
      .then((armorData) => {
        const filteredArmorData = armorData.filter((armor) => {
          // armor?.crafting?.materials[0]?.item?.name === itemData.name,
          for (const material of armor.crafting.materials) {
            if (material.item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setArmor(filteredArmorData);
      });
  }, [id, itemData.id]);

  return (
    <div className="itemPage">
      <h1> {itemData.name}</h1>
      <p> {itemData.description}</p>
      <p>Value: {itemData.value}</p>
      <p>Rarity: {itemData.rarity}</p>
      <p>Carry limit: {itemData.carryLimit}</p>
      {/* {console.log(armor.crafting)} */}
      <p>Needed for:</p>
      <div>
        {armor.map((armorItem, index) => (
          <Link key={index} to={`/sets/${armorItem.armorSet.id}`}>
            {armorItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
