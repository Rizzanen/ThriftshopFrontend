import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Profile(props) {
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [profileData, setProfileData] = useState([]);

  const test = () => {
    console.log(userData);
  };
  return (
    <div className="profilepage">
      <h1>Profile page</h1>
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
          <div className="userInformation">
            <h3 className="datah3">{userData.username}</h3>
            <h3 className="datah3">{userData.email}</h3>
            <h3 className="datah3">{userData.phone}</h3>
            <h3 className="datah3">{userData.address}</h3>
            <h3 className="datah3">{userData.postcode}</h3>
            <h3 className="datah3">{userData.city}</h3>
          </div>
        </div>
        <div className="updateDataButton">
          <button>Update information</button>
        </div>
      </div>
      <button onClick={test}>testi</button>
    </div>
  );
}
export default Profile;
