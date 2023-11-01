import { useState } from "react";
import Home from "./pages/homeCard";
import Navbar from "./pages/navbar";
import MoreRecipies from "./pages/moreRecipies";
import "./style/app.css";

function App() {
  const [activeCategory, setActiveCategory] = useState("Beef");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  return (
    <div className="app">
      <div className="nav">
        <Navbar activeCategory={activeCategory} handleCategoryChange={handleCategoryChange} />
      </div>
      <div className="homeApp">
        <Home activeCategory={activeCategory} />
      </div>
      <div className="moreRecipies">
        <MoreRecipies />
      </div>
    </div>
  );
}

export default App;
