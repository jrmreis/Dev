<?php

/**
 * Description of Cachorro
 *
 * @author Joel
 */
require_once 'Mamiferos.php';
class Cachorro extends Mamiferos{
    public function emitirSom() {
        echo "<p>Au Au Au!</p>";
    }    
}
