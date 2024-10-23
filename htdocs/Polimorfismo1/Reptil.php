<?php
/**
 * Description of Reptil
 *
 * @author Joel
 */
require_once 'Animal.php';
class Reptil extends Animal{
    //Atributos
    private $corEscama;
    
    //métodos abstratos (animal)
    public function Alimentar() {
        echo "<p>Comendo vegetais</p>";
    }

    public function emitirSom() {
        echo "<p>Som de Réptil</p>";
    }

    public function locomover() {
        echo "<p>Rastejando</p>";
    }
    //métodos especiais
    function getCorEscama() {
        return $this->corEscama;
    }

    function setCorEscama($corEscama) {
        $this->corEscama = $corEscama;
    }



}
