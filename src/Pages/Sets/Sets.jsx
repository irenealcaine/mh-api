import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sets.css";
import fire from "../../assets/images/icons/fire.png";
import water from "../../assets/images/icons/water.png";
import ice from "../../assets/images/icons/ice.png";
import thunder from "../../assets/images/icons/thunder.png";
import dragon from "../../assets/images/icons/dragon.png";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const Sets = () => {
  const [sets, setSets] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);
  const [filteredSets, setFilteredSets] = useState([]);

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

  // const maxItems = 100;

  useEffect(() => {
    fetch("https://mhw-db.com/armor/sets")
      .then((response) => response.json())
      .then((data) => {
        // const first100Sets = data.slice(0, maxItems);
        // setSets(first100Sets);
        setSets(data);
        // const filteredSets = data
        //   .filter((set) =>
        //     set.name.toLowerCase().includes(inputValue.toLowerCase()),
        //   )
        //   .filter((set) => (selectValue ? set.rank === selectValue : set));
        // setSets(filteredSets);
        setFilteredSets(data);
      });
  }, []);

  useEffect(() => {
    // Filtra los conjuntos cuando cambia el valor de búsqueda o selección
    const filtered = sets
      .filter((set) =>
        set.name.toLowerCase().includes(inputValue.toLowerCase()),
      )
      .filter((set) => (selectValue ? set.rank === selectValue : true)); // Modificado: Usa "true" para mantener los conjuntos si no hay selección

    setFilteredSets(filtered);
    setCurrentPage(1); // Restablece la página actual al filtrar
  }, [inputValue, selectValue, sets]);

  const totalFilteredPages = Math.ceil(filteredSets.length / itemsPerPage);

  const pages = [];
  for (var i = 1; i <= totalFilteredPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      <h1>Sets</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option defaultValue hidden>
          Rank
        </option>
        <option value={"low"}>Low</option>
        <option value={"high"}>High</option>
        <option value={"master"}>Master</option>
      </select>
      {/* <div className="pagination"> */}
      <div className="pagesNumber">
        {currentPage > 1 && (
          <button onClick={previusPage}>
            <AiOutlineCaretLeft />
          </button>
        )}
        {pages.map((page, index) => (
          <div
            className={`pageNumber ${page === currentPage && "selected"}`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </div>
        ))}
        {currentPage < pages.length && (
          <button onClick={nextPage}>
            <AiOutlineCaretRight />
          </button>
        )}
      </div>
      {/* </div> */}
      <div className="sets">
        {sets
          .filter((set) =>
            set.name.toLowerCase().includes(inputValue.toLowerCase()),
          )
          .filter((set) => (selectValue ? set.rank === selectValue : set))
          .slice(startIndex, endIndex)
          .map((set, index) => (
            <Link key={index} to={`/sets/${set.id}`} className="set">
              <h2 className="setName">{set.name}</h2>
              <div className="pieces">
                {set.pieces &&
                  set.pieces.map((piece, index) => (
                    <div key={index}>
                      {piece?.assets?.imageMale && (
                        <img
                          className="pieceImg"
                          src={piece.assets.imageMale}
                          alt={piece.name}
                        />
                      )}
                    </div>
                  ))}
              </div>
              <p>
                Base defense: {set.pieces[0].defense.base * set.pieces.length}
              </p>
              <p> Resistances:</p>
              <div className="resistances">
                <div className="resistance">
                  <img src={fire} alt="fire" className="resistanceIcon" />
                  <p
                    className={set.pieces[0].resistances.fire < 0 && "negative"}
                  >
                    {" "}
                    {set.pieces[0].resistances.fire * set.pieces.length}
                  </p>
                </div>
                <div className="resistance">
                  <img src={water} alt="water" className="resistanceIcon" />
                  <p
                    className={
                      set.pieces[0].resistances.water < 0 && "negative"
                    }
                  >
                    {set.pieces[0].resistances.water * set.pieces.length}
                  </p>
                </div>
                <div className="resistance">
                  <img src={ice} alt="ice" className="resistanceIcon" />
                  <p
                    className={set.pieces[0].resistances.ice < 0 && "negative"}
                  >
                    {set.pieces[0].resistances.ice * set.pieces.length}
                  </p>
                </div>
                <div className="resistance">
                  <img src={thunder} alt="thunder" className="resistanceIcon" />
                  <p
                    className={
                      set.pieces[0].resistances.thunder < 0 && "negative"
                    }
                  >
                    {set.pieces[0].resistances.thunder * set.pieces.length}
                  </p>
                </div>
                <div className="resistance">
                  <img src={dragon} alt="dragon" className="resistanceIcon" />
                  <p
                    className={
                      set.pieces[0].resistances.dragon < 0 && "negative"
                    }
                  >
                    {set.pieces[0].resistances.dragon * set.pieces.length}
                  </p>
                </div>
              </div>
              {set.bonus ? (
                <p>Bonus: {set.bonus.name}</p>
              ) : (
                <p>Without bonus</p>
              )}
            </Link>
          ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={previusPage}>
            <AiOutlineCaretLeft />
          </button>
        )}
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
        {currentPage < pages.length && (
          <button onClick={nextPage}>
            <AiOutlineCaretRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sets;
