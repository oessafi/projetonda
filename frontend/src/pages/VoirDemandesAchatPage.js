import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const VoirDemandesAchatPage = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await ApiService.getAllDemandesAchat();
        console.log("Résultat API:", response);

        // Gestion du format retourné
        if (response?.demandes && Array.isArray(response.demandes)) {
          setDemandes(response.demandes);
        } else if (response?.data?.demandes && Array.isArray(response.data.demandes)) {
          setDemandes(response.data.demandes);
        } else {
          setMessage("Format de données inattendu.");
        }
      } catch (error) {
        console.error(error);
        setMessage(
          error?.response?.data?.message ||
          "Erreur lors du chargement des demandes d'achat."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  return (
    <Layout>
      <div className="container mt-4" style={{ maxWidth: "950px" }}>
        <h2 className="mb-4 text-center">Liste des Demandes d'Achat</h2>

        {message && (
          <div className="alert alert-danger text-center">{message}</div>
        )}

        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Quantité</th>
                <th>Produit</th>
              </tr>
            </thead>
            <tbody>
              {demandes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Aucune demande trouvée.
                  </td>
                </tr>
              ) : (
                demandes.map((demande) => (
                  <tr key={demande.id}>
                    <td>{demande.titre}</td>
                    <td>{demande.description}</td>
                    <td>{demande.quantiteDemandee}</td>
                    <td>{demande.produitNom || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default VoirDemandesAchatPage;
