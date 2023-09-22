import "./Header.css";
import logo from "../../assets/images/monsters/36.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <Link to={`/`}>
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <ul>
          <Link to={"/monsters"}>
            <li>Monsters</li>
          </Link>
          <Link to={"/sets"}>
            <li>Sets</li>
          </Link>
          <Link to={"/items"}>
            <li>Items</li>
          </Link>
          <Link to={"/locations"}>
            <li>locations</li>
          </Link>
          <Link to={"/weapons"}>
            <li>weapons</li>
          </Link>
          <Link to={"/ailments"}>
            <li>ailments</li>
          </Link>
          <Link to={"/skills"}>
            <li>skills</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
