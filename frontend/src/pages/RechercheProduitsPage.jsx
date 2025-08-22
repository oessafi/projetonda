import React, { useState } from "react";
import Layout from "../component/Layout";
import axios from "axios";

const RechercheProduitsPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/scrape?query=${encodeURIComponent(query)}`
      );
      setResults(response.data.data);
    } catch (error) {
      console.error("Erreur lors du scraping :", error);
      setError("Échec de récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <h2 className="text-center mb-4">🔍 Recherche de Produits (Amazon)</h2>

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Ex: PC Dell, câble RJ45, souris sans fil..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Rechercher
          </button>
        </div>

        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Chargement...</p>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {results.length > 0 && (
          <div className="row">
            {results.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p><strong>💰 Prix:</strong> {item.price || "Non disponible"}</p>
                    <p><strong>⭐ Note:</strong> {item.rating || "N/A"}</p>
                    <p><strong>📝 Avis:</strong> {item.reviews || "N/A"}</p>
                    <p><strong>📦 Disponibilité:</strong> {item.availability || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RechercheProduitsPage;
