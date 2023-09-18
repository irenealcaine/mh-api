import { useEffect, useState } from "react";
import "./Sets.css";

const Sets = () => {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch("https://mhw-db.com/armor/sets")
      .then((response) => response.json())
      .then((data) => {
        setSets(data);
      });
  }, []);

  return (
    <div className="sets">
      <span className="title">
        {console.log(sets)}
        {sets.slice(0, 5).map((set, index) => (
          <div key={index}>
            {set.name}
            {set.pieces.map((piece, index) => (
              <div key={index}>
                <img src={piece.assets.imageFemale} />
              </div>
            ))}
          </div>
        ))}
      </span>
    </div>
  );
};

export default Sets;
