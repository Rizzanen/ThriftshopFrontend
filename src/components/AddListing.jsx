import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const newUserData = location.state?.newUserData || {};
  const [allCategorys, setAllCategorys] = useState([]);
  const [listing, setListing] = useState({
    name: "",
    price: "",
    date: new Date(),
    pictureData: null,
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
    const formData = new FormData();
    formData.append("name", listing.name);
    formData.append("price", listing.price);
    formData.append("date", listing.date.toISOString());
    formData.append("condition", listing.condition);
    formData.append("details", listing.details);
    formData.append("category", JSON.stringify(listing.category));
    formData.append("appUser", JSON.stringify(listing.appUser));
    formData.append("pictureData", listing.pictureData);

    fetch("http://localhost:8080/listings", {
      method: "POST",
      body: formData,
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
      pictureData: null,
      condition: "",
      details: "",
      category: {},
      appUser: newUserData,
    });
    setTimeout(() => {
      navigate("/profile");
    }, 100);
  };

  const handleOnChange = (event) => {
    setListing({ ...listing, [event.target.name]: event.target.value });
  };

  const handleFileChange = async (e) => {
    const fileInput = e.target;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      try {
        setListing({ ...listing, pictureData: file });
      } catch (error) {
        console.error("Error setting pictureData:", error);
      }
    }
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
          <h2>Picture</h2>

          <input
            className="fileInput"
            type="file"
            onChange={(e) => handleFileChange(e)}
          />

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
    </div>
  );
}
export default AddListing;
