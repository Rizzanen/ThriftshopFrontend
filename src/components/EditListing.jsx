import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state?.listing || {};
  const [editedListing, setEditedListing] = useState(listing);

  const handleOnChange = (event) => {
    setEditedListing({
      ...editedListing,
      [event.target.name]: event.target.value,
    });
  };
  const saveEdit = () => {
    fetch("http://localhost:8080/listings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedListing),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
    setTimeout(() => {
      navigate("/profile");
    }, 100);
  };
  return (
    <div className="editListingPage">
      <div className="editListingContainer">
        <div className="editListingHeader">
          <h1>Edit Listing Information</h1>
        </div>
        <div className="editListingForm">
          <div className="editListingName">
            <h2>Name: </h2>
            <input
              type="text"
              name="name"
              value={editedListing.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="editListingPrice">
            <h2>Price: </h2>
            <input
              type="text"
              name="price"
              value={editedListing.price}
              onChange={handleOnChange}
            />
          </div>
          <div className="editListingCondition">
            <h2>Condition:</h2>
            <input
              type="text"
              name="condition"
              value={editedListing.condition}
              onChange={handleOnChange}
            />
          </div>
          <div className="editListingDetails">
            <h2>Details:</h2>
            <textarea
              type="text"
              name="details"
              value={editedListing.details}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="saveEditButton">
          <button onClick={saveEdit}>Save</button>
        </div>
      </div>
    </div>
  );
}
export default EditListing;
