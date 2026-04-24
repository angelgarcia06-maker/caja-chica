package com.example.caja_chica.model;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
@Entity
@Table(name = "caja_chica")
@Data
public class CajaChica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal montoInicial;
    private BigDecimal saldoActual;
}
