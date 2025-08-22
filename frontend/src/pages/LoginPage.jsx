import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import { Mail, Lock, Eye, EyeOff, Plane, AlertCircle, CheckCircle, Loader } from "lucide-react";
import loginLogo from "../assets/logo.png"; // Import du logo ONDA
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success, error, info
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const showMessage = (msg, type = "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showMessage("Adresse e-mail invalide.", "error");
      return;
    }
    if (password.length < 6) {
      showMessage("Le mot de passe doit contenir au moins 6 caractères.", "error");
      return;
    }

    setLoading(true);
    try {
      const loginData = { email, password };
      const res = await ApiService.loginUser(loginData);

      if (res.status === 200) {
        ApiService.saveToken(res.token);
        ApiService.saveRole(res.role);
        showMessage("Connexion réussie ! Redirection en cours...", "success");

        // Redirection après un court délai pour montrer le message de succès
        setTimeout(() => {
          if (res.role === "ADMIN") {
            navigate("/dashboard");
          } else if (res.role === "ACHETEUR") {
            navigate("/supplier");
          } else if (res.role === "MAGASINIER") {
            navigate("/Consumption");
          } else {
            navigate("/login");
          }
        }, 1500);
      } else {
        showMessage("Erreur lors de la connexion.", "error");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Erreur de connexion.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #0891b2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        border: '2px solid rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '80px',
        height: '80px',
        border: '2px solid rgba(255,255,255,0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '60px',
        height: '60px',
        border: '2px solid rgba(255,255,255,0.06)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite'
      }}></div>

      {/* Plane icons */}
      <Plane style={{
        position: 'absolute',
        top: '15%',
        right: '25%',
        width: '40px',
        height: '40px',
        color: 'rgba(255,255,255,0.1)',
        transform: 'rotate(45deg)',
        animation: 'float 12s ease-in-out infinite'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '28rem'
      }}>
        
        {/* Header avec logo ONDA sans fond */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '8rem',
            height: '8rem',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <img 
              src={loginLogo} 
              alt="ONDA Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255,255,255,0.1))',
                borderRadius: '1rem'
              }} 
            />
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem',
            lineHeight: '2.25rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Office National des Aéroports
          </h1>
          <p style={{ 
            color: 'rgba(219, 234, 254, 0.9)', 
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Système de Gestion de Stock
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Card subtle gradient overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #1e40af, #0891b2, #06b6d4)',
            borderRadius: '1.5rem 1.5rem 0 0'
          }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Connexion
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Accédez à votre espace de travail sécurisé
            </p>
          </div>

          {message && (
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: messageType === "success" ? '#dcfce7' : '#fef2f2',
              color: messageType === "success" ? '#166534' : '#dc2626',
              border: `1px solid ${messageType === "success" ? '#bbf7d0' : '#fecaca'}`,
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {messageType === "success" ? (
                <CheckCircle size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.75rem'
              }}>
                Adresse e-mail
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '1rem',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  <Mail style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@example.com"
                  required
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.875rem',
                    paddingBottom: '0.875rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s ease-in-out',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.75rem'
              }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '1rem',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  <Lock style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '3.5rem',
                    paddingTop: '0.875rem',
                    paddingBottom: '0.875rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s ease-in-out',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '1rem',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  ) : (
                    <Eye style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  )}
                </button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: '1.125rem',
                    height: '1.125rem',
                    marginRight: '0.75rem',
                    accentColor: '#3b82f6',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="remember-me" style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  cursor: 'pointer'
                }}>
                  Se souvenir de moi
                </label>
              </div>
              <a href="#" style={{
                fontSize: '0.875rem',
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.2s'
              }}>
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease-in-out',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(59, 130, 246, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px rgba(59, 130, 246, 0.4)';
                }
              }}
            >
              {loading && <Loader style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />}
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: '#e5e7eb'
            }}></div>
            <div style={{
              position: 'relative',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '0 1rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              display: 'inline-block',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              Ou
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0
            }}>
              Vous n'avez pas de compte ?{" "}
              <a href="/register" style={{
                fontWeight: '600',
                color: '#3b82f6',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}>
                Créer un compte
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: 'rgba(219, 234, 254, 0.8)',
          fontSize: '0.875rem'
        }}>
          <p style={{ margin: 0 }}>
            &copy; 2025 Office National des Aéroports. Tous droits réservés.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;