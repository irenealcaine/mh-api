import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemPage.css";

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const [armor, setArmor] = useState([]);
  const [monsters, setMonsters] = useState([]);
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
          for (const material of armor.crafting.materials) {
            if (material.item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setArmor(filteredArmorData);
      });

    fetch(`https://mhw-db.com/monsters`)
      .then((response) => response.json())
      .then((monstersData) => {
        const filteredMonstersData = monstersData.filter((monster) => {
          for (const reward of monster.rewards) {
            if (reward.item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setMonsters(filteredMonstersData);
      });
  }, [id, itemData.id, itemData.name]);

  return (
    <div className="itemPage">
      <h1> {itemData.name}</h1>
      <p> {itemData.description}</p>
      <p>Value: {itemData.value}</p>
      <p>Rarity: {itemData.rarity}</p>
      <p>Carry limit: {itemData.carryLimit}</p>
      {/* {console.log(armor.crafting)} */}
      <p>Needed for:</p>
      <div className="needed">
        {armor.map((armorItem, index) => (
          <Link
            className="neededArmor"
            key={index}
            to={`/sets/${armorItem.armorSet.id}`}
          >
            {armorItem.name}
          </Link>
        ))}
      </div>
      <p>Obtained in:</p>

      <div className="monsterItems">
        {monsters.map((monsterItem, index) => (
          <Link
            className="monsterItem"
            key={index}
            to={`/monsters/${monsterItem.id}`}
          >
            {monsterItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
