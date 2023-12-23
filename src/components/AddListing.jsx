import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddListing() {
  const location = useLocation();
  const newUserData = location.state?.newUserData || {};
  const [allCategorys, setAllCategorys] = useState([]);
  const [listing, setListing] = useState({
    name: "",
    price: "",
    date: new Date(),
    pictureURL: "",
    condition: "",
    details: "",
    category: {},
    appUser: newUserData,
  });

  useEffect(() => {
    fetch("http://localhost:8080/categorys")
      .then((response) => response.json())
      .then((data) => {
        setAllCategorys(data);
      });
  }, []);

  const setCategory = (selectedCategory) => {
    setListing({ ...listing, category: selectedCategory });
  };

  const createListing = () => {
    fetch("http://localhost:8080/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response from server:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setListing({
      name: "",
      price: "",
      date: new Date(),
      pictureURL: "",
      condition: "",
      details: "",
      category: {},
    });
  };

  const handleOnChange = (event) => {
    setListing({ ...listing, [event.target.name]: event.target.value });
  };

  return (
    <div className="addListingPage">
      <div className="addListingFormContainer">
        <div className="addListingHeader">
          <h1>Create Listing</h1>
        </div>
        <div className="inputs">
          <div className="namePrice">
            <div className="name">
              <h2>Name</h2>
              <input
                type="text"
                onChange={handleOnChange}
                name="name"
                value={listing.name}
              ></input>
            </div>
            <div className="price">
              <h2>Price</h2>
              <input
                type="text"
                onChange={handleOnChange}
                name="price"
                value={listing.price}
              ></input>
            </div>
          </div>
          <h2>Picture URL</h2>
          <input
            type="text"
            onChange={handleOnChange}
            name="pictureURL"
            value={listing.pictureURL}
          ></input>
          <h2>Condition</h2>
          <input
            type="text"
            onChange={handleOnChange}
            name="condition"
            value={listing.condition}
          ></input>
          <h2>Details</h2>
          <textarea
            type="text"
            onChange={handleOnChange}
            name="details"
            value={listing.details}
          ></textarea>
          <h2>Choose Category</h2>
          <div className="categoryButtons">
            {allCategorys.map((category) => (
              <button onClick={() => setCategory(category)} key={category.id}>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="createButton">
          <button onClick={createListing}>Create Listing</button>
        </div>
      </div>
      <button onClick={testi}>Testi</button>
    </div>
  );
}
export default AddListing;
