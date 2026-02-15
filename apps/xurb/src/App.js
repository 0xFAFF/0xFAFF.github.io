import "./App.css";
import Xurb from "./xurb.js";
import Pitch from "./pitch.js";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Xurb />}></Route>
        <Route exact path="/pitch" element={<Pitch />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
