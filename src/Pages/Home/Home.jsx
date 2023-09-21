import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <Link to={"/monsters"}>Monsters</Link>
      <Link to={"/sets"}>Sets</Link>
      <Link to={"/items"}>Items</Link>
    </div>
  );
};

export default Home;
