<?php



  if ($response != null && $response->success) {
    echo "Hi " . $_POST["name"] . " (" . $_POST["email"] . "), thanks for submitting the form!";
  } else {


	require_once('system/config.php');
	
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		foreach($_POST as $campo => $valor){
			$$campo = $valor;
		}
	}else{
		header("Location: ".URL);
		exit();
	}
	
	switch($acao){
			
		case 'contato':
			$cad = $sistema->grava_contato();
			if($cad===true){
				$sistema->aledir('Seu contato foi enviado com sucesso!', URL);
				exit();
			}else{
				$retorno = URL.'contato/?e=1';
			}
			break;

		case 'orcamento':
			$cad = $sistema->grava_orcamento();
			if($cad===true){
				$sistema->aledir('Seu orçamento foi enviado com sucesso!', URL);
				exit();
			}else{
				$retorno = URL.'orcamento/?e=1';
			}
			break;

		case 'newsletter':
			$cad = $sistema->grava_newsletter();
			if($cad===true){
				$sistema->aledir('Seu email foi cadastrado com sucesso em nossa base de dados!', URL);
				exit();
			}else{
				$retorno = URL.'?e=1';
			}
			break;
		
	}
	
	header("Location: ".$retorno);
	exit();
	}

?>