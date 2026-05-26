package com.example.caja_chica.service;

import com.example.caja_chica.model.CajaChica;
import com.example.caja_chica.model.Gasto;
import com.example.caja_chica.model.Usuario;
import com.example.caja_chica.repository.CajaChicaRepository;
import com.example.caja_chica.repository.GastoRepository;
import com.example.caja_chica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class GastoService {

    @Autowired
    private GastoRepository gastoRepository;

    @Autowired
    private CajaChicaRepository cajaChicaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Gasto registrarGasto(Gasto gasto, Long cajaId, String username) {
        CajaChica caja = cajaChicaRepository.findById(cajaId)
                .orElseThrow(() -> new RuntimeException("Caja chica no encontrada"));

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        gasto.setEstado("PENDIENTE");
        gasto.setFecha(LocalDateTime.now());
        gasto.setCajaChica(caja);
        gasto.setUsuario(usuario);

        return gastoRepository.save(gasto);
    }

    public Gasto aprobarGasto(Long gastoId) {
        Gasto gasto = gastoRepository.findById(gastoId)
                .orElseThrow(() -> new RuntimeException("Gasto no encontrado"));

        if (!gasto.getEstado().equals("PENDIENTE")) {
            throw new RuntimeException("Solo se pueden aprobar gastos en estado PENDIENTE");
        }

        CajaChica caja = gasto.getCajaChica();
        if (caja.getSaldoActual().compareTo(gasto.getMonto()) < 0) {
            throw new RuntimeException("Saldo insuficiente en la caja chica");
        }

        caja.setSaldoActual(caja.getSaldoActual().subtract(gasto.getMonto()));
        cajaChicaRepository.save(caja);

        gasto.setEstado("APROBADO");
        return gastoRepository.save(gasto);
    }

    public Gasto rechazarGasto(Long gastoId) {
        Gasto gasto = gastoRepository.findById(gastoId)
                .orElseThrow(() -> new RuntimeException("Gasto no encontrado"));

        if (!gasto.getEstado().equals("PENDIENTE")) {
            throw new RuntimeException("Solo se pueden rechazar gastos en estado PENDIENTE");
        }

        gasto.setEstado("RECHAZADO");
        return gastoRepository.save(gasto);
    }

    public List<Gasto> listarTodos() {
        return gastoRepository.findAll();
    }

    public List<Gasto> listarPorUsuario(Long usuarioId) {
        return gastoRepository.findByUsuarioId(usuarioId);
    }

    public List<Gasto> listarPorEstado(String estado) {
        return gastoRepository.findByEstado(estado.toUpperCase());
    }

    public List<Gasto> listarPorCategoria(String categoria) {
        return gastoRepository.findByCategoria(categoria.toUpperCase());
    }

    public Gasto agregarComprobante(Long gastoId, String rutaComprobante) {
        Gasto gasto = gastoRepository.findById(gastoId)
                .orElseThrow(() -> new RuntimeException("Gasto no encontrado"));

        gasto.setComprobante(rutaComprobante);
        return gastoRepository.save(gasto);
    }
}
