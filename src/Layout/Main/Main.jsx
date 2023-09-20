import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Main.css";

const Main = ({ children }) => {
  return (
    <div className="main">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Main;
