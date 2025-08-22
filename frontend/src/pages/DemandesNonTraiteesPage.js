import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const DemandesNonTraiteesPage = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDemandesNonTraitees();
  }, []);

  const fetchDemandesNonTraitees = async () => {
    try {
      const response = await ApiService.getDemandesNonTraitees();

      if (response.status === 200 && response.demandes && Array.isArray(response.demandes)) {
        setDemandes(response.demandes);
      } else {
        setMessage("Erreur lors du chargement des demandes non traitées.");
      }
    } catch (error) {
      console.error("Erreur API :", error);
      setMessage("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-4" style={{ maxWidth: "950px" }}>
        <h2 className="mb-4 text-center">Demandes d'achat non traitées</h2>

        {message && (
          <div className="alert alert-danger text-center">{message}</div>
        )}

        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : demandes.length === 0 ? (
          <div className="text-center">Aucune demande non traitée trouvée.</div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>Titre</th>
                <th>Quantité</th>
                <th>Produit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande) => (
                <tr key={demande.id} className="text-center">
                  <td>{demande.titre}</td>
                  <td>{demande.quantiteDemandee}</td>
                  <td>{demande.produitNom || "N/A"}</td>
                  <td>{new Date(demande.dateDemande).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default DemandesNonTraiteesPage;
