<?php

/**
 * Description of Peixe
 *
 * @author Joel
 */
require_once 'Animal.php';
class Peixe extends Animal {
    //Atributos
    private $corEscama;
    //métodos abstratos (animal)
    public function Alimentar() {
        echo "<p>Comendo fitoplanctons</p>";
    }

    public function emitirSom() {
        echo "<p>Peixe não emite som</p>";
    }

    public function locomover() {
        echo "<p>Nadando</p>";
    }
    //método próprio
    public function soltarBolha() {
        echo "<p>Soltou uma Bolha</p>";
    }
    //Métodos especiais
    function getCorEscama() {
        return $this->corEscama;
    }

    function setCorEscama($corEscama) {
        $this->corEscama = $corEscama;
    }



}
