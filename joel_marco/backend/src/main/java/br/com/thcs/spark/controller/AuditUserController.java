package br.com.thcs.spark.controller;

import br.com.thcs.spark.model.SparkId;
import br.com.thcs.spark.model.SpkAuditUser;
import br.com.thcs.spark.repository.AuditUserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@RestController
@RequestMapping("/audit-user")
public class AuditUserController {
    private final AuditUserRepository repository;

    AuditUserController(AuditUserRepository auditUserRepository) {
        this.repository = auditUserRepository;
    }

    @GetMapping
    public Optional<SpkAuditUser> getFalconIn(@RequestParam(value = "date") String date,
                                              @RequestParam(value = "system") String system,
                                              @RequestParam(value = "token") String token){
        SparkId id = new SparkId(date, system, token);
        return repository.findById(id);
    }

}
