import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FormPage from "./components/FormPage/FormPage";
import SearchPage from "./components/SearchPage/SearchPage";
import About from "./components/About/About";

function App() {
  const location = useLocation();
  const urlsExcluidas = ["/"];

  return (
    <div className="App">
      {/* NavBar */}
      {!urlsExcluidas.includes(location.pathname.toLowerCase()) && <NavBar />}
      {/* Configuración de rutas */}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/DetailPage" element={<DetailPage />} />
        <Route path="/NewRecipe" element={<FormPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
