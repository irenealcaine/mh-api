import { Link } from "react-router-dom";
import "./Home.css"

const homeItems = [
  {
    "name": "monsters",
  }, {
    "name": "sets",
  }, {
    "name": "weapons",
  }, {
    "name": "locations",
  }, {
    "name": "items",
  }, {
    "name": "ailments",
  }, {
    "name": "skills",
  },
]

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
              src={require(`../../assets/images/monsters/${Math.floor(Math.random() * 44 + 1)}.png`)}
              alt={homeItem.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
