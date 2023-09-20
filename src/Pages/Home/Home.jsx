import { Link } from "react-router-dom";
import Main from "../../Layout/Main/Main";

const Home = () => {
  return (
    // <Main>
    <div className="">
      <Link to={"/monsters"}>Monsters</Link>
      <Link to={"/sets"}>Sets</Link>
    </div>
    // </Main>
  );
};

export default Home;
