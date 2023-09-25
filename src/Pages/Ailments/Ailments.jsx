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
      {ailments.map((ailment, index) => (
        <Link key={index} to={`/ailments/${ailment.id}`}>
          {ailment.name}
        </Link>
      ))}
    </div>
  );
};

export default Ailments;
