import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Layout/Main/Main";
import Home from "./Pages/Home/Home";
import ItemPage from "./Pages/ItemPage/ItemPage";
import Items from "./Pages/Items/Items";
import MonsterPage from "./Pages/MonsterPage/MonsterPage";
import Monsters from "./Pages/Monsters/Monsters";
import SetPage from "./Pages/SetPage/SetPage";
import Sets from "./Pages/Sets/Sets";

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
          </Routes>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
