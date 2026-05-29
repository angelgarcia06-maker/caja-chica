package com.example.caja_chica.repository;

import com.example.caja_chica.model.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GastoRepository extends JpaRepository<Gasto, Long> {

    List<Gasto> findByUsuarioId(Long usuarioId);

    List<Gasto> findByEstado(String estado);

    List<Gasto> findByCajaChicaId(Long cajaId);

    List<Gasto> findByCategoria(String categoria);
}
