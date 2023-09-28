import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Locations.css";
// import Ancient Forest from "../../assets/images/locations/ancientForest.webp";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`https://mhw-db.com/locations`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);

  return (
    <div className="locations">
      <h1>Locations</h1>
      <div className="locationsContainer">
        {locations.map((location, index) => (
          <Link
            key={index}
            to={`/locations/${location.id}`}
            className="locationItem"
          >
            <h2>{location.name}</h2>
            <img
              src={require(
                `../../assets/images/locations/${location.name}.webp`,
              )}
              alt={location.name}
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Locations;
