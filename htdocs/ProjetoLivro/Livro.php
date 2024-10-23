<?php

/**
 * Description of Livro
 *
 * @author Joel
 */
require_once 'Pessoa.php';
require_once 'Publicacao.php';
class Livro implements Publicacao{
    //Atributos
    private $titulo;
    private $autor;
    private $totPaginas;
    private $pagAtual;
    private $aberto;
    private $leitor;
    
    //Métodos
    function detalhes(){
        echo "<hr> Livro " . $this->titulo . " escrito por " . $this->autor;  //hr -> linha horizontal
        echo "<br> Páginas: " . $this->totPaginas . " página atual: " . $this->pagAtual;
        echo "<br> Sendo lido por " . $this->leitor->getNome();
    }
    //Métodos Especiais
    function __construct($titulo, $autor, $totPaginas, $leitor) {
        $this->titulo = $titulo;
        $this->autor = $autor;
        $this->totPaginas = $totPaginas;
        $this->aberto = false;
        $this->setPagAtual(0);
        $this->leitor = $leitor;
    }

    function getTitulo() {
        return $this->titulo;
    }

    function getAutor() {
        return $this->autor;
    }

    function getTotPaginas() {
        return $this->totPaginas;
    }

    function getPagAtual() {
        return $this->pagAtual;
    }

    function getAberto() {
        return $this->aberto;
    }

    function getLeitor() {
        return $this->leitor;
    }

    function setTitulo($titulo) {
        $this->titulo = $titulo;
    }

    function setAutor($autor) {
        $this->autor = $autor;
    }

    function setTotPaginas($totPaginas) {
        $this->totPaginas = $totPaginas;
    }

    function setPagAtual($pagAtual) {
        $this->pagAtual = $pagAtual;
    }

    function setAberto($aberto) {
        $this->aberto = $aberto;
    }

    function setLeitor($leitor) {
        $this->leitor = $leitor;
    }
//Implementação das funções (métodos) abstradas
    public function abrir() {
        $this->aberto = true;
    }

    public function avançarPag() {
        $this->pagAtual++;
    }

    public function fechar() {
        $this->aberto = false;
    }

    public function folhear($p) {
        if($p>$this->totPaginas){
            $this->pagAtual = 0;
        } else {
            $this->pagAtual = $p;
        }
    }

    public function voltarPag() {
         $this->pagAtual--;
    }

}
