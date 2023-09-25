import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
      <p>{ailment.description}</p>
      <h2>Recovery</h2>
      <p>Actions:</p>
      {ailment?.recovery?.actions &&
        ailment.recovery.actions.map((action, index) => <span>{action}</span>)}
      <p>Items:</p>
      {ailment?.recovery?.items &&
        ailment.recovery.items.map((item, index) => (
          <Link to={`/items/${item.id}`}>{item.name}</Link>
        ))}

      <h2>Protection</h2>
      <p>Items:</p>
      {ailment?.protection?.items &&
        ailment.protection.items.map((item, index) => (
          <Link to={`/items/${item.id}`}>{item.name}</Link>
        ))}
      <p>Skills:</p>
      {ailment?.protection?.skills &&
        ailment.protection.skills.map((skill, index) => (
          <Link to={`/skills/${skill.id}`}>{skill.name}</Link>
        ))}
    </div>
  );
};

export default AilmentPage;
