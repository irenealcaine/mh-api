import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SetPage.css";

const SetPage = () => {
  const [set, setSet] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/armor/sets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSet(data);
        console.log(data);
      });
  }, [id, set.id]);

  return (
    <div className="setPage">
      <h1>{set.name} set</h1>
      <div>{set.rank}</div>
      <div className="setPieces">
        {set.pieces &&
          set.pieces.map((piece, index) => (
            <div key={index} className="setPiece">
              <h2>{piece.name}</h2>
              <p>{piece.type}</p>
              <img src={piece.assets.imageMale} alt={piece.name} />
              {/* <p>{piece.rank}</p>
              <p>{piece.rarity}</p>
              <p>{piece.armorSet}</p> */}
              <div className="setMaterialItems">
                {piece.crafting.materials &&
                  piece.crafting.materials.map((material, index) => (
                    <Link
                      key={index}
                      className="setMaterialItem"
                      to={`/items/${material.item.id}`}
                    >
                      {material.item.name} x {material.quantity}
                    </Link>
                  ))}
              </div>
              <p>
                {piece.skills &&
                  piece.skills.map((skill, index) => (
                    <div key={index}>
                      <span className="setSkillName">{skill.skillName}</span>:{" "}
                      {skill.description}
                    </div>
                  ))}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SetPage;
