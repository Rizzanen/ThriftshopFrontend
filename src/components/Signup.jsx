import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [newAppUser, setNewAppUser] = useState({
    username: "",
    password: "",
    role: "user",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    city: "",
  });

  const handleInputChange = (event) => {
    setNewAppUser({ ...newAppUser, [event.target.name]: event.target.value });
    console.log("perkele");
  };

  const handleSignupClick = () => {
    fetch("https://thriftshoprest-6dad2e66a25b.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          navigate("/profile", { state: { userData: data } });
          sessionStorage.setItem("isLoggedIn", "true");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNewAppUser({
      username: "",
      password: "",
      role: "user",
      email: "",
      phone: "",
      address: "",
      postcode: "",
      city: "",
    });
  };
  return (
    <div className="signupPage">
      <div className="signupContainer">
        <h1>Fill in your information </h1>
        <div className="signupInput">
          <h2>Username: </h2>
          <input
            type="text"
            name="username"
            value={newAppUser.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupInput">
          <h2>Password: </h2>
          <input
            type="password"
            name="password"
            value={newAppUser.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupInput">
          <h2>Email: </h2>
          <input
            type="text"
            name="email"
            value={newAppUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupInput">
          <h2>Phone: </h2>
          <input
            type="text"
            name="phone"
            value={newAppUser.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupInput">
          <h2>Address: </h2>
          <input
            type="text"
            name="address"
            value={newAppUser.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupInput">
          <h2>Postcode: </h2>
          <input
            type="text"
            name="postcode"
            value={newAppUser.postcode}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupInput">
          <h2>City: </h2>
          <input
            type="text"
            name="city"
            value={newAppUser.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupButton">
          <button onClick={handleSignupClick}>Signup</button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
