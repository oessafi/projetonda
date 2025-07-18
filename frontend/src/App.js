import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import SupplierPage from "./pages/SupplierPage";
import AddEditSupplierPage from "./pages/AddEditSupplierPage";
import ProductPage from "./pages/ProductPage";
import AddEditProductPage from "./pages/AddEditProductPage";
import PurchasePage from "./pages/PurchasePage";
import SellPage from "./pages/SellPage";
import TransactionsPage from "./pages/TransactionsPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import DemandeAchatPage from "./pages/DemandeAchatPage";
import InventairePage from "./pages/InventairePage";
import ReceptionProduitPage from "./pages/ReceptionProduitPage";
import VoirDemandesAchatPage from "./pages/VoirDemandesAchatPage";
import DemandesTraiteesPage from "./pages/DemandesTraiteesPage";
import SearchByPhoto from "./pages/SearchByPhoto";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/category" element={<CategoryPage />} />
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/add-supplier" element={<AddEditSupplierPage />} />
        <Route path="/edit-supplier/:supplierId" element={<AddEditSupplierPage />} />

        <Route path="/product" element={<ProductPage />} />
        <Route path="/add-product" element={<AddEditProductPage />} />
        <Route path="/edit-product/:productId" element={<AddEditProductPage />} />

        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/transaction" element={<TransactionsPage />} />
        <Route path="/transaction/:transactionId" element={<TransactionDetailsPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/demande-achat" element={<DemandeAchatPage />} />
        <Route path="/inventaire" element={<InventairePage />} />
        <Route path="/reception" element={<ReceptionProduitPage />} />
        <Route path="/demandes_achat" element={<VoirDemandesAchatPage />} />
<Route path="/demandes-traitees" element={<DemandesTraiteesPage />} />
<Route path="/search-by-photo" element={<SearchByPhoto />} />


        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
