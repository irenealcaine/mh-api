import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sets.css";
import fire from "../../assets/images/icons/fire.png";
import water from "../../assets/images/icons/water.png";
import ice from "../../assets/images/icons/ice.png";
import thunder from "../../assets/images/icons/thunder.png";
import dragon from "../../assets/images/icons/dragon.png";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import Loader from "../../Components/Loader/Loader";

const Sets = () => {
  const [sets, setSets] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rangeValue, setRangeValue] = useState(10);
  const [selectValue, setSelectValue] = useState(null);
  const [filteredSets, setFilteredSets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    fetch("https://mhw-db.com/armor/sets")
      .then((response) => response.json())
      .then((data) => {
        setSets(data);
        setFilteredSets(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = sets
      .filter((set) =>
        set.name.toLowerCase().includes(inputValue.toLowerCase()),
      )
      .filter((set) => (selectValue ? set.rank === selectValue : true))
      .filter(
        (set) =>
          rangeValue &&
          set.pieces[0].defense.base * set.pieces.length >=
            parseInt(rangeValue),
      );
    setFilteredSets(filtered);
    setCurrentPage(1);
  }, [inputValue, selectValue, sets, rangeValue]);

  const totalFilteredPages = Math.ceil(filteredSets.length / itemsPerPage);
  const pages = [];
  for (var i = 1; i <= totalFilteredPages; i++) {
    pages.push(i);
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderPaginationButtons = () => {
    if (currentPage > 1) {
      return (
        <button onClick={previousPage}>
          <AiOutlineCaretLeft />
        </button>
      );
    }
    return null;
  };

  const renderPageNumbers = () => {
    return pages.map((page) => (
      <div
        className={`pageNumber ${page === currentPage && "selected"}`}
        key={page}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </div>
    ));
  };

  const renderSets = () => {
    return filteredSets.slice(startIndex, endIndex).map((set, index) => (
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

        <h3>Base defense</h3>
        <p>{set.pieces[0].defense.base * set.pieces.length}</p>

        <h3> Resistances</h3>
        <div className="resistances">
          <div className="resistance">
            <img src={fire} alt="fire" className="resistanceIcon" />
            <p className={set.pieces[0].resistances.fire < 0 && "negative"}>
              {" "}
              {set.pieces[0].resistances.fire * set.pieces.length}
            </p>
          </div>
          <div className="resistance">
            <img src={water} alt="water" className="resistanceIcon" />
            <p className={set.pieces[0].resistances.water < 0 && "negative"}>
              {set.pieces[0].resistances.water * set.pieces.length}
            </p>
          </div>
          <div className="resistance">
            <img src={ice} alt="ice" className="resistanceIcon" />
            <p className={set.pieces[0].resistances.ice < 0 && "negative"}>
              {set.pieces[0].resistances.ice * set.pieces.length}
            </p>
          </div>
          <div className="resistance">
            <img src={thunder} alt="thunder" className="resistanceIcon" />
            <p className={set.pieces[0].resistances.thunder < 0 && "negative"}>
              {set.pieces[0].resistances.thunder * set.pieces.length}
            </p>
          </div>
          <div className="resistance">
            <img src={dragon} alt="dragon" className="resistanceIcon" />
            <p className={set.pieces[0].resistances.dragon < 0 && "negative"}>
              {set.pieces[0].resistances.dragon * set.pieces.length}
            </p>
          </div>
        </div>
        {set.bonus ? (
          <div>
            <h3>Bonus</h3> <p>{set.bonus.name}</p>{" "}
          </div>
        ) : null}
      </Link>
    ));
  };

  const renderLoader = () => {
    if (isLoading) {
      return <Loader />;
    }
    return null;
  };

  return (
    <div>
      <h1>Sets</h1>
      <div className="inputs">
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="input">
          <p>Defense</p>
          <input
            className="range"
            type="range"
            min="10"
            max="1000"
            step="5"
            value={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          />
          <p>{rangeValue}</p>
        </div>

        <select
          className="input"
          onChange={(e) => setSelectValue(e.target.value)}
          value={selectValue || ""}
        >
          <option value={""}>Rank</option>
          <option value={"low"}>Low</option>
          <option value={"high"}>High</option>
          <option value={"master"}>Master</option>
        </select>
      </div>

      <div className="pagesNumber">
        {renderPaginationButtons()}
        {renderPageNumbers()}
        {currentPage < pages.length && (
          <button onClick={nextPage}>
            <AiOutlineCaretRight />
          </button>
        )}
      </div>

      {renderLoader()}

      <div className="sets">{renderSets()}</div>

      <div className="pagesNumber">
        {renderPaginationButtons()}
        {renderPageNumbers()}
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
