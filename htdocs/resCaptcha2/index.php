<?php include("config/config.php"); ?>

<!DOCTYPE html>
<html lang="pt-br">
    
    <head>
        <title>reCaptcha</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div><h1>Formulário Teste</h1></div>
        
        <form id="form1" name="form1" action="controllers/ControllerForm.php" method="post">
            <input type="text" id="nome" name="nome"><br> 
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response"><br>
            <input type="submit"><br>
        </form>
        <script src="https://www.google.com/recaptcha/api.js?render=<?php echo SITE_KEY; ?>"></script>
        <script src="libraries/Javascript.js"></script>
        
       
        
        
        
      <style>
.whatsapp {
    position: fixed;
    top: 82%;
    left: 1%;
    padding: 10px;
    z-index: 10000000;
}
</style>
<div>
    <a href="https://api.whatsapp.com/send?phone=5511997992651" 
       target="_blank">
       <img  class="whatsapp" src="https://images.tcdn.com.br/static_inst/integracao/imagens/whatsapp.png" />
    </a>
</div>

    </body>
</html>

