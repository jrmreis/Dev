package br.com.thcs.spark.controller;

import br.com.thcs.spark.model.Fields;
import br.com.thcs.spark.repository.FieldsRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fields")
public class FieldsController {
    private FieldsRepository repository;

    FieldsController(FieldsRepository fieldsRepository) {
        this.repository = fieldsRepository;
    }

    @GetMapping
    public List<Fields> findAll(){
        return repository.findAllByOrderByPositionAsc();
    }

}