import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const ConsommationPage = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await ApiService.getAllProducts();
        setProducts(productData.products);
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Erreur lors du chargement des produits : " + error
        );
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !quantity || !description) {
      showMessage("Veuillez remplir tous les champs requis.");
      return;
    }

    const body = {
      productId,
      quantity: parseInt(quantity),
      description,
    };

    try {
      const response = await ApiService.sellProduct(body); // ou ApiService.consommerProduit(body)
      showMessage(response.message || "Consommation enregistrée.");
      resetForm();
    } catch (error) {
      showMessage(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement : " + error
      );
    }
  };

  const resetForm = () => {
    setProductId("");
    setDescription("");
    setQuantity("");
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="purchase-form-page">
        <h1>Consommation de Produit</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Produit concerné</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">-- Sélectionner un produit --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantité consommée</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit">Enregistrer la consommation</button>
        </form>
      </div>
    </Layout>
  );
};

export default ConsommationPage;
