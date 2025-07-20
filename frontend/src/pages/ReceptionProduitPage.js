import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import PaginationComponent from "../component/PaginationComponent";

const ReceptionProduitPage = () => {
  const [produits, setProduits] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProduits();
  }, [currentPage]);

  const fetchProduits = async () => {
    try {
      const response = await ApiService.getAllProducts();
      if (response.status === 200) {
        const allProduits = response.products;
        setTotalPages(Math.ceil(allProduits.length / itemsPerPage));
        const pageItems = allProduits.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
        setProduits(pageItems);
      }
    } catch (error) {
      showMessage("Erreur chargement produits : " + error.message);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleReception = async (produitId) => {
    const quantite = prompt("Quantité à réceptionner ?");
    if (quantite && !isNaN(quantite) && quantite > 0) {
      try {
        await ApiService.receptionnerProduit(produitId, parseInt(quantite));
        showMessage("Réception enregistrée.");
        fetchProduits();
      } catch (err) {
        showMessage("Erreur réception : " + err.message);
      }
    } else {
      alert("Quantité invalide.");
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-page">
        <div className="product-header">
          <h1>Réception de Produits</h1>
          <button
            className="add-product-btn"
            onClick={() => window.location.href = "/add-product"}
          >
            Ajouter un Produit
          </button>
        </div>

        <div className="product-list">
          {produits.map((produit) => (
            <div key={produit.id} className="product-item">
              <img
                className="product-image"
                src={produit.imageUrl}
                alt={produit.name}
              />
              <div className="product-info">
                <h3>{produit.name}</h3>
                <p>SKU : {produit.sku}</p>
                <p>Prix : {produit.price}</p>
                <p>Quantité en stock : {produit.stockQuantity}</p>
              </div>
              <div className="product-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleReception(produit.id)}
                >
                  Réceptionner
                </button>
              </div>
            </div>
          ))}
        </div>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
};

export default ReceptionProduitPage;
