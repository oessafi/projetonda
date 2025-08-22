import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // Stock minimum atteint pour quels produits ? Pour déclencher demande d'achat
  const [productsToOrder, setProductsToOrder] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ApiService.getAllProducts();

        if (productData.status === 200) {
          setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

          // Pagination : produits à afficher sur la page courante
          setProducts(
            productData.products.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );

          // Trouver les consommables où stockMin = stockQuantity
          const toOrder = productData.products.filter(
            (p) =>
              p.typeProduit?.toUpperCase() === "CONSUMABLE" &&
              p.stockMin !== null &&
              p.stockQuantity === p.stockMin
          );
          setProductsToOrder(toOrder);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting Products: " + error
        );
      }
    };

    getProducts();
  }, [currentPage]);

  // Effet pour créer automatiquement demande achat pour chaque produit où stock min atteint
  useEffect(() => {
    const createDemands = async () => {
      for (const product of productsToOrder) {
        try {
          await ApiService.creerDemandeAchat({
            titre: `Réapprovisionnement - ${product.name}`,
            description: `Stock minimum atteint pour ${product.name}. Demande générée automatiquement.`,
            quantiteDemandee:
              (product.stockMax && product.stockMax - product.stockQuantity) || 1,
            produitId: product.id,
          });
          showMessage(
            `⚠️ Demande d'achat créée pour ${product.name} (stock min atteint)`
          );
        } catch (error) {
          showMessage(
            `❌ Erreur lors de la demande d'achat pour ${product.name}`
          );
        }
      }
    };

    if (productsToOrder.length > 0) {
      createDemands();
    }
  }, [productsToOrder]);

  // Supprimer un produit
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      try {
        await ApiService.deleteProduct(productId);
        showMessage("Product successfully Deleted");
        window.location.reload(); // recharge la page
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Error Deleting a product: " + error
        );
      }
    }
  };

  // Afficher un message temporaire
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  // Formater date amortissement
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-page">
        <div className="product-header">
          <h1>Products</h1>
          <button
            className="add-product-btn"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>
        </div>

        {products && (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  className="product-image"
                  src={product.imageUrl}
                  alt={product.name}
                />

                <div className="product-info">
                  <h3 className="name">{product.name}</h3>
                  <p className="sku">Sku: {product.sku}</p>
                  <p className="price">Price: {product.price}</p>
                  <p className="quantity">Quantity: {product.stockQuantity}</p>

                  {/* ✅ Alerte Stock Min atteint */}
                  {product.typeProduit?.toUpperCase() === "CONSUMABLE" &&
                    product.stockMin !== null &&
                    product.stockMin === product.stockQuantity && (
                      <div className="alert-stock-min">
                        ⚠️ Stock minimum atteint !
                      </div>
                    )}

                  {/* Affichage conditionnel pour les consommables */}
                  {product.typeProduit?.toUpperCase() === "CONSUMABLE" && (
                    <>
                      <p className="stock-min">
                        Stock Min: {product.stockMin ?? "-"}
                      </p>
                      <p className="stock-max">
                        Stock Max: {product.stockMax ?? "-"}
                      </p>
                    </>
                  )}

                  <p className="type-produit">
                    Type: {product.typeProduit ?? "-"}
                  </p>

                  {/* Affichage date amortissement si pas consommable */}
                  {product.typeProduit?.toUpperCase() !== "CONSUMABLE" && (
                    <p className="date-amortissement">
                      Date Amortissement: {formatDate(product.dateAmortissement)}
                    </p>
                  )}
                </div>

                <div className="product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
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

export default ProductPage;
