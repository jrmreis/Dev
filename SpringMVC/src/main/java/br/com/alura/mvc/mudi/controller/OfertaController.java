package br.com.alura.mvc.mudi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/oferta")
public class OfertaController {

	@GetMapping
	public String getFormularioParaOfertas() {
		return "oferta/home";
	}
}
