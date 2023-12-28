import { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, []);

  const handleInputChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    fetch("http://localhost:8080/checkLoginRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.alert("Wrong username or password!");
            throw new Error("Unauthorized: Wrong username or password");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          navigate("/profile", { state: { userData: data } });
          sessionStorage.setItem("isLoggedIn", "true");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="loginpage">
      <div className="pleaselogin">
        <h1>Login to your profile</h1>
      </div>
      <div className="loginform">
        <div className="loginheader">
          <h1>Login</h1>
        </div>

        <div className="username">
          <h3>Username</h3>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="password">
          <h3>Password</h3>
          <input
            type="text"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="loginButton">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
export default Login;
