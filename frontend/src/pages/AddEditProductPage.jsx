import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProductPage = () => {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [typeProduit, setTypeProduit] = useState("CONSUMABLE");
  const [stockMin, setStockMin] = useState("");
  const [stockMax, setStockMax] = useState("");
  const [dateAmortissement, setDateAmortissement] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await ApiService.getAllCategory();
        setCategories(categoriesData.categories);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting all Categories: " + error
        );
      }
    };

    const fetchProductById = async () => {
      if (productId) {
        setIsEditing(true);
        try {
          const productData = await ApiService.getProductById(productId);
          if (productData.status === 200) {
            const prod = productData.product;
            setName(prod.name);
            setSku(prod.sku);
            setPrice(prod.price);
            setStockQuantity(prod.stockQuantity);
            setCategoryId(prod.categoryId);
            setDescription(prod.description);
            setTypeProduit(prod.typeProduit ?? "CONSUMABLE");
            setStockMin(prod.stockMin ?? "");
            setStockMax(prod.stockMax ?? "");
            // Attention : format de la date côté backend ?
            // Si prod.dateAmortissement est ISO8601, cela fonctionne directement
            setDateAmortissement(
              prod.dateAmortissement ? prod.dateAmortissement.split("T")[0] : ""
            );
            setImageUrl(prod.imageUrl);
          } else {
            showMessage(productData.message);
          }
        } catch (error) {
          showMessage(
            error.response?.data?.message || "Error Getting a Product by Id: " + error
          );
        }
      }
    };

    fetchCategories();
    fetchProductById();
  }, [productId]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!name || !sku || !price || !stockQuantity || !categoryId || !typeProduit) {
      showMessage("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    // Envoyer des nombres, pas des chaînes
    formData.append("price", parseFloat(price));
    formData.append("stockQuantity", parseInt(stockQuantity, 10));
    formData.append("categoryId", categoryId);
    formData.append("description", description);
    formData.append("typeProduit", typeProduit);

    if (typeProduit.toUpperCase() === "CONSUMABLE") {
      formData.append("stockMin", parseInt(stockMin || 0, 10));
      formData.append("stockMax", parseInt(stockMax || 0, 10));
    } else {
      formData.append("dateAmortissement", dateAmortissement);
    }

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      if (isEditing) {
        formData.append("productId", productId);
        await ApiService.updateProduct(formData);
        showMessage("Product successfully updated");
      } else {
        await ApiService.addProduct(formData);
        showMessage("Product successfully saved 🤩");
      }
      navigate("/product");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Saving a Product: " + error
      );
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-form-page">
        <h1>{isEditing ? "Edit Product" : "Add Product"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Sku*</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity*</label>
            <input
              type="number"
              min="0"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Price*</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Type Produit*</label>
            <select
              value={typeProduit}
              onChange={(e) => setTypeProduit(e.target.value)}
              required
            >
              <option value="CONSUMABLE">Consumable</option>
              <option value="NON_CONSUMABLE">Non Consumable</option>
            </select>
          </div>

          {typeProduit.toUpperCase() === "CONSUMABLE" ? (
            <>
              <div className="form-group">
                <label>Stock Min*</label>
                <input
                  type="number"
                  min="0"
                  value={stockMin}
                  onChange={(e) => setStockMin(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock Max*</label>
                <input
                  type="number"
                  min="0"
                  value={stockMax}
                  onChange={(e) => setStockMax(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label>Date Amortissement*</label>
              <input
                type="date"
                value={dateAmortissement}
                onChange={(e) => setDateAmortissement(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Category*</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && (
              <img src={imageUrl} alt="preview" className="image-preview" />
            )}
          </div>

          <button type="submit">{isEditing ? "Edit Product" : "Add Product"}</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddEditProductPage;
