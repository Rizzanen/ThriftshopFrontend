import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <div className="navigation">
          <nav>
            <Link to={"/"} className="svg">
              <img src="dollar.svg" alt="SVG Image" />
            </Link>
            <Link to={"/profile"} className="link">
              Profile
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
