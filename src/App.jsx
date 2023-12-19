import "./App.css";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const handleOnClick = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn("");
  };
  return (
    <>
      <div className="app">
        <div className="navigation">
          <nav>
            <Link to={"/"} className="svg">
              <img src="dollar.svg" alt="SVG Image" />
            </Link>
            <Link to={"/addlisting"} className="addListing">
              {" "}
              Add Listing
            </Link>
            <Link to={"/login"} className="link">
              <AccountCircleIcon style={{ fontSize: 40 }} />
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
