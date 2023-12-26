import "./App.css";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function App() {
  return (
    <>
      <div className="app">
        <div className="navigation">
          <nav>
            <Link to={"/"} className="svg">
              <img src="dollar.svg" alt="SVG Image" />
            </Link>
            <Link to={"/cart"}>Cart</Link>

            <Link to={"/login"} className="link">
              <div>
                <AccountCircleIcon style={{ fontSize: 40 }} />
                <p>Profile</p>
              </div>
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
