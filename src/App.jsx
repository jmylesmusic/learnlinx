import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, SignIn } from "./pages";
function App() {
  return (
    <>
      <Home />
      <SignIn />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
