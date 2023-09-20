import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SetPage = () => {
  const [set, setSet] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mhw-db.com/armor/sets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSet(data);
      });
  }, [id, set.id]);

  return (
    <div className="header">
      <div>{set.name}</div>
    </div>
  );
};

export default SetPage;
