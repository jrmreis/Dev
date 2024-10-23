<?php

/**
 * Description of Professores
 *
 * @author Joel
 */
require_once 'Pessoa.php';
class Professores extends Pessoa {
    //Atributos
    private $especialidade;
    private $salario;
    
    //métodos
    public function receberAum($aum){
        $this->salario += $aum;
    }
    //métodos especiais
    public function getEspecialidade() {
        return $this->especialidade;
    }

    public function getSalario() {
        return $this->salario;
    }

    public function setEspecialidade($especialidade) {
        $this->especialidade = $especialidade;
    }

    public function setSalario($salario) {
        $this->salario = $salario;
    }


}
