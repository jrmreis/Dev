<?php 
include("inc/config.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$email = (isset($_POST['email'])) ? $_POST['email'] : '';
	$senha = (isset($_POST['senha'])) ? $_POST['senha'] : '';
	
	if ($mga->validaUsuario($email, $senha)) {
		header("Location: index.php");
		exit();
	} else {
		$mga->expulsaVisitante('?e=2');
	}
}
?>