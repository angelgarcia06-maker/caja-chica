package com.example.caja_chica.service;

import com.example.caja_chica.model.CajaChica;
import com.example.caja_chica.repository.CajaChicaRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CajaChicaService {

    @Autowired
    private CajaChicaRepository repository;

    public CajaChica crearCaja(BigDecimal montoInicial) {
        CajaChica caja = new CajaChica();
        caja.setMontoInicial(montoInicial);
        caja.setSaldoActual(montoInicial);
        return repository.save(caja);
    }

    public List<CajaChica> listar() {
        return repository.findAll();
    }
}
