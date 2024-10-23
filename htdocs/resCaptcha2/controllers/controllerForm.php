<?php
include("../class/classCaptcha.php");

$ObjCaptcha=new Captcha();
$Retorno=$ObjCaptcha->getCaptcha($_POST['g-recaptcha-response']); 

//var_dump($Retorno); //teste
if($Retorno->success == true && $Retorno->score > 0.8){

        // Perform you logic here for ex:- save you data to database
      //$nome = $_POST['nome'];
  //$email= $_POST['email'];
  //$mensagem= $_POST['mensagem'];
  //$to = "contato@updatedeng.com.br";
  //$assunto = "Mensagem de ".$email.com
  //mail($to,$assunto,$mensagem);
        echo '<div class="alert alert-success">
                        <strong>Sucesso!</strong> Sua socilitação será atendida.
                  </div>';
        } else {
        echo '<div class="alert alert-warning">
                          <strong>Erro!</strong> Você não é humano.
                  </div>';
        }
?>
<html> 
    <h5><a href="../">Voltar </a></h5>
</html>