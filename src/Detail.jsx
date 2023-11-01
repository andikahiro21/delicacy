import { useState } from "react";
import Detail from "./pages/detail";
import Navbar from "./pages/navbar";
import "./style/detailApp.css";
import MoreRecipies from "./pages/moreRecipies";

function DetailApp() {
  return (
    <div className="navCont">
      <div className="nav">
        <Navbar />
      </div>
      <div className="detailCont">
        <Detail />
      </div>
      <div className="moreRecipies">
        <MoreRecipies />
      </div>
    </div>
  );
}

export default DetailApp;
