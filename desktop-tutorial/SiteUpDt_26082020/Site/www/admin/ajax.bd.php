<?php 
include('inc/config.php');
$mga->protegePagina();

$search = $_GET['search'];
$banco = $_GET['banco'];

if($banco=='e'){

	switch($banco){
		case 'e':
			$table = 'subcategorias';
			$field = 'categoria_id';
			break;
	}

	$sql = $mga->getRows($table,'id, titulo','',$field.' = "'.$search.'" and ativo = "1"','order by titulo');
	$num = mysql_num_rows($sql);
	
	if($num > 0){

		$arr[] = array(
						"optionDisplay" => '',
						"optionValue" => ''
						);
	
		while($qry=mysql_fetch_array($sql)){
		
			$arr[] = array(
						"optionDisplay" => ($qry['titulo']),
						"optionValue" => ($qry['id'])
						);
						
		}

	}else{
	
		$arr[] = array(
						"optionDisplay" => '',
						"optionValue" => ''
						);
		
	}

	$json = json_encode($arr);
	echo $json;

}

?>