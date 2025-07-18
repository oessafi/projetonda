import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import PaginationComponent from "../component/PaginationComponent";

const InventairePage = () => {
  const [produits, setProduits] = useState([]);
  const [message, setMessage] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await ApiService.getAllProducts(); // ou getInventaire si API séparée
        if (response.status === 200) {
          const allProduits = response.products; // ou response.data si backend différent
          setTotalPages(Math.ceil(allProduits.length / itemsPerPage));

          const pageItems = allProduits.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );
          setProduits(pageItems);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Erreur chargement inventaire: " + error
        );
      }
    };

    fetchProduits();
  }, [currentPage]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const getStockClass = (quantite, seuil) => {
    if (quantite < seuil) return "stock-danger";
    if (quantite === seuil) return "stock-warning";
    return "stock-ok";
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-page">
        <div className="product-header">
          <h1>Inventaire</h1>
        </div>

        {produits && (
          <div className="product-list">
            {produits.map((produit) => (
              <div
                key={produit.id}
                className={`product-item ${getStockClass(
                  produit.stockQuantity,
                  produit.seuilMin
                )}`}
              >
                <img
                  className="product-image"
                  src={produit.imageUrl}
                  alt={produit.name}
                />

                <div className="product-info">
                  <h3 className="name">{produit.name}</h3>
                  <p className="sku">SKU: {produit.sku}</p>
                  <p className="price">Prix: {produit.price}</p>
                  <p className="quantity">
                    Quantité: {produit.stockQuantity} {" "}
                    <span className="seuil">(Min: {produit.seuilMin})</span>
                  </p>

                  {produit.stockQuantity < produit.seuilMin && (
                    <p className="text-danger">⚠️ Stock bas</p>
                  )}
                  {produit.stockQuantity === produit.seuilMin && (
                    <p className="text-warning">🟠 Stock au seuil</p>
                  )}
                  {produit.stockQuantity > produit.seuilMin && (
                    <p className="text-success">🟢 Stock OK</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};

export default InventairePage;
