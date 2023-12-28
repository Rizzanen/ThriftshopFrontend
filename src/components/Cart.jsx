import React, { useEffect, useState } from "react";
import { useCart } from "../context/Cartcontext.jsx";

function Cart() {
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
      setTotal(sum);
    }
  };

  const decrease = (id) => {
    setCartItemCount(cartItemCount - 1);
    sessionStorage.setItem("cartItemsCount", cartItemCount - 1);
    const updatedItems = [];
    items.forEach((item) => {
      if (item.id === id) {
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

  const increase = (id) => {
    setCartItemCount(cartItemCount + 1);
    sessionStorage.setItem("cartItemsCount", cartItemCount + 1);
    const updatedItems = [];
    items.forEach((item) => {
      if (item.id === id) {
        item.amount = item.amount + 1;
      }
      updatedItems.push(item);
    });
    setItems(updatedItems);
    sessionStorage.setItem("Cart", JSON.stringify(updatedItems));
    countTotal(updatedItems);
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
                  <img src={item.pictureURL} />
                  <div className="cartItemname">
                    <h3>{item.name}</h3>
                    <h4>Condition: {item.condition}</h4>
                    <h4>Details: {item.details}</h4>
                  </div>
                  <div className="priceAndAmountButtons">
                    <div className="buttons">
                      <button onClick={() => decrease(item.id)}>-</button>
                      <h3>{item.amount}</h3>
                      <button onClick={() => increase(item.id)}>+</button>
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

                <button>Checkout</button>
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
