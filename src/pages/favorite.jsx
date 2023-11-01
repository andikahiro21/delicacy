import React, { useState, useEffect, useRef } from "react";
import { callAPI } from "../domain/api";
import "../style/favorite.css";
import { Link } from "react-router-dom";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <div className="favorite">
      <div className="containerCard">
        {favorites.map((favorite) => (
          <div className="card" key={favorite.idMeal}>
            <Link className="linkmoreRecipies" to={`/detailRecipies/${favorite.idMeal}`}>
              <div className="imgCont">
                <img src={favorite.strMealThumb} alt="" />
              </div>
              <div className="titleCard">
                <h1>{favorite.strMeal}</h1>
              </div>
            </Link>
            <div className="btnContainer">
              <button onClick={() => removeFavorite(favorite.idMeal)}>Remove Favorite</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
