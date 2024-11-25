import "./App.css";
import Faff from "./faff";
import Xurb from "./xurb";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route exact path="/" element={<Faff />}></Route>
        <Route exact path="/xurb" element={<Xurb />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
