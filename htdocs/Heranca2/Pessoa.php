<?php

/**
 * Description of Pessoa
 *
 * @author Joel
 */
abstract class Pessoa {
    //Atributos
    Protected $nome;
    Protected $idade;
    Protected $sexo;
    
    //Métodos
    public final function  fazerAniver() {
        $this->idade++;
    }
    
    //métodos especiais
    function getNome() {
        return $this->nome;
    }

    function getIdade() {
        return $this->idade;
    }

    function getSexo() {
        return $this->sexo;
    }

    function setNome($nome) {
        $this->nome = $nome;
    }

    function setIdade($idade) {
        $this->idade = $idade;
    }

    function setSexo($sexo) {
        $this->sexo = $sexo;
    }


}
