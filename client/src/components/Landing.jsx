import React from "react";
import landing from "../assets/LANDING.png";
import Login from "./usuario/Login";

export default function Landing() {
  return (
    <div className="landingContainer">
      <div className="Login">
        <Login />
      </div>
      <img src={landing} className="landingImg" alt="Landing" />
    </div>
  );
}
