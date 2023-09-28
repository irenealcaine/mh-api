import loader from "../../assets/images/loader/loader.gif";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <p className="loading">Loading...</p>
      <p>This may take a while, in the meantime check out this good boy...</p>
      <img src={loader} alt={"loader"} />
    </div>
  );
};

export default Loader;
