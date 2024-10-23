<?php
/**
 * Description of Aluno
 *
 * @author Joel
 */
require_once 'Pessoa.php';
class Aluno extends Pessoa {
    //Atributos
    private $matricula;
    private $curso;
    
    //métodos
    public function pagarMensalidade(){
        echo "<p>Pagando mensalidade do aluno $this->nome</p>";
    }
    
    //métodos especiais
    function getMatricula() {
        return $this->matricula;
    }

    function getCurso() {
        return $this->curso;
    }

    function setMatricula($matricula) {
        $this->matricula = $matricula;
    }

    function setCurso($curso) {
        $this->curso = $curso;
    }


}
