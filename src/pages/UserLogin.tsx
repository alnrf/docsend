import React, { useState } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../configs/firebase";

export const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUserLogin = async (e: any) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("cpf", "==", cpf)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        navigate("/upload", {
          state: { user: querySnapshot.docs[0].data() },
        });
      } else {
        setError("Email ou CPF incorretos");
      }
    } catch (err) {
      setError("Erro ao logar");
      console.error(err);
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleUserLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="informe o email"
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            placeholder="Somente números"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <button className="back_button" onClick={() => navigate("/")}>
        Voltar
      </button>
    </div>
  );
};
