package com.phegondev.InventoryMgtSystem.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DemandeAchatDTO {
    private Long id;
    private String titre;
    private String description;
    private Integer quantiteDemandee;
    private LocalDateTime dateDemande;
    private boolean traiteeParAcheteur;
    private String produitNom;
    private Long produitId;
}
