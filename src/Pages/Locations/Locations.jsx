import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      {locations.map((location, index) => (
        <Link key={index} to={`/locations/${location.id}`}>
          {location.name}
        </Link>
      ))}
    </div>
  );
};

export default Locations;
