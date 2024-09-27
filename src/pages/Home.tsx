import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleBuyer = () => {
    navigate("/login/user");
  };

  const handleSeller = () => {
    // Assuming sellers have similar functionalities as buyers
    // You can differentiate sellers in the user database
    navigate("/login/user"); // Or a separate seller login
  };
  return (
    <div className="container">
      <h1>Bem-vindo</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleBuyer}
          style={{ flex: "1", marginRight: "10px" }}
        >
          Sou Comprador
        </button>
        <button
          onClick={handleSeller}
          style={{ flex: "1", marginLeft: "10px" }}
        >
          Sou Vendedor
        </button>
      </div>
    </div>
  );
};
