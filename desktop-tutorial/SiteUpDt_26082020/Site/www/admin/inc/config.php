<?php 
date_default_timezone_set('America/Sao_Paulo');
include('define.php');
include('blank.php');
include('class/class.administrador.php');
include('phpthumb/ThumbLib.inc.php');

$mga = new Administrator();

$VARS['ativo'] = array('Não', 'Sim');

if(isset($_GET['success'])){
	switch($_GET['success']){
		
		case '1':
			$msg = "Ação concluída com sucesso!";
			$cmsg = 'success';
			break;
		
	}
}

if(isset($_GET['error'])){
	switch($_GET['error']){
		
		case '1':
			$msg = "Ocorreu um erro ao processar sua ação, verifique os campos e tente novamente!";
			$cmsg = 'error';
			break;
			
		case '2':
			$msg = "Ocorreu um erro ao tentar enviar a imagem para o servidor, tente novamente!<br> Arquivos permitidos (jpg, jpeg, png, gif)";
			$cmsg = 'error';
			break;
		
	}
}

$current = '';
?>