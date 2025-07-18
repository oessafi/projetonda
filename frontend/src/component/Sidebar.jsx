import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const Sidebar = () => {
  const navigate = useNavigate();
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isMagasinier = ApiService.isMagasinier();
  const isAcheteur = ApiService.isAcheteur();

  const handleLogout = () => {
    ApiService.logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h5 className="ims">ondastock</h5>
      <ul className="nav-links">

        {/* Accès pour ADMIN */}
        {isAdmin && (
          <>
            <li><Link to="/dashboard">Tableau de bord</Link></li>
            <li><Link to="/transaction">Transactions</Link></li>
            <li><Link to="/demandes-achat">Toutes les demandes</Link></li>
            <li><Link to="/demandes-traitees">Demandes traitées</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </li>
          </>
        )}

        {/* Accès pour ACHETEUR */}
        {isAcheteur && (
          <>
         
            <li><Link to="/supplier">Fournisseurs</Link></li>
            <li><Link to="/demandes_achat">Voir demandes d'achat</Link></li>
            <li><Link to="/purchase">Achats</Link></li>

            <li>
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </li>
          </>
        )}

        {/* Accès pour MAGASINIER */}
        {isMagasinier && (
          <>
            <li><Link to="/sell">Consommation</Link></li>
   <li><Link to="/product">Produits</Link></li>
            <li><Link to="/category">Catégories</Link></li>
            <li>
                <li><Link to="/demande-achat">Crée demandes d'achat</Link></li>
                 <li><Link to="/search-by-photo">Chercher produit par photo</Link></li>
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
