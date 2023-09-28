import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/monsters/36.png";
import "./Header.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { homeItems } from "../../Utils/Constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuActiveClass = isMenuOpen ? "active" : "";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <nav>
        <Link to={`/`}>
          <img src={logo} className="logo" alt="logo" loading="lazy" />
        </Link>

        <ul className={`nav-links ${menuActiveClass}`}>
          {homeItems.map((homeItem) => (
            <Link
              key={homeItem.name}
              to={`/${homeItem.name}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <li>{homeItem.name}</li>
            </Link>
          ))}
        </ul>

        <div className={`menu-toggle ${menuActiveClass}`} onClick={toggleMenu}>
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </nav>
    </div>
  );
};

export default Header;
