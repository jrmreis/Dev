package br.com.thcs.spark.controller;

import br.com.thcs.spark.model.Solicitation;
import br.com.thcs.spark.model.SparkId;
import br.com.thcs.spark.repository.SolicitationRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;


@RestController
@RequestMapping("/solicitation")
public class SolicitationController {
    private SolicitationRepository repository;

    SolicitationController(SolicitationRepository solicitationRepository) {
        this.repository = solicitationRepository;
    }

    @GetMapping
    public Optional<Solicitation> getSolicitation(@RequestParam(value = "date") String date,
                                                  @RequestParam(value = "system") String system,
                                                  @RequestParam(value = "token") String token){
        SparkId id = new SparkId(date, system, token);
        Optional<Solicitation> solicitationOptional = repository.findById(id);
        return solicitationOptional;
    }

}
