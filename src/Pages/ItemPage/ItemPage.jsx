import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemPage.css";
import Loader from "../../Components/Loader/Loader";
import BackButton from "../../Components/BackButton/BackButton";

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const [recoveryData, setRecoveryData] = useState([]);
  const [protectionData, setProtectionData] = useState([]);
  const [craftingData, setCraftingData] = useState([]);
  const [upgradeData, setUpgradeData] = useState([]);
  const [armor, setArmor] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const { id } = useParams();

  // useEffect(() => {
  //   fetch(`https://mhw-db.com/items/${id}`)
  //     .then((response) => response.json())
  //     .then((itemData) => {
  //       setItemData(itemData);

  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });

  //   fetch(`https://mhw-db.com/armor`)
  //     .then((response) => response.json())
  //     .then((armorData) => {
  //       const filteredArmorData = armorData.filter((armor) => {
  //         for (const material of armor.crafting.materials) {
  //           if (material.item.name === itemData.name) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //       setArmor(filteredArmorData);
  //     });

  //   fetch(`https://mhw-db.com/monsters`)
  //     .then((response) => response.json())
  //     .then((monstersData) => {
  //       const filteredMonstersData = monstersData.filter((monster) => {
  //         for (const reward of monster.rewards) {
  //           if (reward.item.name === itemData.name) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //       setMonsters(filteredMonstersData);
  //     });

  //   fetch(`https://mhw-db.com/ailments`)
  //     .then((response) => response.json())
  //     .then((recoveryData) => {
  //       const filteredRecoveryData = recoveryData.filter((ailment) => {
  //         for (const item of ailment.recovery.items) {
  //           if (item.name === itemData.name) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //       setRecoveryData(filteredRecoveryData);
  //     });

  //   fetch(`https://mhw-db.com/ailments`)
  //     .then((response) => response.json())
  //     .then((potectionData) => {
  //       const filteredProtectionData = potectionData.filter((ailment) => {
  //         for (const item of ailment.protection.items) {
  //           if (item.name === itemData.name) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //       setProtectionData(filteredProtectionData);
  //     });

  //   fetch(`https://mhw-db.com/weapons`)
  //     .then((response) => response.json())
  //     .then((craftingData) => {
  //       const filteredCraftingData = craftingData.filter((weapon) => {
  //         for (const material of weapon?.crafting?.craftingMaterials) {
  //           if (material?.item?.name === itemData.name) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //       setCraftingData(filteredCraftingData);
  //     }).catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);
  //     });

  //   fetch(`https://mhw-db.com/weapons`)
  //     .then((response) => response.json())
  //     .then((upgradeData) => {
  //       const filteredUpgradeData = upgradeData.filter((weapon) => {
  //         for (const material of weapon?.crafting?.upgradeMaterials) {
  //           if (material?.item?.name === itemData.name) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //       setUpgradeData(filteredUpgradeData);
  //     });
  // }, [id, itemData.id, itemData.name]);

  useEffect(() => {
    Promise.all([
      fetch(`https://mhw-db.com/items/${id}`).then((response) => response.json()),
      fetch(`https://mhw-db.com/armor`).then((response) => response.json()),
      fetch(`https://mhw-db.com/monsters`).then((response) => response.json()),
      fetch(`https://mhw-db.com/ailments`).then((response) => response.json()),
      fetch(`https://mhw-db.com/weapons`).then((response) => response.json()),
    ])
      .then(([itemData, armorData, monstersData, recoveryData, craftingData]) => {
        setItemData(itemData);
        const filteredArmorData = armorData.filter((armor) => {
          for (const material of armor.crafting.materials) {
            if (material.item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setArmor(filteredArmorData);
        const filteredMonstersData = monstersData.filter((monster) => {
          for (const reward of monster.rewards) {
            if (reward.item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setMonsters(filteredMonstersData);
        const filteredRecoveryData = recoveryData.filter((ailment) => {
          for (const item of ailment.recovery.items) {
            if (item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setRecoveryData(filteredRecoveryData);
        const filteredProtectionData = recoveryData.filter((ailment) => {
          for (const item of ailment.protection.items) {
            if (item.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setProtectionData(filteredProtectionData);
        const filteredCraftingData = craftingData.filter((weapon) => {
          for (const material of weapon?.crafting?.craftingMaterials) {
            if (material?.item?.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setCraftingData(filteredCraftingData);
        const filteredUpgradeData = craftingData.filter((weapon) => {
          for (const material of weapon?.crafting?.upgradeMaterials) {
            if (material?.item?.name === itemData.name) {
              return true;
            }
          }
          return false;
        });
        setUpgradeData(filteredUpgradeData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [id, itemData.name]);

  const renderLoader = () => {
    if (isLoading) {
      return <Loader />;
    }
    return null;
  };

  return (
    <div className="itemPage">
      <BackButton to={"/items"} value={"All items"} />
      <h1> {itemData.name}</h1>

      {
        !isLoading && (
          <div>
            <p> {itemData.description}</p>
            <h2>Value</h2>
            <p>{itemData.value}</p>
            <h2>Rarity</h2>
            <p>{itemData.rarity}</p>
            <h2>Carry limit</h2>
            <p>{itemData.carryLimit}</p>
          </div>

        )
      }




      {monsters.length >= 1 && (
        <div>
          <h2>Obtained in</h2>
          <div className="buttonContainer">
            {monsters.map((monsterItem, index) => (
              <Link
                className="button"
                key={index}
                to={`/monsters/${monsterItem.id}`}
              >
                {monsterItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {recoveryData.length >= 1 || protectionData.length >= 1 ? (
        <div>
          <h2>Ailments</h2>

          {recoveryData.length >= 1 && (
            <div>
              <h3>Recovery</h3>
              <div className="buttonContainer">
                {recoveryData.map((recoveryItem, index) => (
                  <Link
                    className="button"
                    key={index}
                    to={`/ailments/${recoveryItem.id}`}
                  >
                    {recoveryItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {protectionData.length >= 1 && (
            <div>
              <h3>Protection</h3>
              <div className="buttonContainer">
                {protectionData.map((protectionItem, index) => (
                  <Link
                    className="button"
                    key={index}
                    to={`/ailments/${protectionItem.id}`}
                  >
                    {protectionItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {armor.length >= 1 && (
        <div>
          <h2>Armor crafting</h2>
          <div className="buttonContainer">
            {armor.map((armorItem, index) => (
              <Link
                className="button"
                key={index}
                to={`/sets/${armorItem.armorSet.id}`}
              >
                {armorItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {craftingData.length >= 1 || upgradeData.length >= 1 ? (
        <div>
          <h2>Weapons</h2>

          {craftingData.length >= 1 && (
            <div>
              <h3>Crafting</h3>
              <div className="buttonContainer">
                {craftingData.map((craftingItem, index) => (
                  <Link
                    className="button"
                    key={index}
                    to={`/weapons/${craftingItem.id}`}
                  >
                    {craftingItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {upgradeData.length >= 1 && (
            <div>
              <h3>Upgrade</h3>
              <div className="buttonContainer">
                {upgradeData.map((upgradeItem, index) => (
                  <Link
                    className="button"
                    key={index}
                    to={`/weapons/${upgradeItem.type}/${upgradeItem.id}`}
                  >
                    {upgradeItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {renderLoader()}

    </div>
  );
};

export default ItemPage;
