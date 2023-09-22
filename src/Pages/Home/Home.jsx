import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <Link to={"/monsters"}>Monsters</Link>
      <Link to={"/sets"}>Sets</Link>
      <Link to={"/items"}>Items</Link>
      <Link to={"/locations"}>locations</Link>
      <Link to={"/weapons"}>weapons</Link>
      <Link to={"/ailments"}>ailments</Link>
      <Link to={"/skills"}>skills</Link>
    </div>
  );
};

export default Home;
