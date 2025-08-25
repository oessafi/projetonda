import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ApiService from "../service/ApiService";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  FileText,
  CheckCircle,
  Search,
  Camera,
  LogOut,
  Plane,
  User,          // icône pour gestion users
  UserPlus       // icône pour création utilisateur (optionnel)
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isMagasinier = ApiService.isMagasinier();
  const isAcheteur = ApiService.isAcheteur();

  const handleLogout = () => {
    ApiService.logout();
    navigate("/login");
  };

  const isActivePath = (path) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, children, onClick }) => {
    const isActive = onClick ? false : isActivePath(to);
    
    return (
      <li style={{ margin: '0.5rem 0' }}>
        {onClick ? (
          <button
            onClick={onClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.875rem 1.25rem',
              backgroundColor: 'transparent',
              color: '#f1f5f9',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(248, 113, 113, 0.1)';
              e.target.style.color = '#fca5a5';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#f1f5f9';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <Icon size={20} />
            {children}
          </button>
        ) : (
          <Link
            to={to}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1.25rem',
              backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: isActive ? '#60a5fa' : '#f1f5f9',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                e.target.style.color = '#93c5fd';
                e.target.style.transform = 'translateX(4px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#f1f5f9';
                e.target.style.transform = 'translateX(0)';
              }
            }}
          >
            <Icon size={20} />
            {children}
          </Link>
        )}
      </li>
    );
  };

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: '#f1f5f9',
      position: 'fixed',
      top: 0,
      left: 0,
      padding: '2rem 1.5rem',
      boxShadow: '10px 0 30px rgba(0, 0, 0, 0.3)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Logo et titre */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <Plane style={{
            width: '2rem',
            height: '2rem',
            color: '#0891b2',
            filter: 'drop-shadow(0 0 10px rgba(8, 145, 178, 0.3))'
          }} />
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#0891b2',
            margin: 0,
            textShadow: '0 0 10px rgba(8, 145, 178, 0.3)'
          }}>
            OndaStock
          </h2>
        </div>
        <p style={{
          fontSize: '0.75rem',
          color: 'rgba(241, 245, 249, 0.6)',
          margin: 0,
          fontWeight: '400'
        }}>
          Système de Gestion
        </p>
      </div>

      {/* Navigation */}
      <nav style={{ flexGrow: 1 }}>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          
          {/* Menu ADMIN */}
          {isAdmin && (
            <>
              <NavItem to="/dashboard" icon={LayoutDashboard}>
                Tableau de bord
              </NavItem>
              <NavItem to="/transaction" icon={FileText}>
                Transactions
              </NavItem>
              <NavItem to="/demandes_achat" icon={ShoppingCart}>
                Toutes les demandes
              </NavItem>
              <NavItem to="/demandes-traitees" icon={CheckCircle}>
                Demandes traitées
              </NavItem>

              {/* Gestion des utilisateurs */}
              <NavItem to="/user-management" icon={Users}>
                Gestion des utilisateurs
              </NavItem>
            </>
          )}

          {/* Menu ACHETEUR */}
          {isAcheteur && (
            <>
              <NavItem to="/supplier" icon={Users}>
                Fournisseurs
              </NavItem>
              <NavItem to="/demandes-non-traitees" icon={ShoppingCart}>
                Voir demandes d'achat
              </NavItem>
              <NavItem to="/purchase" icon={Package}>
                Achats
              </NavItem>
              <NavItem to="/recherche-produits" icon={Search}>
                Recherche produits
              </NavItem>
            </>
          )}

          {/* Menu MAGASINIER */}
          {isMagasinier && (
            <>
              <NavItem to="/Consumption" icon={Package}>
                Consommation
              </NavItem>
              <NavItem to="/product" icon={Package}>
                Produits
              </NavItem>
              <NavItem to="/category" icon={FileText}>
                Catégories
              </NavItem>
              <NavItem to="/demande-achat" icon={ShoppingCart}>
                Créer demandes d'achat
              </NavItem>
              <NavItem to="/search-by-photo" icon={Camera}>
                Chercher par photo
              </NavItem>
            </>
          )}
        </ul>
      </nav>

      {/* Bouton de déconnexion */}
      <div style={{
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <NavItem icon={LogOut} onClick={handleLogout}>
            Déconnexion
          </NavItem>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
