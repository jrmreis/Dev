package br.com.alura.mvc.mudi.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.alura.mvc.mudi.model.Pedido;
import br.com.alura.mvc.mudi.model.StatusPedido;
import br.com.alura.mvc.mudi.repository.PedidoRepository;

@Controller
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping
    public String home(Model model, Principal principal) {
            Sort sort = Sort.by("dataDaEntrega").descending();
            PageRequest paginacao = PageRequest.of(0, 10, sort);


            List<Pedido> pedidos = pedidoRepository.findByStatus(StatusPedido.ENTREGUE, paginacao);
            model.addAttribute("pedidos", pedidos);
            return "home";
        }
//
//    @GetMapping("/{status}")
//    public String porStatus(@PathVariable("status") String status, Model model) {
//        List<Pedido> pedidos = pedidoRepository.findByStatus(StatusPedido.valueOf(status.toUpperCase()));
//        model.addAttribute("pedidos", pedidos);
//        model.addAttribute("status", status);
//        return "home";
//    }
//
//    @ExceptionHandler(IllegalArgumentException.class)
//    public String onError() {
//        return "redirect:/home";
//    }
    }

