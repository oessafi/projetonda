package com.phegondev.InventoryMgtSystem.services.impl;

import com.phegondev.InventoryMgtSystem.dtos.*;
import com.phegondev.InventoryMgtSystem.enums.UserRole;
import com.phegondev.InventoryMgtSystem.exceptions.InvalidCredentialsException;
import com.phegondev.InventoryMgtSystem.exceptions.NotFoundException;
import com.phegondev.InventoryMgtSystem.models.User;
import com.phegondev.InventoryMgtSystem.repositories.UserRepository;
import com.phegondev.InventoryMgtSystem.security.JwtUtils;
import com.phegondev.InventoryMgtSystem.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtils jwtUtils;

    /** ---------------- Enregistrement ---------------- **/
    @Override
    public Response registerUser(RegisterRequest registerRequest) {

        // Vérification et affichage pour debug
        System.out.println("Reçu rôle: " + registerRequest.getRole());

        // rôle par défaut = MAGASINIER s’il n’est pas précisé
        UserRole role = registerRequest.getRole() != null
                ? registerRequest.getRole()
                : UserRole.MAGASINIER;

        User userToSave = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phoneNumber(registerRequest.getPhoneNumber())
                .role(role)
                .build();

        userRepository.save(userToSave);

        return Response.builder()
                .status(200)
                .message("User was successfully registered")
                .build();
    }

    /** ---------------- Connexion ---------------- **/
    @Override
    public Response loginUser(LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException("Email Not Found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password Does Not Match");
        }

        String token = jwtUtils.generateToken(user.getEmail());

        return Response.builder()
                .status(200)
                .message("User Logged in Successfully")
                .role(user.getRole())     // renvoie ADMIN / MAGASINIER / ACHETEUR
                .token(token)
                .expirationTime("6 months")
                .build();
    }

    /** ---------------- Liste utilisateurs ---------------- **/
    @Override
    public Response getAllUsers() {

        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        users.forEach(u -> u.setTransactions(null));      // pour alléger la réponse

        List<UserDTO> userDTOS = modelMapper.map(
                users, new TypeToken<List<UserDTO>>() {}.getType()
        );

        return Response.builder()
                .status(200)
                .message("success")
                .users(userDTOS)
                .build();
    }

    /** ---------------- Utilisateur connecté ---------------- **/
    @Override
    public User getCurrentLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        user.setTransactions(null);
        return user;
    }

    /** ---------------- Récupérer / mettre à jour / supprimer ---------------- **/
    @Override
    public Response getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        UserDTO dto = modelMapper.map(user, UserDTO.class);
        dto.setTransactions(null);

        return Response.builder()
                .status(200)
                .message("success")
                .user(dto)
                .build();
    }

    @Override
    public Response updateUser(Long id, UserDTO userDTO) {

        User existing = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        if (userDTO.getEmail() != null)        existing.setEmail(userDTO.getEmail());
        if (userDTO.getPhoneNumber() != null)  existing.setPhoneNumber(userDTO.getPhoneNumber());
        if (userDTO.getName() != null)         existing.setName(userDTO.getName());
        if (userDTO.getRole() != null)         existing.setRole(userDTO.getRole());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        userRepository.save(existing);

        return Response.builder()
                .status(200)
                .message("User successfully updated")
                .build();
    }

    @Override
    public Response deleteUser(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        userRepository.deleteById(id);

        return Response.builder()
                .status(200)
                .message("User successfully Deleted")
                .build();
    }

    /** ---------------- Transactions d’un utilisateur ---------------- **/
    @Override
    public Response getUserTransactions(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        UserDTO dto = modelMapper.map(user, UserDTO.class);
        dto.getTransactions().forEach(t -> {
            t.setUser(null);
            t.setSupplier(null);
        });

        return Response.builder()
                .status(200)
                .message("success")
                .user(dto)
                .build();
    }
}
