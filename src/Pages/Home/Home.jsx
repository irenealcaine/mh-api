import { Link } from "react-router-dom";
import "./Home.css";
import { homeItems } from "../../Utils/Constants";

const Home = () => {
  return (
    <div className="home">
      <h1>Monster Hunter Api</h1>

      <div className="homeContainer">
        {homeItems.map((homeItem, index) => (
          <Link key={index} className="homeItem" to={`/${homeItem.name}`}>
            <h2>{homeItem.name}</h2>
            {console.log()}
            <img
              src={require(
                `../../assets/images/monsters/${Math.floor(
                  Math.random() * 44 + 1,
                )}.png`,
              )}
              alt={homeItem.name}
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
