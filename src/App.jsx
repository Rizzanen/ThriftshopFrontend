import "./App.css";
import { Link, Outlet } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./context/Cartcontext.jsx";
import { useEffect } from "react";

function App() {
  const { setCartItemCount, cartItemCount } = useCart();

  useEffect(() => {
    if (Number(sessionStorage.getItem("cartItemsCount"))) {
      setCartItemCount(Number(sessionStorage.getItem("cartItemsCount")));
      console.log("perkele");
    }
  }, []);
  return (
    <>
      <div className="app">
        <div className="navigation">
          <nav>
            <Link to={"/"} className="svg">
              <img src="dollar.svg" alt="SVG Image" />
            </Link>
            <Link to={"/cart"} className="cartLink">
              <div className="cartIconContainer">
                <ShoppingCartIcon />

                <span className="cartItemCounter">
                  {cartItemCount !== 0 ? cartItemCount : null}
                </span>
              </div>
            </Link>

            <Link to={"/login"} className="link">
              <AccountCircleIcon
                style={{
                  fontSize: 32,
                }}
              />
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
