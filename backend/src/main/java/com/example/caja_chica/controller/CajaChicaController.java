package com.example.caja_chica.controller;

import com.example.caja_chica.model.CajaChica;
import com.example.caja_chica.service.CajaChicaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
@RestController
@RequestMapping("/caja")
public class CajaChicaController {

    @Autowired
    private CajaChicaService service;

    @PostMapping
    public CajaChica crear(@RequestParam BigDecimal montoInicial) {
        return service.crearCaja(montoInicial);
    }

    @GetMapping
    public List<CajaChica> listar() {
        return service.listar();
    }
}