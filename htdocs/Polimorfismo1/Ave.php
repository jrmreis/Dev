<?php
/**
 * Description of Ave
 *
 * @author Joel
 */
require_once 'Animal.php';
class Ave extends Animal{
    //Atributos
    private $corPena;
    //métodos abstratos
    
    public function Alimentar() {
        echo "<p>Comendo fritas</p>";
    }

    public function emitirSom() {
        echo "<p>Som de ave</p>";
    }

    public function locomover() {
        echo "<p>Voando</p>";
    }
    //método próprio
    public function fazerNinho() {
        echo "<p>Construiu um ninho</p>";
    }
    //métodos especiais
    function getCorPena() {
        return $this->corPena;
    }

    function setCorPena($corPena) {
        $this->corPena = $corPena;
    }



}
