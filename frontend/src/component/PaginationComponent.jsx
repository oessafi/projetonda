import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  // Générer les numéros de page avec ellipses
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7; // Nombre maximum de pages visibles
    
    if (totalPages <= maxVisible) {
      // Si le nombre total de pages est petit, afficher toutes
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Logique pour les ellipses
    if (currentPage <= 4) {
      // Début: 1 2 3 4 5 ... 10
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Fin: 1 ... 6 7 8 9 10
      pages.push(1);
      pages.push('ellipsis');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      // Milieu: 1 ... 4 5 6 ... 10
      pages.push(1);
      pages.push('ellipsis');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      {/* Bouton Précédent */}
      <button
        className="pagination-button prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Page précédente"
      >
        <ChevronLeft size={16} />
        <span className="sr-only md:not-sr-only">Précédent</span>
      </button>

      {/* Numéros de page */}
      {pageNumbers.map((number, index) => (
        number === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            <MoreHorizontal size={16} />
          </span>
        ) : (
          <button
            key={number}
            className={`pagination-button ${currentPage === number ? "active" : ""}`}
            onClick={() => onPageChange(number)}
            aria-label={`Page ${number}`}
            aria-current={currentPage === number ? "page" : undefined}
          >
            {number}
          </button>
        )
      ))}

      {/* Bouton Suivant */}
      <button
        className="pagination-button next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Page suivante"
      >
        <span className="sr-only md:not-sr-only">Suivant</span>
        <ChevronRight size={16} />
      </button>

      {/* Informations de page (optionnel) */}
      <div className="pagination-info">
        Page {currentPage} sur {totalPages}
      </div>
    </div>
  );
};

export default PaginationComponent;