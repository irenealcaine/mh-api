import { Link } from "react-router-dom";
import greatSword from "../../assets/images/weapons/great-sword.png";
import longSword from "../../assets/images/weapons/long-sword.png";
import swordAndShield from "../../assets/images/weapons/sword-and-shield.png";
import dualBlades from "../../assets/images/weapons/dual-blades.png";
import hammer from "../../assets/images/weapons/hammer.png";
import huntingHorn from "../../assets/images/weapons/hunting-horn.png";
import lance from "../../assets/images/weapons/lance.png";
import gunlance from "../../assets/images/weapons/gunlance.png";
import switchAxe from "../../assets/images/weapons/switch-axe.png";
import chargeBlade from "../../assets/images/weapons/charge-blade.png";
import insectGlaive from "../../assets/images/weapons/insect-glaive.png";
import lightBowgun from "../../assets/images/weapons/light-bowgun.png";
import heavyBowgun from "../../assets/images/weapons/heavy-bowgun.png";
import bow from "../../assets/images/weapons/bow.png";

const categories = [
  {
    slug: "great-sword",
    name: "Great sword",
    img: greatSword,
  },
  {
    slug: "long-sword",
    name: "Long sword",
    img: longSword,
  },
  {
    slug: "sword-and-shield",
    name: "Sword and shield",
    img: swordAndShield,
  },
  {
    slug: "dual-blades",
    name: "Dual blades",
    img: dualBlades,
  },
  {
    slug: "hammer",
    name: "Hammer",
    img: hammer,
  },
  {
    slug: "hunting-horn",
    name: "hunting-horn",
    img: huntingHorn,
  },
  {
    slug: "lance",
    name: "lance",
    img: lance,
  },
  {
    slug: "gunlance",
    name: "gunlance",
    img: gunlance,
  },
  {
    slug: "switch-axe",
    name: "switch-axe",
    img: switchAxe,
  },
  {
    slug: "charge-blade",
    name: "Charge blade",
    img: chargeBlade,
  },
  {
    slug: "insect-glaive",
    name: "Insect glaive",
    img: insectGlaive,
  },
  {
    slug: "light-bowgun",
    name: "Light bowgun",
    img: lightBowgun,
  },
  {
    slug: "heavy-bowgun",
    name: "Heavy bowgun",
    img: heavyBowgun,
  },
  {
    slug: "bow",
    name: "Bow",
    img: bow,
  },
];

const WeaponsCategories = () => {
  return (
    <div className="weaponsCategories">
      <h1>Weapons</h1>
      {categories.map((category, index) => (
        <Link key={index} to={`/weapons/${category.slug}`}>
          <p>{category.name}</p>
          <img src={category.img} alt={category.name} />
        </Link>
      ))}
    </div>
  );
};

export default WeaponsCategories;
