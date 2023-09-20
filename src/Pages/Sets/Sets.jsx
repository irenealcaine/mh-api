import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      {sets.slice(0, 10).map((set, index) => (
        <Link key={index} to={"/sets/1"} className="set">
          {set.name}
          <div className="pieces">
            {set.pieces &&
              set.pieces.map((piece, index) => (
                <div key={index}>
                  <img src={piece.assets.imageFemale} alt={piece.name} />
                </div>
              ))}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sets;
