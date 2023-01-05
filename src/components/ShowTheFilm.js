import React from "react";
import "./ShowTheFilm.css";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ShowTheFilm = ({ films }) => {
  const [characters, setCharacters] = useState([]);
  const [species, setSpecies] = useState([]);
  const [planets, setPlanets] = useState([]);


  //identify the exact film and set it as variable "theFilm"
  const theId = useLocation().pathname.slice(1);
  const theFilm = films.find((film) => film.title === decodeURI(theId));

  //function of getting characters of the exact film
  const getCharacters = useCallback(async () => {
    let p = [];
    let characters = [];
    if (theFilm) {
      for (let character of theFilm.characters) {
        p.push(
          await axios.get(character).then((res) => {
            characters.push(res.data.name);
          })
        );
      }
      Promise.all(p).then(() => setCharacters(characters));
    }
  }, [theFilm]);

  //function of getting species of the exact film
  const getSpecies = useCallback(async () => {
    let p = [];
    let species = [];
    if (theFilm) {
      for (let specie of theFilm.species) {
        p.push(
          await axios.get(specie).then((res) => {
            species.push(res.data.name);
          })
        );
      }
      Promise.all(p).then(() => setSpecies(species));
    }
  }, [theFilm]);

  //function of getting planets of the exact film
  const getPlanets = useCallback(async () => {
    let p = [];
    let planets = [];
    if (theFilm) {
      for (let planet of theFilm.planets) {
        p.push(
          await axios.get(planet).then((res) => {
            planets.push(res.data.name);
          })
        );
      }
      Promise.all(p).then(() => setPlanets(planets));
    }
  }, [theFilm]);


  useEffect(() => {
    getSpecies();
    getPlanets();
    getCharacters();
  }, [films, getSpecies, getPlanets, getCharacters]);


  return (
    <div>
      {theFilm ? (
        <React.Fragment>
          <div className="film-info-box">
            <div id="the-film">
              <h2>{theFilm.title}</h2>
            </div>
            <a href={"/"}>
              <button className="btn btn-secondary">Back</button>
            </a>

            <div id="film-intro">            
              <p>{theFilm.director}</p>
              <p>{theFilm.release_date}</p>
              <p>{theFilm.opening_crawl}</p>
            </div>
          </div>

        <div id="all-cards">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="card">
              <h2 className="card-title">characters</h2>
              <div className="card-body">
                {theFilm.characters.length > 0 ? (
                  characters.map((character) => (
                    <div className="card-text" key={character}>
                      <p className="card-text">{character}</p>
                    </div>
                  ))
                ) : (
                  <div className="card-text">
                    <p className="card-text">data not found</p>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h2 className="card-title">planets</h2>
              <div className="card-body">
                {theFilm.planets.length > 0 ? (
                  planets.map((planet) => (
                    <div className="card-text" key={planet}>
                      <p className="card-text">{planet}</p>
                    </div>
                  ))
                ) : (
                  <div className="card-text">
                    <p className="card-text">data not found</p>
                  </div>
                )}
              </div>
            </div>
         
            <div className="card">
              <h2 className="card-title">species</h2>
              <div className="card-body">
                {theFilm.characters.length > 0 ? (
                  species.map((specie) => (
                    <div className="card-text" key={specie}>
                      <p className="card-text">{specie}</p>
                    </div>
                  ))
                ) : (
                  <div className="card-text">
                    <p className="card-text">data not found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </React.Fragment>
      ): <p>data not found...</p>}
    </div>
  );
};

export default ShowTheFilm;
