<?php
/**
 * Description of Bolsista
 *
 * @author Joel
 */
require_once 'Aluno.php';
class Bolsista extends Aluno{
    //Atribitos
    private $bolsa;
    
    //métodos
    public function renovaBolsa(){
        echo "<p>Bolsa renovada</p>";
    }
    public function pagarMensalidade(){
        echo "<p>$this->nome  é bolsista e paga com desconto $this->bolsa</p>";
    }
    
    
    //métodos especiais
    function getBolsa() {
        return $this->bolsa;
    }

    function setBolsa($bolsa) {
        $this->bolsa = $bolsa;
    }


}
