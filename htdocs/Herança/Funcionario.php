<?php

/**
 * Description of Funcionario
 *
 * @author Joel
 */
require_once 'Pessoa.php';
class Funcionario extends Pessoa{
    //Atributos
    private $setor;
    private $trabalhando;
    
    //métodos
    public function mudarTrabalho() {
        $this->trabalhando = !$this->trabalhando;
    }
    //métodos especiais
    public function getSetor() {
        return $this->setor;
    }

    public function getTrabalhando() {
        return $this->trabalhando;
    }

    public function setSetor($setor) {
        $this->setor = $setor;
    }

    public function setTrabalhando($trabalhando) {
        $this->trabalhando = $trabalhando;
    }


}
