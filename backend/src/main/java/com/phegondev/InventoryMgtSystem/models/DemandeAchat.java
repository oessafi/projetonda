package com.phegondev.InventoryMgtSystem.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DemandeAchat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String description;

    private Integer quantiteDemandee;

    private LocalDateTime dateDemande;

    private boolean traiteeParAcheteur;

    @Column(nullable = false)
    private boolean approuvee = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "produit_id")
    private Product produit;

}
