package br.com.thcs.spark.controller;

import br.com.thcs.spark.model.FalconOut;
import br.com.thcs.spark.model.SparkId;
import br.com.thcs.spark.repository.FalconOutRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;


@RestController
@RequestMapping("/falcon-out")
public class FalconOutController {
    private FalconOutRepository repository;

    FalconOutController(FalconOutRepository falconOutRepository) {
        this.repository = falconOutRepository;
    }

    @GetMapping
    public Optional<FalconOut> getFalconOut(@RequestParam(value = "date", required = true) String date,
                                            @RequestParam(value = "system", required = true) String system,
                                            @RequestParam(value = "token", required = true) String token){
        SparkId id = new SparkId(date, system, token);
        return repository.findById(id);
    }
}
