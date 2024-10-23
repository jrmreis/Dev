package br.com.thcs.spark.controller;

import br.com.thcs.spark.model.StatusType;
import br.com.thcs.spark.repository.StatusTypeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/status-type")
public class StatusTypeController {
    private StatusTypeRepository repository;
    StatusTypeController(StatusTypeRepository statusTypeRepository) {
        this.repository = statusTypeRepository;
    }

    @GetMapping
    public List<StatusType> findAll() {
        return this.repository.findAll();
    }

}
