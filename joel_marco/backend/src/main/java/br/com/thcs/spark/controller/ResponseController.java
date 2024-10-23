package br.com.thcs.spark.controller;

import br.com.thcs.spark.model.Response;
import br.com.thcs.spark.model.SparkId;
import br.com.thcs.spark.repository.ResponseRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;


@RestController
@RequestMapping("/response")
public class ResponseController {
    private ResponseRepository repository;

    ResponseController(ResponseRepository responseRepository) {
        this.repository = responseRepository;
    }

    @GetMapping
    public Optional<Response> getResponse(@RequestParam(value = "date", required = true) String date,
                                                  @RequestParam(value = "system", required = true) String system,
                                                  @RequestParam(value = "token", required = true) String token){
        SparkId id = new SparkId(date, system, token);
        return repository.findById(id);
    }

}
