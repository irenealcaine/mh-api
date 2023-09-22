import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Ailments = () => {
  const [ailments, setAilments] = useState([]);

  useEffect(() => {
    fetch(`https://mhw-db.com/ailments`)
      .then((response) => response.json())
      .then((data) => {
        setAilments(data);
        // console.log(data);
      });
  }, []);

  return (
    <div className="ailments">
      {ailments.map((ailment, index) => (
        <Link key={index} to={`/ailments/${ailment.id}`}>
          {ailment.name}
        </Link>
      ))}
    </div>
  );
};

export default Ailments;
