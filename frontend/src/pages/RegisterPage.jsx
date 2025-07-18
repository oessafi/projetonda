import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("MAGASINIER"); // Valeur par défaut
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const registerData = { name, email, password, phoneNumber, role };
      await ApiService.registerUser(registerData);
      setMessage("Enregistrement réussi !");
      navigate("/login");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Erreur lors de l'enregistrement : " + error
      );
      console.error(error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <div className="auth-container">
      <h2>Créer un compte</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Numéro de téléphone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="MAGASINIER">Magasinier</option>
          <option value="ACHETEUR">Acheteur</option>
          <option value="ADMIN">Administrateur</option>
        </select>

        <button type="submit">S'inscrire</button>
      </form>

      <p>Vous avez déjà un compte ? <a href="/login">Connexion</a></p>
    </div>
  );
};

export default RegisterPage;
