package com.example.caja_chica.repository;

import com.example.caja_chica.model.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

    List<Movimiento> findByCajaChicaId(Long cajaId);
}