<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Filha
 *
 * @author Joel
 */
require_once 'Pai.php';
class Filha extends pai{
    
  protected function sobrescrito() {
   echo 'filha';
  }
}
