import { useState } from "react";
import Home from "./pages/home";
import Navbar from "./pages/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
