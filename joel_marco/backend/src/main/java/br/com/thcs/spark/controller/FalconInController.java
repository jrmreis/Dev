package br.com.thcs.spark.controller;


import br.com.thcs.spark.dto.FalconInDTO;

import br.com.thcs.spark.model.FalconIn;
import br.com.thcs.spark.model.SparkId;
import br.com.thcs.spark.repository.FalconInRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


import java.util.Optional;


@RestController
@RequestMapping("/falcon-in")
public class FalconInController {
    private final FalconInRepository repository;

    private final ModelMapper modelMapper;

    @Autowired
    FalconInController(FalconInRepository falconInRepository, ModelMapper modelMapper) {
        this.repository = falconInRepository;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public FalconInDTO getFalconIn(@RequestParam(value = "date") String date,
                                          @RequestParam(value = "system") String system,
                                          @RequestParam(value = "token") String token){
        SparkId id = new SparkId(date, system, token);
        Optional<FalconIn> falconInOptional  = this.repository.findById(id);
        return falconInOptional.map(this::convertToDTO).orElse(null);
    }

    private FalconInDTO convertToDTO(FalconIn falcon) {
        FalconInDTO falconInDTO = this.modelMapper.map(falcon, FalconInDTO.class);
        falconInDTO.setMessage(falcon.getMessage());
        return falconInDTO;
    }
}