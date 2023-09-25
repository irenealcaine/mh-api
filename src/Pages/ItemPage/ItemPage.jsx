import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemPage.css";

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const [recoveryData, setRecoveryData] = useState([]);
  const [protectionData, setProtectionData] = useState([]);
  const [craftingData, setCraftingData] = useState([]);
  const [upgradeData, setUpgradeData] = useState([]);
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

    fetch(`https://mhw-db.com/ailments`)
      .then((response) => response.json())
      .then((recoveryData) => {
        const filteredRecoveryData = recoveryData.filter((ailment) => {
          for (const item of ailment.recovery.items) {
            if (item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setRecoveryData(filteredRecoveryData);
      });

    fetch(`https://mhw-db.com/ailments`)
      .then((response) => response.json())
      .then((potectionData) => {
        const filteredProtectionData = potectionData.filter((ailment) => {
          for (const item of ailment.protection.items) {
            if (item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setProtectionData(filteredProtectionData);
      });

    fetch(`https://mhw-db.com/weapons`)
      .then((response) => response.json())
      .then((craftingData) => {
        const filteredCraftingData = craftingData.filter((weapon) => {
          for (const material of weapon?.crafting?.craftingMaterials) {
            if (material?.item?.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setCraftingData(filteredCraftingData);
      });

    fetch(`https://mhw-db.com/weapons`)
      .then((response) => response.json())
      .then((upgradeData) => {
        const filteredUpgradeData = upgradeData.filter((weapon) => {
          for (const material of weapon?.crafting?.upgradeMaterials) {
            if (material?.item?.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setUpgradeData(filteredUpgradeData);
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

      <p>Ailments recovery:</p>

      <div className="monsterItems">
        {recoveryData.map((recoveryItem, index) => (
          <Link
            className="monsterItem"
            key={index}
            to={`/ailments/${recoveryItem.id}`}
          >
            {recoveryItem.name}
          </Link>
        ))}
      </div>

      <p>Ailments protection:</p>

      <div className="monsterItems">
        {protectionData.map((protectionItem, index) => (
          <Link
            className="monsterItem"
            key={index}
            to={`/ailments/${protectionItem.id}`}
          >
            {protectionItem.name}
          </Link>
        ))}
      </div>

      <p>Crafting:</p>

      <div className="monsterItems">
        {craftingData.map((craftingItem, index) => (
          <Link
            className="monsterItem"
            key={index}
            to={`/weapons/${craftingItem.id}`}
          >
            {craftingItem.name}
          </Link>
        ))}
      </div>

      <p>Upgrade:</p>

      <div className="monsterItems">
        {upgradeData.map((upgradeItem, index) => (
          <Link
            className="monsterItem"
            key={index}
            to={`/weapons/${upgradeItem.type}/${upgradeItem.id}`}
          >
            {upgradeItem.name}
            {console.log(upgradeItem)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
