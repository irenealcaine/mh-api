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
import SetPage from "./Pages/SetPage/SetPage";
import Sets from "./Pages/Sets/Sets";
import SkillPage from "./Pages/SkillPage/SkillPage";
import Skills from "./Pages/Skills/Skills";
import WeaponPage from "./Pages/WeaponPage/WeaponPage";
import Weapons from "./Pages/Weapons/Weapons";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/monsters" exact element={<Monsters />} />
            <Route path="/monsters/:id" element={<MonsterPage />} />
            <Route path="/sets" exact element={<Sets />} />
            <Route path="/sets/:id" exact element={<SetPage />} />
            <Route path="/items" exact element={<Items />} />
            <Route path="/items/:id" exact element={<ItemPage />} />
            <Route path="/locations" exact element={<Locations />} />
            <Route path="/locations/:id" exact element={<LocationPage />} />
            <Route path="/weapons" exact element={<Weapons />} />
            <Route path="/weapons/:id" exact element={<WeaponPage />} />
            <Route path="/ailments" exact element={<Ailments />} />
            <Route path="/ailments/:id" exact element={<AilmentPage />} />
            <Route path="/skills" exact element={<Skills />} />
            <Route path="/skills/:id" exact element={<SkillPage />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
