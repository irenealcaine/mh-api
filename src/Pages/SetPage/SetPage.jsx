import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
              <p>
                {piece.crafting.materials &&
                  piece.crafting.materials.map((material, index) => (
                    <div key={index}>
                      {material.item.name} x {material.quantity}
                    </div>
                  ))}
              </p>
              <p>
                {piece.skills &&
                  piece.skills.map((skill, index) => (
                    <div>
                      {skill.skillName}: {skill.description}
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
