import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowTheFilm from "./components/ShowTheFilm";
import Footer from "./components/Footer";

function App() {
  //react hooks were generally used in this application
  //here getting the data(name of the film) from api
  const [films, setFilms] = useState([]);
  useEffect(() => {
    axios
      .get("https://swapi.dev/api/films")
      .then((res) => {
        setFilms(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage films={films} />} />
          <Route path="/:id" element={<ShowTheFilm films={films} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
