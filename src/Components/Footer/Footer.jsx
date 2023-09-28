import { FiGithub } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { TbWorldWww } from "react-icons/tb";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <a
        href={"https://github.com/irenealcaine"}
        target={"_blank"}
        rel={"norreferer noreferrer"}
      >
        <FiGithub />
      </a>
      <a
        href={"mailto:irenealcainealvarez@gmail.com?Subject=Let's talk!"}
        target={"_blank"}
        rel={"norreferer noreferrer"}
      >
        <HiOutlineMail />
      </a>
      <a
        href={"https://irenealcainealvarez.es"}
        target={"_blank"}
        rel={"norreferer noreferrer"}
      >
        <TbWorldWww />
      </a>
    </div>
  );
};

export default Footer;
