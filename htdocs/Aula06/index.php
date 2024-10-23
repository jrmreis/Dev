<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <h1>Projeto Controle Remoto</h1>
        <?php
            require_once 'ControleRemoto.php';
            $c = new ControleRemoto();
            //$c->ligar();
            $c->abrirMenu();
            
        
        ?>
    </body>
</html>
