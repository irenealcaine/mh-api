import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SetPage.css";
import fire from "../../assets/images/icons/fire.png";
import water from "../../assets/images/icons/water.png";
import ice from "../../assets/images/icons/ice.png";
import thunder from "../../assets/images/icons/thunder.png";
import dragon from "../../assets/images/icons/dragon.png";

const SetPage = () => {
  const [set, setSet] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/armor/sets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSet(data);
      });
  }, [id, set.id]);

  return (
    <div className="setPage">
      <h1>{set.name} set</h1>
      <div>{set.rank}</div>
      <div className="setPieces">
        {set?.pieces &&
          set?.pieces?.map((piece, index) => (
            <div key={index} className="setPiece">
              <h2>{piece.name}</h2>
              <p>{piece.type}</p>
              {piece?.assets?.imageMale && (
                <img
                  className="setPieceImg"
                  src={piece.assets.imageMale}
                  alt={piece.name}
                />
              )}

              {/* <p>{piece.rank}</p>
              <p>{piece.rarity}</p>
              <p>{piece.armorSet}</p> */}

              <p>Base defense: {piece.defense.base}</p>
              <p>Resistances:</p>
              <div className="resistances">
                <div className="resistance">
                  <img src={fire} alt="fire" className="resistanceIcon" />
                  <p className={piece.resistances.fire < 0 && "negative"}>
                    {piece.resistances.fire}
                  </p>
                </div>

                <div className="resistance">
                  <img src={water} alt="water" className="resistanceIcon" />
                  <p className={piece.resistances.water < 0 && "negative"}>
                    {piece.resistances.water}
                  </p>
                </div>

                <div className="resistance">
                  <img src={ice} alt="ice" className="resistanceIcon" />
                  <p className={piece.resistances.ice < 0 && "negative"}>
                    {piece.resistances.ice}
                  </p>
                </div>

                <div className="resistance">
                  <img src={thunder} alt="thunder" className="resistanceIcon" />
                  <p className={piece.resistances.thunder < 0 && "negative"}>
                    {piece.resistances.thunder}
                  </p>
                </div>

                <div className="resistance">
                  <img src={dragon} alt="dragon" className="resistanceIcon" />
                  <p className={piece.resistances.dragon < 0 && "negative"}>
                    {piece.resistances.dragon}
                  </p>
                </div>
              </div>

              <p>Crafting:</p>
              <div className="buttonContainer">
                {piece.crafting.materials &&
                  piece.crafting.materials.map((material, index) => (
                    <Link
                      key={index}
                      className="button"
                      to={`/items/${material.item.id}`}
                    >
                      {material.item.name} x {material.quantity}
                    </Link>
                  ))}
              </div>
              <p> Skills:</p>
              <div className="buttonContainer">
                {piece.skills &&
                  piece.skills.map((skill, index) => (
                    <Link key={index} to={`/skills/${skill.skill}`} className="button">
                      {skill.skillName} {skill.level}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SetPage;
