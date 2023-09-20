import "./Header.css";
import logo from "../../assets/images/monsters/36.png";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <img src={logo} className="logo" />
        <ul>
          <li>Monsters</li>
          <li>Sets</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
