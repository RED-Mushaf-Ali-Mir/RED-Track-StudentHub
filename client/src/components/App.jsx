import { useState } from "react";
import "./App.css";
import Navbar from "./modules/Navbar";
import { nanoid } from "nanoid";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="App-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
