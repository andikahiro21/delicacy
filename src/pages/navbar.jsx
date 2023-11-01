import React, { useState, useEffect } from "react";
import { callAPI } from "../domain/api";
import "../style/navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar({ handleCategoryChange }) {
  const [categories, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Beef");
  const location = useLocation();
  const navigate = useNavigate();
  const hideCategoriesContainer = location.pathname.includes("/favorite");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await callAPI({
          endpoint: `/categories.php`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dataFilter = data.categories.slice(0, 5);
        const nameCategory = dataFilter.map((category) => category.strCategory);
        setCategory(nameCategory);

        if (hideCategoriesContainer) {
          setActiveCategory("Favorite");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [location]);
  const handleCategoryClick = (category) => {
    if (location.pathname === "/favorite") {
      navigate("/");
    } else {
      setActiveCategory(category);
      handleCategoryChange(category);
    }
  };
  return (
    <div className="navbar">
      <Link to={"/"} className="linkNavbar">
        <div className="logo">
          <h1>Delicacy</h1>
        </div>
      </Link>

      <div className="categoriesContainer">
        {categories.map((category) => (
          <p key={category} className={category === activeCategory ? "active" : ""} onClick={() => handleCategoryClick(category)}>
            {category}
          </p>
        ))}
        <p>
          <Link className={"Favorite" === activeCategory ? "active" : "linkNavbar"} to={"/favorite"}>
            Favorite
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
