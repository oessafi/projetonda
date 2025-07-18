import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  const navigate = useNavigate();

  // Configuration de la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transactionData = await ApiService.getAllTransactions(valueToSearch);

        if (transactionData.status === 200) {
          setTotalPages(Math.ceil(transactionData.transactions.length / itemsPerPage));

          setTransactions(
            transactionData.transactions.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Erreur lors du chargement des transactions : " + error
        );
      }
    };

    getTransactions();
  }, [currentPage, valueToSearch]);

  // Afficher un message (succès/erreur)
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  // Lancer la recherche
  const handleSearch = () => {
    setCurrentPage(1);
    setValueToSearch(filter);
  };

  // Navigation vers la page de détails d'une transaction
  const navigateToTransactionDetailsPage = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  };

  return (
    <Layout>
      {message && <p className="message">{message}</p>}

      <div className="transactions-page">
        <div className="transactions-header">
          <h1>Transactions</h1>
          <div className="transaction-search">
            <input
              placeholder="Rechercher une transaction..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              type="text"
            />
            <button onClick={handleSearch}>Rechercher</button>
          </div>
        </div>

        {transactions && (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>TYPE</th>
                <th>STATUT</th>
                <th>PRIX TOTAL</th>
                <th>TOTAL PRODUITS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.totalPrice}</td>
                  <td>{transaction.totalProducts}</td>
                  <td>{new Date(transaction.createdAt).toLocaleString("fr-FR")}</td>
                  <td>
                    <button onClick={() => navigateToTransactionDetailsPage(transaction.id)}>
                      Voir les détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};

export default TransactionsPage;
