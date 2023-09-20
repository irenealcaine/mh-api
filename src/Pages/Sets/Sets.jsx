import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sets.css";

const Sets = () => {
  const [sets, setSets] = useState([]);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previusPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const maxItems = 100;

  useEffect(() => {
    fetch("https://mhw-db.com/armor/sets")
      .then((response) => response.json())
      .then((data) => {
        const first100Sets = data.slice(0, maxItems);
        setSets(first100Sets);
      });
  }, []);

  const pages = [];
  for (var i = 1; i <= Math.ceil(maxItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="sets">
      {sets.slice(startIndex, endIndex).map((set, index) => (
        <Link key={index} to={`/sets/${set.id}`} className="set">
          {set.id} {set.name}
          <div className="pieces">
            {set.pieces &&
              set.pieces.map((piece, index) => (
                <div key={index}>
                  {piece.assets.imageMale && (
                    <img src={piece.assets.imageMale} alt={piece.name} />
                  )}
                </div>
              ))}
          </div>
          {set.bonus ? <p>{set.bonus.name}</p> : <p>Sin bonus</p>}
        </Link>
      ))}
      {currentPage > 1 && <button onClick={previusPage}>Anterior</button>}
      {pages.map((page, index) => (
        <div key={index} onClick={() => setCurrentPage(page)}>
          {page}
        </div>
      ))}
      {currentPage < pages.length && (
        <button onClick={nextPage}>Siguiente</button>
      )}
    </div>
  );
};

export default Sets;
