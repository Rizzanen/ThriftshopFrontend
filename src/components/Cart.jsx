import React, { useEffect, useState } from "react";
import { useCart } from "../context/Cartcontext.jsx";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const { setCartItemCount, cartItemCount } = useCart();

  useEffect(() => {
    setItems(JSON.parse(sessionStorage.getItem("Cart")));
    const cartItems = JSON.parse(sessionStorage.getItem("Cart"));
    countTotal(cartItems);
  }, []);

  const countTotal = (items) => {
    var sum = 0;
    if (items) {
      items.forEach((item) => {
        sum = sum + item.price * item.amount;
      });
      setTotal(sum.toFixed(2));
    }
  };

  const decrease = (listingItem) => {
    setCartItemCount(cartItemCount - 1);
    sessionStorage.setItem("cartItemsCount", cartItemCount - 1);
    const updatedItems = [];
    items.forEach((item) => {
      if (item.id === listingItem.id) {
        item.amount = item.amount - 1;
      }
      if (item.amount <= 0) {
        return;
      } else {
        updatedItems.push(item);
      }
    });
    setItems(updatedItems);
    sessionStorage.setItem("Cart", JSON.stringify(updatedItems));
    countTotal(updatedItems);
  };

  const handleCheckout = () => {
    console.log("Attempting to checkout...");

    items.forEach((item) =>
      fetch(
        `https://thriftshoprest-6dad2e66a25b.herokuapp.com/listings/${item.id}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.error(
              "Error deleting item:",
              response.status,
              response.statusText
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    );

    setCartItemCount(0);
    sessionStorage.removeItem("Cart");
    navigate("/checkout");
  };
  const convertByteArrayToBase64 = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };
  return (
    <div className="CartPage">
      <div className="cartContainer">
        <div className="cartHeader">
          <h1>Shopping cart </h1>
        </div>
        <div className="cartItemsandTotalContainer">
          <div className="cart">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="cartItems">
                  <img src={convertByteArrayToBase64(item.pictureData)} />
                  <div className="cartItemname">
                    <h3>{item.name}</h3>
                    <h4>Condition: {item.condition}</h4>
                    <h4>Details: {item.details}</h4>
                  </div>
                  <div className="priceAndAmountButtons">
                    <div className="buttons">
                      <button onClick={() => decrease(item)}>Remove</button>
                    </div>
                    <div className="cartItemAmount">
                      <h3>{item.amount * item.price} €</h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          {items && items.length > 0 ? (
            <div className="total">
              <div>
                <h1>Total: {total} €</h1>

                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
