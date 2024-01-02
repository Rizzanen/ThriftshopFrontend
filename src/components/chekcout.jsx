import { useEffect } from "react";

function Checkout() {
  useEffect(() => {
    sessionStorage.removeItem("cartItemsCount");
  }),
    [];
  return (
    <div className="checkoutContainer">
      <div className="checkoutThanks">
        <h1>Thanks for testing my App.</h1>
      </div>
      <div className="underDevelopment">
        <h2>The checkout process is still under development.</h2>
      </div>

      <img src="https://fim.cmb.ac.lk/wp-content/uploads/2019/05/under-construction-gif-6.gif" />
      <div className="deleted">
        <p>The items you checked out has been deleted.</p>
      </div>
    </div>
  );
}
export default Checkout;
