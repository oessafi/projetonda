package com.phegondev.InventoryMgtSystem.controllers;

import com.phegondev.InventoryMgtSystem.dtos.DemandeAchatDTO;
import com.phegondev.InventoryMgtSystem.dtos.Response;
import com.phegondev.InventoryMgtSystem.services.DemandeAchatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demandes")
@RequiredArgsConstructor
public class DemandeAchatController {

    private final DemandeAchatService demandeAchatService;

    // ✅ Créer une nouvelle demande d'achat
    @PostMapping("/add")
    public Response createDemande(@RequestBody DemandeAchatDTO demandeAchatDTO) {
        return demandeAchatService.createDemande(demandeAchatDTO);
    }

    // ✅ Récupérer toutes les demandes d'achat
    @GetMapping("/all")
    public Response getAllDemandes() {
        return demandeAchatService.getAllDemandes();
    }

    // ✅ Récupérer une demande d'achat par ID
    @GetMapping("/{id}")
    public Response getDemandeById(@PathVariable Long id) {
        return demandeAchatService.getDemandeById(id);
    }

    // ✅ Supprimer une demande
    @DeleteMapping("/delete/{id}")
    public Response deleteDemande(@PathVariable Long id) {
        return demandeAchatService.deleteDemande(id);
    }

    // ✅ Mise à jour d'une demande
    @PutMapping("/update")
    public Response updateDemande(@RequestBody DemandeAchatDTO demandeAchatDTO) {
        return demandeAchatService.updateDemande(demandeAchatDTO);
    }
    @PutMapping("/demandes/valider/{id}")
    public ResponseEntity<?> validerDemande(@PathVariable Long id) {
        Response response = demandeAchatService.validerDemande(id);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/traiter/{id}")
    public ResponseEntity<?> traiterDemande(@PathVariable Long id) {
        Response response = demandeAchatService.traiterDemande(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/traitees")
    public ResponseEntity<Response> getDemandesTraitees() {
        Response response = demandeAchatService.getDemandesTraitees();
        return ResponseEntity.ok(response);
    }


    // ✅ Marquer une demande comme traitée par l'acheteur
    @PutMapping("/traiter-par-acheteur/{id}")
    public ResponseEntity<Response> traiterParAcheteur(@PathVariable Long id) {
        Response response = demandeAchatService.traiterDemandeParAcheteur(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/non-traitees")
    public ResponseEntity<Response> getDemandesNonTraitees() {
        Response response = demandeAchatService.getDemandesNonTraitees();
        return ResponseEntity.ok(response);
    }
}
