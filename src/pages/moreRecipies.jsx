import React, { useState, useEffect, useRef } from "react";
import { callAPI } from "../domain/api";
import "../style/moreRecipies.css";
import { Link } from "react-router-dom";

function MoreRecipies() {
  const [meals, setMeal] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await callAPI({
          endpoint: `/filter.php?c=Seafood`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dataFilter = data.meals.slice(0, 6);
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
  }, []);
  return (
    <div className="moreRecipies">
      <div className="title">
        <h1>More recipies</h1>
      </div>
      <div className="containerCard">
        {meals.map((meal) => {
          const data = meal.meals[0];
          return (
            <Link className="linkmoreRecipies" to={`/detailRecipies/${data.idMeal}`} key={data.idMeal}>
              <div className="card">
                <div className="imgCont">
                  <img src={data.strMealThumb} alt="" />
                </div>
                <div className="titleCard">
                  <h1>{data.strMeal}</h1>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MoreRecipies;
