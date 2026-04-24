package com.example.caja_chica.service;

import com.example.caja_chica.model.Usuario;
import com.example.caja_chica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(Usuario usuario) {

        Optional<Usuario> existente =
                usuarioRepository.findByUsername(usuario.getUsername());

        if (existente.isPresent()) {
            throw new RuntimeException("El usuario ya existe");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        if (usuario.getRol() != null) {
            usuario.setRol(usuario.getRol().toUpperCase());
        }

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }
}