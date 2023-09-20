import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

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
