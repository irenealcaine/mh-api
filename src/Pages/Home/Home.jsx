import { Link } from "react-router-dom";
import "./Home.css"
import AAA from "../../assets/images/monsters/42.png"

const homeItems = [
  {
    "name": "monsters",
    "img": AAA
  }, {
    "name": "sets",
    "img": AAA
  }, {
    "name": "items",
    "img": AAA
  }, {
    "name": "locations",
    "img": AAA
  }, {
    "name": "weapons",
    "img": AAA
  }, {
    "name": "ailments",
    "img": AAA
  }, {
    "name": "skills",
    "img": AAA
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
            <img src={homeItem.img} alt={homeItem.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
