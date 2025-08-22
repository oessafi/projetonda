import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import ApiService from "../service/ApiService";

const SearchByPhotoAndCreateRequest = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    titre: "",
    description: "",
    quantiteDemandee: "",
    produitNom: "",
    produitId: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ApiService.getAllProducts();
        setProducts(res.products);
      } catch (error) {
        showMessage("❌ Erreur chargement produits : " + error.message);
      }
    };
    fetchProducts();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
    setForm({
      titre: "",
      description: "",
      quantiteDemandee: "",
      produitNom: "",
      produitId: "",
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!image) {
      showMessage("⚠️ Veuillez sélectionner une image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const prediction = res.data.prediction;
      const matchedProduct = products.find(
        (p) => p.name.toLowerCase() === prediction.toLowerCase()
      );

      if (!matchedProduct) {
        showMessage("⚠️ Produit détecté non trouvé dans la base.");
        return;
      }

      setResult(
        `✅ Produit détecté : ${prediction} (Confiance : ${res.data.confidence}%)`
      );
      setForm((prev) => ({
        ...prev,
        produitNom: prediction,
        produitId: matchedProduct.id,
        titre: `Demande pour ${prediction}`,
        description: `Demande générée automatiquement pour le produit détecté.`,
      }));
    } catch (error) {
      console.error(error);
      showMessage("❌ Erreur lors de la recherche par image.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.creerDemandeAchat(form);
      showMessage("✅ Demande d'achat créée avec succès !");
      setForm({
        titre: "",
        description: "",
        quantiteDemandee: "",
        produitNom: "",
        produitId: "",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      showMessage("❌ Erreur lors de la création de la demande.");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        {message && (
          <div className="alert alert-info text-center shadow-sm">{message}</div>
        )}

        <div className="card shadow p-4">
          <h2 className="text-primary text-center mb-4">
            🔍 Recherche par Image & Création de Demande
          </h2>

          {/* Étape 1 - Upload Image */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="form-group">
              <label className="fw-bold">1️⃣ Choisir une image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control mt-2"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3 px-4">
                Identifier le produit
              </button>
            </div>
          </form>

          {result && (
            <div className="alert alert-success text-center fw-bold">
              {result}
            </div>
          )}

          {/* Étape 2 - Création demande */}
          {form.produitNom && (
            <div className="card mt-4 p-4 border-success shadow-sm">
              <h4 className="text-success mb-3">2️⃣ Créer la demande d'achat</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="fw-bold">Produit détecté</label>
                  <input
                    type="text"
                    value={form.produitNom}
                    readOnly
                    className="form-control bg-light"
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Titre</label>
                  <input
                    type="text"
                    name="titre"
                    value={form.titre}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Quantité demandée</label>
                  <input
                    type="number"
                    name="quantiteDemandee"
                    value={form.quantiteDemandee}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success px-4">
                    📩 Envoyer la demande
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchByPhotoAndCreateRequest;
