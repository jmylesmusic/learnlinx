import "./App.css";
import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import { Home, SignIn, Navbar } from "./pages";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
