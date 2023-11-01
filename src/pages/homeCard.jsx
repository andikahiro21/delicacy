import React, { useState, useEffect, useRef } from "react";
import { callAPI } from "../domain/api";
import "../style/home.css";
import ingIcon from "/./ingredient.svg";
import { Link } from "react-router-dom";

function Home({ activeCategory }) {
  const [meals, setMeal] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    const fetchMeals = async () => {
      try {
        const data = await callAPI({
          endpoint: `/filter.php?c=${activeCategory}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dataFilter = data.meals.slice(0, 5);
        const idMeals = dataFilter.map((meal) => meal.idMeal);
        const mealPromises = idMeals.map((id) => {
          return callAPI({
            endpoint: `/lookup.php?i=${id}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        });
        const mealData = await Promise.all(mealPromises);
        setMeal(mealData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeals();
  }, [activeCategory]);
  const cardContainerRef = useRef(null);
  useEffect(() => {
    if (cardContainerRef.current) {
      const onWheel = (e) => {
        e.preventDefault();
        cardContainerRef.current.scrollLeft += e.deltaY;
      };

      cardContainerRef.current.addEventListener("wheel", onWheel);

      return () => {
        if (cardContainerRef.current) {
          cardContainerRef.current.removeEventListener("wheel", onWheel);
        }
      };
    }
  }, []);
  const handleAddToFavorites = (data) => {
    const isAlreadyAdded = favorites.some((favorite) => favorite.idMeal === data.idMeal);

    if (isAlreadyAdded) {
      const updatedFavorites = favorites.filter((favorite) => favorite.idMeal !== data.idMeal);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, data];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="home">
      <div className="cardContainer" ref={cardContainerRef}>
        {meals.map((meal) => {
          const data = meal.meals[0];
          const isFavorite = favorites.some((favorite) => favorite.idMeal === data.idMeal);
          return (
            <div className="card">
              <div className="description">
                <div className="header">
                  <h1>{data.strMeal}</h1>
                  <p>{data.strInstructions}</p>
                </div>
                <div className="ingredients">
                  <h1>Ingredients</h1>
                  <div className="ingContainer">
                    <div className="ingCard">
                      <div className="ingImg">
                        <img src={ingIcon} alt="" />
                      </div>
                      <div className="ingDesc">
                        <h1>{data.strIngredient1}</h1>
                        <p>{data.strMeasure1}</p>
                      </div>
                    </div>
                    <div className="ingCard">
                      <div className="ingImg">
                        <img src={ingIcon} alt="" />
                      </div>
                      <div className="ingDesc">
                        <h1>{data.strIngredient2}</h1>
                        <p>{data.strMeasure2}</p>
                      </div>
                    </div>
                    <div className="ingCard">
                      <div className="ingImg">
                        <img src={ingIcon} alt="" />
                      </div>
                      <div className="ingDesc">
                        <h1>{data.strIngredient3}</h1>
                        <p>{data.strMeasure3}</p>
                      </div>
                    </div>
                    <div className="ingCard">
                      <div className="ingImg">
                        <img src={ingIcon} alt="" />
                      </div>
                      <div className="ingDesc">
                        <h1>{data.strIngredient4}</h1>
                        <p>{data.strMeasure4}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btnContainer">
                  <Link to={`/detailRecipies/${data.idMeal}`}>
                    <button>Detail</button>
                  </Link>
                  <button onClick={() => handleAddToFavorites(data)}>{isFavorite ? "Remove Favorite" : "Add To Favorite"}</button>
                </div>
              </div>
              <div className="imgContainer">
                <img src={data.strMealThumb} alt="Image" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
