package com.phegondev.InventoryMgtSystem.models;

import com.phegondev.InventoryMgtSystem.enums.ProductType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est requis")
    private String name;

    @Column(unique = true)
    @NotBlank(message = "Le SKU est requis")
    private String sku;

    @Positive(message = "Le prix doit être positif")
    private BigDecimal price;

    @Min(value = 0, message = "La quantité ne peut pas être négative")
    private Integer stockQuantity;

    private String description;

    private LocalDateTime expiryDate;

    private String imageUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)  // <-- Ajoute cette annotation ici
    private ProductType typeProduit;

    // ✅ Nouveau champ : date d’amortissement
    private LocalDateTime dateAmortissement;

    // ✅ Nouveau champ : stock minimum
    @Min(value = 0, message = "Le stock minimum ne peut pas être négatif")
    private Integer stockMin;

    // ✅ Nouveau champ : stock maximum
    @Min(value = 0, message = "Le stock maximum ne peut pas être négatif")
    private Integer stockMax;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL)
    private List<DemandeAchat> demandesAchat = new ArrayList<>();

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sku='" + sku + '\'' +
                ", price=" + price +
                ", stockQuantity=" + stockQuantity +
                ", stockMin=" + stockMin +
                ", stockMax=" + stockMax +
                ", typeProduit='" + typeProduit + '\'' +
                ", dateAmortissement=" + dateAmortissement +
                ", description='" + description + '\'' +
                ", expiryDate=" + expiryDate +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    public String getname() {
        return name;
    }

    public String getName() {
        return name;
    }
}
