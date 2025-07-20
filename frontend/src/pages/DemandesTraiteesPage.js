import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const DemandesTraiteesPage = () => {
  const [demandes, setDemandes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await ApiService.getAllDemandesAchat();
        // Filtrer uniquement les demandes traitées par l’IA
        const traitees = response.filter((d) => d.traiteeParIA === true);
        setDemandes(traitees);
      } catch (error) {
        setMessage("Erreur lors du chargement des demandes.");
      }
    };

    fetchDemandes();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-4">Demandes d’Achat Traitées par l’IA</h2>
        {message && <div className="alert alert-danger">{message}</div>}
        {demandes.length === 0 ? (
          <p>Aucune demande traitée par l’IA pour le moment.</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Quantité</th>
                <th>Produit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande) => (
                <tr key={demande.id}>
                  <td>{demande.titre}</td>
                  <td>{demande.description}</td>
                  <td>{demande.quantiteDemandee}</td>
                  <td>{demande.produit.name || "—"}</td>
                  <td>{new Date(demande.dateCreation).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default DemandesTraiteesPage;
