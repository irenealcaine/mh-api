import { useEffect, useState } from "react";

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
        <div key={index}>{ailment.name}</div>
      ))}
    </div>
  );
};

export default Ailments;
