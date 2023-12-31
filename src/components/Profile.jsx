import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [newUserData, setNewUserData] = useState({
    userId: "",
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
  const [usersListings, setUsersListings] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("UserDataSet")) {
      sessionStorage.setItem("Userdata", JSON.stringify(userData));
      sessionStorage.setItem("UserDataSet", "true");
    }

    if (sessionStorage.getItem("Userdata") !== null) {
      const data = JSON.parse(sessionStorage.getItem("Userdata"));
      setNewUserData(data);
      fetch(
        `https://thriftshoprest-6dad2e66a25b.herokuapp.com/listings/users/${data.userId}`
      )
        .then((response) => response.json())
        .then((data) => setUsersListings(data));
    } else {
      setNewUserData(userData);
      fetch(
        `https://thriftshoprest-6dad2e66a25b.herokuapp.com/users/${userData.userId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUsersListings(data);
          console.log("perkele");
        });
    }
  }, []);

  const handleInputChange = (event) => {
    setNewUserData({ ...newUserData, [event.target.name]: event.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = () => {
    fetch("https://thriftshoprest-6dad2e66a25b.herokuapp.com/users", {
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

  const logout = () => {
    sessionStorage.removeItem("Userdata");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("UserDataSet");
    navigate("/");
  };

  const handleDeleteClick = (id) => {
    window.alert("Are you sure you want to delete the listing?");
    fetch(`https://thriftshoprest-6dad2e66a25b.herokuapp.com/listings/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then(() => {
        fetch(
          `https://thriftshoprest-6dad2e66a25b.herokuapp.com/listings/users/${newUserData.userId}`
        )
          .then((response) => response.json())
          .then((data) => setUsersListings(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const convertByteArrayToBase64 = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="profilepage">
      <div className="logoutButton">
        <Link
          to={"/addlisting"}
          state={{ newUserData: newUserData }}
          className="addListing"
        >
          <button>Add Listing</button>
        </Link>

        <button onClick={logout}>Logout</button>
      </div>
      <div className="profileContainer">
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

        <div className="ownListingsContainer">
          <h1>Your listings</h1>
          <div className="ownListings">
            {usersListings.map((listing) => (
              <div className="ownListing" key={listing.id}>
                <div className="ownListingImg">
                  <img src={convertByteArrayToBase64(listing.pictureData)} />
                </div>
                <div className="ownListingInformation">
                  <div className="ownListingName">
                    <h2>{listing.name}</h2>
                    <h2>{listing.price} €</h2>
                  </div>
                  <div className="ownListingCondition">
                    <p>Condition: {listing.condition}</p>
                  </div>
                  <div className="ownListingDetails">
                    <p> Details: {listing.details}</p>
                  </div>

                  <div className="ownListingButtons">
                    <Link
                      to={"/editListing"}
                      state={{ listing: listing }}
                      className="editListingButton"
                    >
                      Edit
                    </Link>
                    <button onClick={() => handleDeleteClick(listing.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
