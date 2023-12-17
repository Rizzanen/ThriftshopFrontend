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
        {profileData.map((data) => (
          <h3>{data.username}</h3>
        ))}
      </div>
      <button onClick={test}>testi</button>
    </div>
  );
}
export default Profile;
