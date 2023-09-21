import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sets.css";

const Sets = () => {
  const [sets, setSets] = useState([]);

  const itemsPerPage = 10;
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
    <div>
      <h1>Sets</h1>
      <div className="sets">
        {sets.slice(startIndex, endIndex).map((set, index) => (
          <Link key={index} to={`/sets/${set.id}`} className="set">
            {/* {set.id}  */}
            <h2 className="setName">{set.name}</h2>
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
            {set.bonus ? <p>Bonus: {set.bonus.name}</p> : <p>Without bonus</p>}
          </Link>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && <button onClick={previusPage}>Previus</button>}
        <div className="pagesNumber">
          {pages.map((page, index) => (
            <div
              className={`pageNumber ${page === currentPage && "selected"}`}
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
        </div>
        {currentPage < pages.length && <button onClick={nextPage}>Next</button>}
      </div>
    </div>
  );
};

export default Sets;
