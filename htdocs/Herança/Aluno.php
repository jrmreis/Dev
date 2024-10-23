<?php

/**
 * Description of Aluno
 *
 * @author Joel
 */
require_once 'Pessoa.php';
class Aluno extends Pessoa{
    //Atributos
    private $matr;
    private $curso;
    
    //métodos
    public function cancelarMatr() {
        echo "<p>Matricula será cancelada!</p>";
    }
    
    //métodos especiais
    public function getMatr() {
        return $this->matr;
    }

    public function getCurso() {
        return $this->curso;
    }

    public function setMatr($matr) {
        $this->matr = $matr;
    }

    public function setCurso($curso) {
        $this->curso = $curso;
    }


}
