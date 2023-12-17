import React, { useState, useEffect } from "react";

function Homepage() {
  const [listings, setListings] = useState([]);
  const [listingsCopy, setListingsCopy] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [emptySearch, setEmptySearch] = useState(false);
  const [allCategorys, setAllCategorys] = useState([]);

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
            <img src={listing.pictureURL} alt="Product image" />
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
              <button>Send message</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Homepage;
