<?php
include("../class/classCaptcha.php");

$ObjCaptcha=new Captcha();
$Retorno=$ObjCaptcha->getCaptcha($_POST['g-recaptcha-response']);


//var_dump($Retorno); //teste
if($Retorno->success == true && $Retorno->score > 0.8){

        // Perform you logic here for ex:- save you data to database
        echo '<div class="alert alert-success">
                        <strong>Sucesso!</strong> Sua socilitação será atendida.


<form action="../www/sis.php" method="POST" enctype="multipart/form-data">



                  </div>';
        } else {
        echo '<div class="alert alert-warning">
                          <strong>Erro!</strong> Você não é humano.
                  </div>';
        }

