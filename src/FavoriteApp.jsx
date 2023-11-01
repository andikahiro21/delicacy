import { useState } from "react";
import Navbar from "./pages/navbar";
import "./style/detailApp.css";
import Favorite from "./pages/favorite";

function FavoriteApp() {
  const [activeCategory, setActiveCategory] = useState("Favorite");

  return (
    <div className="navCont">
      <div className="nav">
        <Navbar activeCategory={activeCategory} />
      </div>
      <div className="detailCont">
        <Favorite />
      </div>
    </div>
  );
}

export default FavoriteApp;
