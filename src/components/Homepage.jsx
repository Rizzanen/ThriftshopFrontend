import React, { useState, useEffect } from "react";

function Homepage() {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/listings")
      .then((response) => response.json())
      .then((data) => setAllListings(data));
  }, []);

  const button = () => {
    console.log(allListings);
  };
  return (
    <div className="homepage">
      <h1>Homepage</h1>
      <button onClick={button}>Button</button>
      {allListings.map((listing) => (
        <div className="listing" key={listing.id}>
          <h3>{listing.id}</h3>
          <h3>{listing.name}</h3>
          <h3>{listing.price}</h3>
          <h3>{listing.date}</h3>
          <h3>{listing.condition}</h3>
          <h3>{listing.details}</h3>
          <h3>{listing.category.name}</h3>
          <img src={listing.pictureURL} />
        </div>
      ))}
    </div>
  );
}
export default Homepage;
