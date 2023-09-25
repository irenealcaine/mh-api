import { Link } from "react-router-dom";

const categories = [
  {
    slug: "great-sword",
    name: "Great sword",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "long-sword",
    name: "Long sword",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "sword-and-shield",
    name: "sword-and-shield",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "dual-blades",
    name: "dual-blades",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "hammer",
    name: "hammer",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "hunting-horn",
    name: "hunting-horn",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "lance",
    name: "lance",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "gunlance",
    name: "gunlance",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "switch-axe",
    name: "switch-axe",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "charge-blade",
    name: "charge-blade",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "insect-glaive",
    name: "insect-glaive",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "light-bowgun",
    name: "light-bowgun",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "heavy-bowgun",
    name: "heavy-bowgun",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
  {
    slug: "bow",
    name: "bow",
    img: "https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png",
  },
];

const WeaponsCategories = () => {
  return (
    <div className="weaponsCategories">
      {categories.map((category, index) => (
        <Link key={index} to={`/weapons/${category.slug}`}>
          <p>{category.name}</p>
          <img src={category.img} />
        </Link>
      ))}
    </div>
  );
};

export default WeaponsCategories;
