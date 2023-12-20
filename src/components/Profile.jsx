import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    city: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("UserDataSet")) {
      sessionStorage.setItem("Userdata", JSON.stringify(userData));
      sessionStorage.setItem("UserDataSet", "true");
    }

    if (sessionStorage.getItem("Userdata") !== null) {
      setNewUserData(JSON.parse(sessionStorage.getItem("Userdata")));
    } else {
      setNewUserData(userData);
    }
  }, []);

  const handleInputChange = (event) => {
    setNewUserData({ ...newUserData, [event.target.name]: event.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = () => {
    fetch("http://localhost:8080/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewUserData((prevUserData) => ({ ...prevUserData, ...data }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsEditing(false);
    sessionStorage.setItem("Userdata", JSON.stringify(newUserData));
  };

  const testi = () => {
    console.log(sessionStorage.getItem("Userdata"));
    console.log(sessionStorage.getItem("UserDataSet"));
  };

  const logout = () => {
    sessionStorage.removeItem("Userdata");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("UserDataSet");
    navigate("/");
  };

  return (
    <div className="profilepage">
      <div className="logoutButton">
        <button onClick={logout}>Logout</button>
      </div>
      <div className="userdata">
        <div className="yourInformation">
          <h1>Your Information</h1>
        </div>
        <div className="dataContainer">
          <div className="headers">
            <h3>Username:</h3>
            <h3>Email:</h3>
            <h3>Phone:</h3>
            <h3>Address:</h3>
            <h3>Postcode:</h3>
            <h3>City:</h3>
          </div>
          <div className={`userInformation ${isEditing ? "editopen" : ""}`}>
            <h3 className="datah3">{newUserData.username}</h3>
            <h3 className="datah3">{newUserData.email}</h3>
            <h3 className="datah3">{newUserData.phone}</h3>
            <h3 className="datah3">{newUserData.address}</h3>
            <h3 className="datah3">{newUserData.postcode}</h3>
            <h3 className="datah3">{newUserData.city}</h3>
          </div>
          <div
            className={`userInformationinputs ${isEditing ? "editopen" : ""}`}
          >
            <input
              type="text"
              name="username"
              value={newUserData.username || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              value={newUserData.email || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              value={newUserData.phone || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              value={newUserData.address || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="postcode"
              value={newUserData.postcode || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              value={newUserData.city || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`changeDataButton ${isEditing ? "editopen" : ""}`}>
          <button onClick={handleEditClick}>Change information</button>
        </div>
        <div className={`updateDataButton ${isEditing ? "editopen" : ""}`}>
          <button onClick={handleUpdateClick}>Update information</button>
        </div>
      </div>
      <button onClick={testi}>Testi</button>
    </div>
  );
}
export default Profile;
