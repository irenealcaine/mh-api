import { FiGithub } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { TbWorldWww } from "react-icons/tb";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <FiGithub />
      <HiOutlineMail />
      <TbWorldWww />
    </div>
  );
};

export default Footer;
