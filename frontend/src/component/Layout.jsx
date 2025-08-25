import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
      fontFamily: "'Poppins', system-ui, -apple-system, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Pattern de fond subtil */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(8, 145, 178, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.02) 50%, transparent 60%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <Sidebar />
      
      <div style={{
        marginLeft: '280px', // Correspond exactement à la largeur de votre sidebar
        flexGrow: 1,
        padding: '1.5rem',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Container principal avec effet glassmorphism */}
        <div style={{
          background: `
            linear-gradient(145deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.9) 50%, 
              rgba(241, 245, 249, 0.85) 100%
            )
          `,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '1.5rem',
          boxShadow: `
            0 32px 64px rgba(0, 0, 0, 0.12),
            0 16px 32px rgba(0, 0, 0, 0.08),
            0 8px 16px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.6)
          `,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          minHeight: 'calc(100vh - 3rem)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Barre décorative supérieure */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #0891b2 0%, #0e7490 25%, #0369a1 50%, #1d4ed8 75%, #1e40af 100%)',
            borderRadius: '1.5rem 1.5rem 0 0',
            boxShadow: '0 2px 10px rgba(8, 145, 178, 0.3)'
          }}></div>
          
          {/* Effet de brillance subtil */}
          <div style={{
            position: 'absolute',
            top: '5px',
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
            pointerEvents: 'none'
          }}></div>
          
          {/* Zone de contenu avec padding intelligent */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: '2rem',
            minHeight: 'calc(100vh - 7rem)',
            
            // Styles pour améliorer la lisibilité sur tous types de contenu
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              color: '#0891b2 !important',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            },
            
            // Amélioration des formulaires
            '& input, & select, & textarea': {
              transition: 'all 0.3s ease',
              borderRadius: '0.75rem',
              border: '2px solid #e5e7eb',
              fontSize: '1rem',
              padding: '0.875rem 1rem'
            },
            
            // Amélioration des boutons
            '& button': {
              transition: 'all 0.3s ease',
              borderRadius: '0.75rem',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            },
            
            // Amélioration des cartes et conteneurs
            '& .card, & .item, & .container': {
              borderRadius: '1rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }
          }}>
            
            {/* Contenu de la page */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              
              // Styles CSS intégrés pour les éléments enfants
              '& .auth-container': {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(8, 145, 178, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              },
              
              '& .category-item, & .supplier-item, & .product-item': {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease'
              },
              
              '& .category-item:hover, & .supplier-item:hover, & .product-item:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                background: 'rgba(255, 255, 255, 0.95)'
              },
              
              '& .purchase-form-page, & .supplier-form-page, & .product-form-page': {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(8, 145, 178, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              },
              
              '& .transactions-table': {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
              },
              
              '& .transactions-table th': {
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                color: '#0891b2',
                fontWeight: '600'
              },
              
              '& .section-card': {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)'
              },
              
              '& .profile-card': {
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(8, 145, 178, 0.2)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
              },
              
              '& .chart-container': {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
              },
              
              // Messages d'alerte améliorés
              '& .message': {
                borderRadius: '0.75rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
              },
              
              '& .error-message': {
                background: 'rgba(248, 113, 113, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 12px rgba(248, 113, 113, 0.2)'
              }
            }}>
              {children}
            </div>
            
            {/* Effet de particules flottantes (optionnel) */}
            <div style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(8, 145, 178, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'float 6s ease-in-out infinite',
              zIndex: 0
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '5%',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'float 8s ease-in-out infinite reverse',
              zIndex: 0
            }}></div>
          </div>
        </div>
      </div>
      
      {/* Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
        
        /* Amélioration des transitions pour tous les éléments interactifs */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Scroll personnalisé */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #0891b2, #0e7490);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #0e7490, #0369a1);
        }
        
        /* Focus states améliorés */
        input:focus, select:focus, textarea:focus {
          border-color: #0891b2 !important;
          box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1) !important;
          outline: none !important;
        }
        
        /* Boutons avec effet hover amélioré */
        button:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0 !important;
            padding: 1rem !important;
          }
          
          .container {
            border-radius: 1rem !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;