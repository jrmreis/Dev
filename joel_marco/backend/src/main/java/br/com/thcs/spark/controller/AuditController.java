package br.com.thcs.spark.controller;

import br.com.thcs.spark.dto.AuditDetailsDTO;
import br.com.thcs.spark.dto.AuditGridDTO;
import br.com.thcs.spark.dto.SearchFormDTO;
import br.com.thcs.spark.model.Audit;
import br.com.thcs.spark.model.SparkId;
import br.com.thcs.spark.repository.AuditRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/auditlogs")
public class AuditController {

    private final AuditRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    AuditController (AuditRepository auditRepository) {
        this.repository = auditRepository;
    }

    //    Para obter apenas um registro. É necessário passar como parâmetro (URI), a data, servidor e token
    @GetMapping
    public AuditDetailsDTO getAudit(@RequestParam(value = "date") String date,
                                    @RequestParam(value = "system") String system,
                                    @RequestParam(value = "token") String token){

        SparkId id = new SparkId(date, system, token);
        Optional<Audit> optionalAudit = repository.findById(id);
        Audit audit = optionalAudit.get();
        return convertToDetailsDTO(audit);
    }

    //    Para realizar a busca com filtros de data, servidores, status e pan. Os parâmetros são passados no corpo da requisição.
    @PostMapping("/search")
    public Page<AuditGridDTO> search(@RequestBody SearchFormDTO s) {
        Page<Audit> r;
        r = s.search(repository);
        return r.map(this::convertToGridDTO);
    }

    @GetMapping("/load-last-date")
    @ResponseBody
    public Page<AuditGridDTO> autoload(@RequestParam(value = "size", required = false, defaultValue = "20") Integer size){
        Audit lastDateAudit = repository.findTopByOrderByTransactionDatetimeDesc();
        LocalDateTime lastDate = lastDateAudit.getTransactionDatetime();
        lastDate = lastDate.with(LocalTime.of(0,0,0,0));
        return repository.findByTransactionDatetimeAfterOrderByTransactionDatetime(PageRequest.of(0, size), lastDate)
            .map(this::convertToGridDTO);
    }


    @GetMapping("/systems")
    public List<String> getSystems(){
        return repository.getDistinctSystems();
    }

    @GetMapping("/status")
    public List<String> getStatus(){
        return repository.getDistinctStatus();
    }

    @GetMapping("/tps")
    public List<String> getTps(){
        return repository.getTps();
    }


    private AuditGridDTO convertToGridDTO(Audit audit) {
        AuditGridDTO auditGridDTO = modelMapper.map(audit, AuditGridDTO.class);
        auditGridDTO.setPan(audit.getPan());
        return auditGridDTO;
    }

    private AuditDetailsDTO convertToDetailsDTO(Audit audit) {
        AuditDetailsDTO auditDetailsDTO = modelMapper.map(audit, AuditDetailsDTO.class);
        auditDetailsDTO.setPan(audit.getPan());
        auditDetailsDTO.setDurations(audit);
        return auditDetailsDTO;
    }

}
