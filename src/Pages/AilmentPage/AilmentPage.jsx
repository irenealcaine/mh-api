import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AilmentPage = () => {
  const [ailment, setAilment] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/ailments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAilment(data);
        console.log(data);
      });
  }, [id, ailment.id]);

  return (
    <div className="ailmentPage">
      <h1>{ailment.name}</h1>
    </div>
  );
};

export default AilmentPage;
