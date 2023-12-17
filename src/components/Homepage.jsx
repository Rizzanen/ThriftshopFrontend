import React, { useState, useEffect } from "react";

function Homepage() {
  const [allListings, setAllListings] = useState([]);
  const [searchString, setSearchString] = useState();
  const [emptySearch, setEmptySearch] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/listings")
      .then((response) => response.json())
      .then((data) => setAllListings(data))
      .then((data) => setEmptySearch(false));
  }, [emptySearch]);

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
    const filteredListings = allListings.filter((listing) =>
      Object.values(listing).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    if (filteredListings.length > 0) {
      setAllListings(filteredListings);
    } else {
      window.alert("No listings mach the search");
    }
    if (searchString.length === 0) {
      setEmptySearch(true);
    }
  };

  return (
    <div className="homepage">
      <div className="searchbar">
        <input type="text" value={searchString} onChange={handleInput}></input>
        <button onClick={search}>Search</button>
      </div>

      {allListings.map((listing) => (
        <div className="listing" key={listing.id}>
          <div className="image">
            <img src={listing.pictureURL} />
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
