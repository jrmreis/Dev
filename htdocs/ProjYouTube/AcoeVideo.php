<?php

/**
 *
 * @author Joel
 */
interface AcoeVideo {
    //métodos abstratos
    public function play(); //não colocar abstract function, o PHP já sabe que é! e vai dar erro!
    public function pause();
    public function like();
    
            
}
