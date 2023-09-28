import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Main.css";

const Main = ({ children }) => {
  return (
    <div className="main">
      <img
        className="bg"
        src="https://i.redd.it/cknepx23usg41.png"
        alt="background"
        loading="lazy"
      />
      <div className="bg2"></div>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Main;
