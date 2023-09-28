import loader from "../../assets/images/loader/loader.gif";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <p>Loading... This may take a while, look a this good boy</p>
      <img src={loader} alt={"loader"} />
    </div>
  );
};

export default Loader;
