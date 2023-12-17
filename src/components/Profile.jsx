import React, { useState, useEffect } from "react";

function Profile() {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      });
  }, []);
  return (
    <div className="profilepage">
      <h1>Profile page</h1>
      <div className="userdata">
        {profileData.map((data) => (
          <h3>{data.username}</h3>
        ))}
      </div>
    </div>
  );
}
export default Profile;
