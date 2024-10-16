import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleLogin = (type: string) => {
    navigate(`/login/user/${type}`);
  };

  const handleAgentLogin = () => {
    navigate("/login/admin");
  };
  return (
    <div className="container">
      <h1>Bem-vindo</h1>
      <h3>Escolha abaixo qual seu perfil</h3>
      <div className="homeButtonContainer">
        <button onClick={() => handleLogin("buyer")}>Sou Comprador</button>
        <button onClick={() => handleLogin("seller_pf")}>
          Sou Vendedor - PF
        </button>
        <button onClick={() => handleLogin("seller_pj")}>
          Sou Vendedor - PJ
        </button>
        <button onClick={handleAgentLogin}>Sou Correspondente</button>
      </div>
    </div>
  );
};
