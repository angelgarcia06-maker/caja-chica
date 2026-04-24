package com.example.caja_chica.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity // Le dice a Spring que esta clase es una tabla de BD
@Table(name = "usuarios")
@Data   // Genera Getters y Setters automáticamente (gracias a Lombok)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    @Column(unique = true) // No permite usuarios duplicados
    private String username;

    @NotBlank
    private String password;

    private String rol; // ADMIN o EMPLEADO
}