import React, { useState, useEffect } from "react";
import { useCart } from "../context/Cartcontext.jsx";

function Homepage() {
  const [listings, setListings] = useState([]);
  const [listingsCopy, setListingsCopy] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [emptySearch, setEmptySearch] = useState(false);
  const [allCategorys, setAllCategorys] = useState([]);
  const { setCartItemCount, cartItemCount } = useCart();

  useEffect(() => {
    fetch("http://localhost:8080/listings")
      .then((response) => response.json())
      .then((data) => {
        setListings(data);

        setListingsCopy(data);
      })
      .then(() => setEmptySearch(false));
  }, [emptySearch]);

  useEffect(() => {
    fetch("http://localhost:8080/categorys")
      .then((response) => response.json())
      .then((data) => {
        setAllCategorys(data);
      });
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year} `;
  };

  const handleInput = (event) => {
    setSearchString(event.target.value);
  };

  const search = () => {
    const filteredListings = listingsCopy.filter((listing) =>
      Object.values(listing).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    if (filteredListings.length > 0) {
      setListings(filteredListings);
    } else {
      window.alert("No listings match the search");
    }
    if (searchString.length === 0) {
      setEmptySearch(true);
    }
  };

  const filterByCategory = (categoryName) => {
    const filteredListings = listingsCopy.filter(
      (listing) => listing.category.name === categoryName
    );
    setListings(filteredListings);
  };

  const showAll = () => {
    setListings(listingsCopy);
  };

  const addToCart = (listing) => {
    if (cartItemCount === 0) {
      sessionStorage.setItem("cartItemsCount", 1);
      setCartItemCount(1);
    } else {
      const cartItemAmount = cartItemCount + 1;
      sessionStorage.setItem("cartItemsCount", cartItemAmount);
      setCartItemCount(cartItemAmount);
    }

    const currentCart = JSON.parse(sessionStorage.getItem("Cart")) || [];
    listing.amount = 1;
    var itemUniqueCounter = 0;
    if (currentCart.length === 0) {
      currentCart.push(listing);
    } else {
      currentCart.forEach((item) => {
        if (item.id === listing.id) {
          item.amount += 1;
          itemUniqueCounter += 1;
        }
      });
      if (itemUniqueCounter === 0) {
        currentCart.push(listing);
      }
    }

    sessionStorage.setItem("Cart", JSON.stringify(currentCart));
  };

  const convertByteArrayToBase64 = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="homepage">
      <div className="searchbar">
        <input type="text" value={searchString} onChange={handleInput}></input>
        <button onClick={search}>Search</button>
      </div>

      <div className="categoryscontainer">
        <div className="categorys">
          <button onClick={showAll}>Show all</button>
          {allCategorys.map((category) => (
            <button
              onClick={() => filterByCategory(category.name)}
              key={category.id}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {listings.map((listing) => (
        <div className="listing" key={listing.id}>
          <div className="image">
            <img src={convertByteArrayToBase64(listing.pictureData)} />
          </div>
          <div className="info">
            <div className="nameprice">
              <h1>{listing.name}</h1>
              <h1>{listing.price} €</h1>
            </div>
            <div className="otherdetail">
              <div className="postedCondition">
                <h3>Condition: {listing.condition}</h3>
              </div>
              <div className="details">
                <h3> {listing.details}</h3>
              </div>
            </div>

            <div className="postedButton">
              <p>Posted: {formatDate(listing.date)}</p>
              <button onClick={() => addToCart(listing)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
      <div className="fill"></div>
    </div>
  );
}
export default Homepage;
