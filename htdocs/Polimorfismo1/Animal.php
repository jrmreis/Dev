<?php

/**
 * Description of Animal
 *
 * @author Joel
 */
abstract class Animal { //não pode ser instanciado (não cria objetos)
    //Atributos
    protected $peso;
    protected $idade;
    protected $mebros;
    
    //métodos (abstratos)
    abstract function locomover(); //só pode existir em classes abstratas
    abstract function Alimentar();
    abstract function emitirSom();
    //métodos especiais
    function getPeso() {
        return $this->peso;
    }

    function getIdade() {
        return $this->idade;
    }

    function getMebros() {
        return $this->mebros;
    }

    function setPeso($peso) {
        $this->peso = $peso;
    }

    function setIdade($idade) {
        $this->idade = $idade;
    }

    function setMebros($mebros) {
        $this->mebros = $mebros;
    }


}
