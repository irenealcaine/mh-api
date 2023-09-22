import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LocationPage = () => {
  const [location, setLocation] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/locations/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLocation(data);
        console.log(data);
      });
  }, [id, location.id]);

  return (
    <div className="locationPage">
      <h1>{location.name}</h1>
    </div>
  );
};

export default LocationPage;
