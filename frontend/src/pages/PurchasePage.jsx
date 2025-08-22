import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const PurchasePage = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [demandesAchat, setDemandesAchat] = useState([]);

  const [productId, setProductId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [demandeAchatId, setDemandeAchatId] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const productData = await ApiService.getAllProducts();
        const supplierData = await ApiService.getAllSuppliers();
        const demandeData = await ApiService.getDemandesNonTraitees(); // <-- utilise seulement les non traitées

        setProducts(productData.products);
        setSuppliers(supplierData.suppliers);
        setDemandesAchat(demandeData.demandes);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Erreur lors du chargement des données."
        );
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !supplierId || !quantity || quantity <= 0 || !demandeAchatId) {
      showMessage("Veuillez remplir tous les champs obligatoires correctement.");
      return;
    }

    const body = {
      productId,
      quantity: parseInt(quantity, 10),
      supplierId,
      demandeAchatId,
      description,
      note,
    };

    try {
      const response = await ApiService.purchaseProduct(body);
      showMessage(response.message || "Achat enregistré avec succès.");
      resetForm();
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Erreur lors de l'enregistrement de l'achat."
      );
    }
  };

  const resetForm = () => {
    setProductId("");
    setSupplierId("");
    setDemandeAchatId("");
    setDescription("");
    setNote("");
    setQuantity("");
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="purchase-form-page">
        <h1>Effectuer un Achat</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sélectionner un produit *</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Choisir un produit</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sélectionner un fournisseur *</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              required
            >
              <option value="">Choisir un fournisseur</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sélectionner une demande d'achat *</label> {/* <-- plus "optionnel" */}
            <select
              value={demandeAchatId}
              onChange={(e) => setDemandeAchatId(e.target.value)}
              required
            >
              <option value="">Choisir une demande</option>
              {demandesAchat.map((demande) => (
                <option key={demande.id} value={demande.id}>
                  {demande.titre} - Quantité demandée: {demande.quantiteDemandee}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description optionnelle"
            />
          </div>

          <div className="form-group">
            <label>Remarque</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Remarque optionnelle"
            />
          </div>

          <div className="form-group">
            <label>Quantité *</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit">Enregistrer l'Achat</button>
        </form>
      </div>
    </Layout>
  );
};

export default PurchasePage;
