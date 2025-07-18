import React, { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import Layout from "../component/Layout";

const DemandeAchatPage = () => {
  const [form, setForm] = useState({
    titre: "",
    description: "",
    quantiteDemandee: "",
    produitId: "",
  });

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ApiService.getAllProducts();
        setProducts(res.products);
      } catch (error) {
        showMessage("Erreur chargement produits : " + error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ApiService.creerDemandeAchat(form);
      showMessage("Demande créée avec succès !");
      setForm({
        titre: "",
        description: "",
        quantiteDemandee: "",
        produitId: "",
      });
    } catch (error) {
      console.error(error);
      showMessage("Erreur lors de la création de la demande.");
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="purchase-form-page">
        <h1>Créer une Demande d'Achat</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre</label>
            <input
              name="titre"
              value={form.titre}
              onChange={handleChange}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Quantité Demandée</label>
            <input
              name="quantiteDemandee"
              type="number"
              value={form.quantiteDemandee}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Produit</label>
            <select
              name="produitId"
              value={form.produitId}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner un produit --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Envoyer la demande</button>
        </form>
      </div>
    </Layout>
  );
};

export default DemandeAchatPage;
