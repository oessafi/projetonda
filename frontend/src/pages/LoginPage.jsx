import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import { Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showMessage("Adresse e-mail invalide.");
      return;
    }
    if (password.length < 6) {
      showMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      const loginData = { email, password };
      const res = await ApiService.loginUser(loginData);

      if (res.status === 200) {
        ApiService.saveToken(res.token);
        ApiService.saveRole(res.role);
        setMessage("Connexion réussie !");

        // Redirection selon rôle
        if (res.role === "ADMIN") {
          navigate("/dashboard");
        } else if (res.role === "ACHETEUR") {
          navigate("/supplier");
        } else if (res.role === "MAGASINIER") {
          navigate("/Consumption");
        } else {
          navigate("/login");
        }
      } else {
        showMessage("Erreur lors de la connexion.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Erreur de connexion."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}
      >
        <h3 className="text-center mb-4">Connexion</h3>

        {message && (
          <div className="alert alert-warning text-center" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Adresse e-mail</label>
            <div className="input-group">
              <span className="input-group-text">
                <Mail size={16} />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="nom@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <div className="input-group">
              <span className="input-group-text">
                <Lock size={16} />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              Se connecter
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Vous n’avez pas de compte ?{" "}
          <a href="/register" className="text-decoration-none">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
