import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Ailments = () => {
  const [ailments, setAilments] = useState([]);

  useEffect(() => {
    fetch(`https://mhw-db.com/ailments`)
      .then((response) => response.json())
      .then((data) => {
        setAilments(data);
      });
  }, []);

  return (
    <div className="ailments">
      <h1>Ailments</h1>
      <div className="buttonContainer">
        {ailments.map((ailment, index) => (
          <Link key={index} to={`/ailments/${ailment.id}`} className="button">
            {ailment.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ailments;
