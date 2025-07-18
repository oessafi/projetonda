import React, { useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const SearchByPhoto = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!image) {
      showMessage("Veuillez sélectionner une image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      // 🔧 Appelle API si backend est prêt
      // const res = await ApiService.searchProductByImage(formData);
      // setResult(res.data);

      // 🔁 Simulation temporaire
      setResult("Produit détecté : Clé à molette");

    } catch (error) {
      console.error(error);
      showMessage("Erreur lors de la recherche par image.");
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="purchase-form-page">
        <h1>Recherche de Produit par Photo</h1>

        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label>Choisir une image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Lancer la recherche
          </button>
        </form>

        {result && (
          <div className="alert alert-success mt-4">
            {result}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchByPhoto;
