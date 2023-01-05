import React from "react";
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
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
    <div className="main-container">
      {films.map((film) => {
        return (
          <div className="film-containers">
            <a href={`/${film.title}`}>
              <h2>{film.title}</h2>
            </a>
          </div>
        );
      })}
    </div>
  );
}
