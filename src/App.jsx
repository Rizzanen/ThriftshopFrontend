import "./App.css";
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
            <Link to={"/profile"} className="link">
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
