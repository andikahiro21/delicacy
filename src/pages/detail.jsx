import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { callAPI } from "../domain/api";
import ingIcon from "/./ingredient.svg";
import "../style/detail.css";

function Detail() {
  const { id } = useParams();
  const [recipiesDisplay, setRecipiesDisplay] = useState({});

  useEffect(() => {
    const fetchRecipies = async () => {
      try {
        const data = await callAPI({
          endpoint: `/lookup.php?i=${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setRecipiesDisplay(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipies();
  }, [id]);

  const recipe = recipiesDisplay.meals && recipiesDisplay.meals[0];

  const ingredients = [];
  const measures = [];

  if (recipe) {
    for (let i = 1; i <= 4; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(ingredient);
        measures.push(measure);
      }
    }
  }

  return (
    <div className="detail">
      <div className="cardContainer">
        <div className="card">
          <div className="description">
            <div className="header">
              <h1>{recipe ? recipe.strMeal : ""}</h1>
              <p>{recipe ? recipe.strInstructions : ""}</p>
            </div>
            <div className="ingredients">
              <h1>Ingredients</h1>
              <div className="ingContainer">
                {ingredients.map((ingredient, index) => (
                  <div className="ingCard" key={index}>
                    <div className="ingImg">
                      <img src={ingIcon} alt="" />
                    </div>
                    <div className="ingDesc">
                      <h1>{ingredient}</h1>
                      <p>{measures[index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="btnContainer">
              <button>Detail</button>
              <button>Add To Favorite</button>
            </div>
          </div>
          <div className="imgContainer">
            <img src={recipe ? recipe.strMealThumb : ""} alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
