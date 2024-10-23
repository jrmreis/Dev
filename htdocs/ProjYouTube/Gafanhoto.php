<?php

/**
 * Description of Gafanhoto
 *
 * @author Joel
 */
require_once 'Pessoa.php';
class Gafanhoto extends Pessoa {
    //Atributos
    private $login;
    private $totAssistido;
    //método construtor
    public function __construct($nome,$idade, $sexo, $login) {
        parent::__construct($nome, $idade, $sexo);
        $this->login = $login;
        $this->totAssistido = 0;
    }

        //métodos próprios
    public function viuMaisUm(){
        $this->totAssistido++;
    }
    //métodos abstratos - implementação
    protected function ganharExp($n) {
        $this->experiencia++;
    }
    //Getters e Setters
    public function getLogin() {
        return $this->login;
    }

    public function getTotAssistido() {
        return $this->totAssistido;
    }

    public function setLogin($login) {
        $this->login = $login;
    }

    public function setTotAssistido($totAssistido) {
        $this->totAssistido = $totAssistido;
    }



}
