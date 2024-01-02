import "./App.css";
import { Link, Outlet } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./context/Cartcontext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const { setCartItemCount, cartItemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(sessionStorage.getItem("cartItemsCount"))) {
      setCartItemCount(Number(sessionStorage.getItem("cartItemsCount")));
    }
  }, []);

  const resetDB = () => {
    fetch("https://thriftshoprest-6dad2e66a25b.herokuapp.com/reset");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("UserDataSet");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  return (
    <>
      <div className="app">
        <div className="navigation">
          <nav>
            <Link to={"/"} className="svg">
              <img src="dollar.svg" alt="SVG Image" />
              <h3>ThriftShop</h3>
            </Link>
            <button onClick={resetDB}>Reset DB</button>
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
