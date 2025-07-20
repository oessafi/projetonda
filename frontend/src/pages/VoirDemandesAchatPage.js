import React from "react";
import Layout from "../component/Layout";

const VoirDemandesAchatPage = () => {
  const demandes = [
    {
      id: 1,
      titre: "Achat Imprimante",
      description: "Besoin d'une imprimante multifonction pour le service RH.",
      quantiteDemandee: 2,
      produit: { nom: "Imprimante Laser HP" },
      approuvee: true,
    },
    {
      id: 2,
      titre: "Commande Caméras",
      description: "Ajout de caméras de surveillance dans le hall.",
      quantiteDemandee: 5,
      produit: { nom: "Caméra de Surveillance 1080p" },
      approuvee: false,
    },
    {
      id: 3,
      titre: "Câble Réseau",
      description: "Câble RJ45 pour les nouveaux bureaux.",
      quantiteDemandee: 20,
      produit: { nom: "Câble Ethernet Cat6" },
      approuvee: true,
    },
    {
      id: 4,
      titre: "Extincteurs",
      description: "Extincteurs à mousse pour la salle serveurs.",
      quantiteDemandee: 3,
      produit: { nom: "Extincteur 6L à mousse" },
      approuvee: false,
    },
  ];

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "950px", margin: "auto", padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Liste des Demandes d'Achat</h2>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Quantité</th>
              <th>Produit</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.titre}</td>
                <td>{demande.description}</td>
                <td>{demande.quantiteDemandee}</td>
                <td>{demande.produit?.nom || "N/A"}</td>
                <td>{demande.approuvee ? "Approuvée" : "En attente"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default VoirDemandesAchatPage;
