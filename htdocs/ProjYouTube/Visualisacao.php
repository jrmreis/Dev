<?php


/**
 * Description of Visualisacao
 *
 * @author Joel
 */
require_once 'Video.php';
require_once 'Gafanhoto.php';
class Visualisacao {
    //Atributos
    private $espectador;
    private $filme;
    //métodos próprios
    function avaliar() {
        $this->filme->setAvaliacao(5);
    }
    function avaliarNota($nota){
        $this->filme->setAvaliacao($nota);
    }
    function avaliarPorc($porc){
        $nova = 0;
        if ($porc <= 20) {
            $nova = 3;
        }elseif ($porc <= 50){
            $nova = 5;
        }elseif ($porc <= 90) {
            $nova = 8;
        }else{
            $nova = 10;
        }
        $this->filme->setAvaliacao($nova);
    }   
    //método construtor
    public function __construct($espectador, $filme) {
        $this->espectador = $espectador;
        $this->filme = $filme;
        $this->filme->setViews($this->filme->getViews() + 1);
        $this->espectador->setTotAssistido($this->espectador->getTotAssistido() + 1);
    }
    //método getters e setters
    public function getEspectador() {
        return $this->espectador;
    }

    public function getFilme() {
        return $this->filme;
    }

    public function setEspectador($espectador) {
        $this->espectador = $espectador;
    }

    public function setFilme($filme) {
        $this->filme = $filme;
    }



}
