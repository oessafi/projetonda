package com.phegondev.InventoryMgtSystem.services;

import com.phegondev.InventoryMgtSystem.dtos.DemandeAchatDTO;
import com.phegondev.InventoryMgtSystem.dtos.Response;

public interface DemandeAchatService {

    Response createDemande(DemandeAchatDTO dto);
    Response getAllDemandes();
    Response getDemandeById(Long id);
    Response updateDemande(DemandeAchatDTO dto);
    Response deleteDemande(Long id);
    Response validerDemande(Long demandeId); // <-- cette ligne est essentielle
}
