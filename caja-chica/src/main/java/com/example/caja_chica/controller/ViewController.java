package com.example.caja_chica.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping({"/", "/login"})
    public String login() { return "login"; }

    @GetMapping("/view/dashboard")
    public String dashboard() { return "dashboard"; }

    @GetMapping("/view/gastos")
    public String gastos() { return "gastos"; }

    @GetMapping("/view/registrar-gasto")
    public String registrarGasto() { return "registrar-gasto"; }

    @GetMapping("/view/movimientos")
    public String movimientos() { return "movimientos"; }

    @GetMapping("/view/presupuesto")
    public String presupuesto() { return "presupuesto"; }

    @GetMapping("/view/usuarios")
    public String usuarios() { return "usuarios"; }
}