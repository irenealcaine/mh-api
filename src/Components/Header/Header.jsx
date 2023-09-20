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
          <li>Monsters</li>
          <li>Sets</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
