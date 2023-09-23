import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/monsters/36.png";
import "./Header.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <nav>
        <Link to={`/`}>
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
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
            <li>Locations</li>
          </Link>
          <Link to={"/weapons"}>
            <li>Weapons</li>
          </Link>
          <Link to={"/ailments"}>
            <li>Ailments</li>
          </Link>
          <Link to={"/skills"}>
            <li>Skills</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
