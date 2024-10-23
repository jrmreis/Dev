<?php
/**
 * Description of Mamiferos
 *
 * @author Joel
 */
require_once 'Animal.php';
class Mamiferos extends Animal {
    //Atributos
    private $corPelo;
    //métotos (abstratos implementados automaticamente netbeans, acionando a lâmpada)
    
    public function emitirSom() {
        echo "<p>Som de Mamífero</p>";
    }
    public function Alimentar() {
        echo "<p>Mamando</p>";
    }

    public function locomover() {
        echo "<p>Correndo</p>";
    }
    //métodos especiais
    function getCorPelo() {
        return $this->corPelo;
    }

    function setCorPelo($corPelo) {
        $this->corPelo = $corPelo;
    }



}
