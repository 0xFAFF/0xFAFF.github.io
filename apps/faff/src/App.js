import "./App.css";
import Faff from "./faff";
import Xurb from "./xurb.js";
import Pitch from "./pitch.js";
import { HashRouter, Route, Routes } from "react-router";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Faff />}></Route>
        <Route exact path="/xurb" element={<Xurb />}></Route>
        <Route exact path="/xurb/pitch" element={<Pitch />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
