<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pai
 *
 * @author Joel
 */
abstract class Pai {
   
  public function herdado() {
   $this->sobrescrito();
  }
  protected function sobrescrito() {
   echo 'pai';
  }
}




