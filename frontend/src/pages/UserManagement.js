import React, { useState, useEffect } from "react";
import { Edit3, Trash2, Users, Mail, User, Shield, Check, Phone, Lock } from "lucide-react";
import ApiService from "../service/ApiService";
import Layout from "../component/Layout";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Champs similaires à RegisterPage
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "MAGASINIER",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await ApiService.getAllUsers();
      if (response.status === 200) {
        setUsers(response.users);
      }
    } catch (error) {
      showMessage("Erreur serveur: " + error.message);
    }
    setLoading(false);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await ApiService.updateUser(editingUser.id, formData);
        showMessage("Utilisateur modifié avec succès.");
      } else {
        await ApiService.registerUser(formData);
        showMessage("Utilisateur ajouté avec succès.");
      }
      loadUsers();
      resetForm();
    } catch (error) {
      showMessage(error.response?.data?.message || "Erreur lors de la sauvegarde");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      try {
        await ApiService.deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
        showMessage("Utilisateur supprimé.");
      } catch (error) {
        showMessage("Erreur lors de la suppression");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      phoneNumber: user.phoneNumber || "",
      role: user.role,
    });
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "MAGASINIER",
    });
  };

  const getRoleBadge = (role) => {
    const colors = {
      ADMIN: "bg-red-100 text-red-700",
      ACHETEUR: "bg-blue-100 text-blue-700",
      MAGASINIER: "bg-green-100 text-green-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" /> Gestion des utilisateurs
        </h1>

        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 flex items-center gap-2">
            <Check className="w-4 h-4" /> {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <div className="bg-white p-5 rounded shadow border">
            <h2 className="text-lg font-medium mb-4">
              {editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!!editingUser}
                className="w-full p-2 border rounded"
              />
              {!editingUser && (
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              )}
              <input
                type="text"
                name="phoneNumber"
                placeholder="Numéro de téléphone"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="MAGASINIER">Magasinier</option>
                <option value="ACHETEUR">Acheteur</option>
                <option value="ADMIN">Administrateur</option>
              </select>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingUser ? "Modifier" : "Ajouter"}
                </button>
                {editingUser && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Liste */}
          <div className="lg:col-span-2 bg-white rounded shadow border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Utilisateur</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Téléphone</th>
                  <th className="p-3 text-left">Rôle</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center">Chargement...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">Aucun utilisateur</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phoneNumber}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${getRoleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
