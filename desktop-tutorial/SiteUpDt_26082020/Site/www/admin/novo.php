<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();

// Tabela que será usada
$table = $mga->cleanuserinput($_GET['t']);

// Pega as informações da página
$qry = $mga->get_fields($table);

// Coloca na array os campos da tabela para adicionar os inputs
$campos = unserialize($qry['serialize']);

// Icone para deixar o menu sempre aberto
$current = $qry['icon'];

$title = 'Novo(a) '.$qry['titulo'];

// Pasta a ser utilizada caso haja imagens
$folder = '../files/'.$qry['folder'].'/';

/*
*	 $url 			= URL atual
*	 $urlocation 	= URL que será jogada após submeter o formulário
*/
$url = 'novo.php?t='.$qry['tabela'].'';
$urlocation = 'rel-'.$qry['tabela'].'.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	foreach($_POST as $campo => $valor){
		if(!in_array($campo, array('senha'))){
			$coluna[] = $campo;
			$data[] = $valor;
		}
		$$campo = $valor;
	}

	if(isset($senha) && !empty($senha)){
		$senha = md5($senha);
		$coluna[] = 'senha';
		$data[] = $senha;
	}
	
	$result = $mga->insert($table,$coluna,$data)or die(mysql_error());
	
	if ($result) {
		$lastid = mysql_insert_id();

		if (strpos($folder,'{$lastid}') !== false) {
			$create = str_replace('{$lastid}', $lastid, $folder);
		    if(!is_dir($create)){
		    	mkdir($create, 0777);
		    	chmod($create, 0777);
		    }
		}

		$folder = str_replace('{$lastid}', $lastid, $folder);

		if(!empty($qry['friend'])){
			$friend = substr($mga->limpaURL($$qry['friend']), 0, 45).'-'.$lastid;
			$mga->update($table,array('friend'),array($friend),'id = "'.$lastid.'"');
		}

		if(isset($_FILES['arquivo']) && is_file($_FILES['arquivo']['tmp_name'])){
			$arquivo = $_FILES['arquivo'];
			$titulo_arquivo = date('Ymdhis').'-'.$lastid;
		
			$arquivo_name = $mga->validaImage($arquivo, $titulo_arquivo, array('pdf', 'doc', 'docx'));

			if(!empty($arquivo_name)){
				if($mga->move_uploaded($arquivo['tmp_name'], $arquivo_name, $folder)){
					$mga->update($table,array('arquivo'),array($arquivo_name),'id = "'.$lastid.'"');
				}
			}

		}

		if(!empty($qry['format_image'])){
			/*
				$format_image[0] = Campo na tabela
				$format_image[1] = Forma de redimensionamento - Normal ou Adaptive
				$format_image[2] = Largura
				$format_image[3] = Altura
			*/
			$format_image = unserialize($qry['format_image']);
			$i=1;
			foreach($format_image as $format_image){
				if(!empty($_FILES[$format_image[0]]) && is_file($_FILES[$format_image[0]]['tmp_name'])){
					$imagem = $_FILES[$format_image[0]];

					if(isset($format_image[4]) && !empty($format_image[4])){
						$titulo_image = substr($$format_image[4], 0, 60).' '.$i.' '.$lastid;
					}else{
						$titulo_image = date('Ymdhis').$i.'-'.$lastid;
					}
					
					$image_name = $mga->validaImage($imagem, $titulo_image);
					
					if(!empty($image_name)){
						if($mga->uploadImage($imagem['tmp_name'], $image_name, $folder, $format_image[1], $format_image[2], $format_image[3])){
							$mga->update($table,array($format_image[0]),array($image_name),'id = "'.$lastid.'"');
						}
					}
				}
				$i++;
			}
		}
		
		header("Location: ".$urlocation."?success=1");
	} else {
		$msg = "Não foi possível cadastrar, tente novamente.";
		$cmsg = 'error';
	}

}


?>
<!DOCTYPE html>
<html lang="pt">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title><?=$title?> | <?=TITLE?></title>
<?php include('includes/header.php'); ?>
<script type="text/javascript" src="ckeditor<?php echo $table == 'service_content' ? '' : '2' ?>/ckeditor.js"></script>
<script type="text/javascript">
$(function(){

<?php
	foreach($campos as $fields){
		if($fields['tipo'] == 'ckeditor'){
?>
CKEDITOR.replace('<?=$fields['campo']?>', {
height: '300px',
});
<?php }} ?>

});
</script>
</head>

<body>
	<?php include('includes/topo.php'); ?>

	<div id="container">

		<?php include('includes/sidebar.php'); ?>

		<!-- Content -->
		<div id="content">

		    <!-- Content wrapper -->
		    <div class="wrapper">

			    <!-- Breadcrumbs line -->
			    <div class="crumbs">
		            <ul id="breadcrumbs" class="breadcrumb"> 
		                <li><a href="<?=URL?>">Dashboard</a></li>
		                <li class="active"><a href="<?=$url?>" title="<?=$title?>"><?=$title?></a></li>
		            </ul>
			    </div>
			    <!-- /breadcrumbs line -->

			     <?php include('includes/actions.php'); ?>
			     
			    <!-- Form validation -->
	            <h5 class="widget-name"><i class="icon-ok"></i><?=$title?></h5>
	            
	             <form class="form-horizontal" method="post" id="validate" action="<?=$url?>" enctype="multipart/form-data">
					<fieldset>
						
						<div class="widget row-fluid">

						    <div class="well">
						    
						    	<?php $mga->foreach_fields($campos, $folder); ?>
	                            
	                            <div class="form-actions align-right">
	                            	<button type="submit" class="btn btn-info">Enviar</button>
	                            	<div class="clear"></div>
	                            </div>

						    </div>
						</div>

					</fieldset>
					
				</form>

				<?php if($table == 'service_content'){ ?>
				<iframe src="upload-frame.php?folder=<?=$folder?>" style="width: 100%;" height="1000px" frameborder="0"></iframe>
				<?php } ?>

		    </div>
		    <!-- /content wrapper -->



		</div>
		<!-- /content -->

	</div>
	<!-- /content container -->

	<?php include('includes/footer.php'); ?>
</body>
</html>
