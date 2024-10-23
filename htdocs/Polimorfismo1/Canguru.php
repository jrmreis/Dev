<?php

/**
 * Description of Canguru
 *
 * @author Joel
 */
require_once 'Mamiferos.php';
class Canguru extends Mamiferos{
    //Atributos
    
    //métodos abstratos
    public function locomover() {
        echo "<p>Pulando</p>";
    }

}
