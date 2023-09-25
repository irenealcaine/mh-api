import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Layout/Main/Main";
import AilmentPage from "./Pages/AilmentPage/AilmentPage";
import Ailments from "./Pages/Ailments/Ailments";
import Home from "./Pages/Home/Home";
import ItemPage from "./Pages/ItemPage/ItemPage";
import Items from "./Pages/Items/Items";
import LocationPage from "./Pages/LocationPage/LocationPage";
import Locations from "./Pages/Locations/Locations";
import MonsterPage from "./Pages/MonsterPage/MonsterPage";
import Monsters from "./Pages/Monsters/Monsters";
import NotFound from "./Pages/NotFound/NotFound";
import SetPage from "./Pages/SetPage/SetPage";
import Sets from "./Pages/Sets/Sets";
import SkillPage from "./Pages/SkillPage/SkillPage";
import Skills from "./Pages/Skills/Skills";
import WeaponPage from "./Pages/WeaponPage/WeaponPage";
import Weapons from "./Pages/Weapons/Weapons";
import WeaponsCategories from "./Pages/WeaponsCategories/WeaponsCategories";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />

            <Route path="/monsters" element={<Monsters />} />
            <Route path="/monsters/:id" element={<MonsterPage />} />
            <Route path="/sets" element={<Sets />} />
            <Route path="/sets/:id" element={<SetPage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:id" element={<LocationPage />} />
            <Route path="/weapons" element={<WeaponsCategories />} />
            <Route path="/weapons/:slug" element={<Weapons />} />
            <Route path="/weapons/*" element={<NotFound />} />
            <Route path="/weapons/:slug/:id" element={<WeaponPage />} />
            <Route path="/weapons/*/*" element={<NotFound />} />
            <Route path="/ailments" element={<Ailments />} />
            <Route path="/ailments/:id" element={<AilmentPage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/skills/:id" element={<SkillPage />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
