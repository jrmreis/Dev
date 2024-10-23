<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
        require_once 'Mamiferos.php';
        require_once 'Reptil.php';
        require_once 'Peixe.php';
        require_once 'Ave.php';
        require_once 'Canguru.php';
        require_once 'Cachorro.php';
        require_once 'Tartaruga.php';
        require_once 'GoldFish.php';
        
        $m1 = new Mamiferos();
        $r1 = new Reptil();
        $p1 = new Peixe();
        $a1 = new Ave();
        $c1 = new Canguru();
        $k1 = new Cachorro();
        $t1 = new Tartaruga();
        $g1 = new GoldFish();
        
        $k1->locomover();
        $c1->locomover();
        $r1->locomover();
        $a1->locomover();
        
        ?>
    </body>
</html>
