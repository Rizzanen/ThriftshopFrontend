import React, { useEffect, useState } from "react";

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    setItems(JSON.parse(sessionStorage.getItem("Cart")));
    const cartItems = JSON.parse(sessionStorage.getItem("Cart"));
    countTotal(cartItems);
  }, []);

  const countTotal = (items) => {
    var sum = 0;
    items.forEach((item) => {
      sum = sum + item.price * item.amount;
    });
    setTotal(sum);
  };

  const decrease = (id) => {
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
          <h1>Shopping cart</h1>
        </div>
        {items.map((item) => (
          <div key={item.id} className="cartItems">
            <h3 className="cartItemname">{item.name}</h3>
            <h3 className="cartItemAmount">
              {item.amount} x {item.price} €
            </h3>
            <button onClick={() => decrease(item.id)}>-</button>
            <h3>{item.amount}</h3>
            <button onClick={() => increase(item.id)}>+</button>
          </div>
        ))}

        <div className="cartTotal">
          <h3>Total: {total} €</h3>
        </div>
        <div className="chekcoutButton">
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
