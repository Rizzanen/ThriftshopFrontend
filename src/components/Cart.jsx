import React, { useEffect, useState } from "react";

function Cart() {
  const cartItems = JSON.parse(sessionStorage.getItem("Cart"));
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(sessionStorage.getItem("Cart")));
  }, []);
  return (
    <div className="CartPage">
      {items.map((item) => (
        <div key={item.id}>
          <h1>
            {item.name} amount: {item.amount}
          </h1>
        </div>
      ))}
    </div>
  );
}
export default Cart;
