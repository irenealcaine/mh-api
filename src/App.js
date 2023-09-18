import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MonsterPage from "./Pages/MonsterPage/MonsterPage";
import Monsters from "./Pages/Monsters/Monsters";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Monsters />} />
          <Route path="/monsters/:id" element={<MonsterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
