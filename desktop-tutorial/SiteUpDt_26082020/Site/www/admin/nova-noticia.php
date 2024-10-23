<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();
$current = "icon-info-sign";

$title = 'Nova Notícia';
$table = 'noticias';
$folder = '../files/artigos/';

$url = 'nova-noticia.php';
$urlocation = 'texto.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	foreach($_POST as $campo => $valor){
		$coluna[] = $campo;
		$data[] = $valor;
		$$campo = $valor;
	}
	
	$result = $mga->insert($table,$coluna,$data)or die(mysql_error());
	
	if ($result) {
		$lastid = mysql_insert_id();
		
		$friend = $mga->limpaURL($titulo).'-'.$lastid;
		
		$mga->update($table,array('friend'),array($friend),'id = "'.$lastid.'"');
		
		$folder .= $lastid.'/';
		
		$imagem = $_FILES['imagem'];
		$titulo_image = $titulo.'-'.$lastid;
		
		$image_name = $mga->validaImage($imagem, $titulo_image);
		
		if(!empty($image_name)){
		
			if($mga->uploadImage($imagem['tmp_name'], $image_name, $folder, 'normal', '800', '600')){
				$result = $mga->update($table,array('imagem'),array($image_name),'id = "'.$lastid.'"');
				if($result){
					header("Location: ".$urlocation."?cod=".$lastid."&success=1");
				}
			}
			
		}
		
		header("Location: ".$urlocation."?cod=".$lastid."&success=1");
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
	            
	            <?php if (!empty($msg)) { ?>
	            <div class="alert alert-<?=$cmsg?>" style="margin-top: 16px;">
	            	<button type="button" class="close" data-dismiss="alert">×</button>
	            	<?=$msg?>
	            </div>
	            <?php } ?>
	            
	             <form class="form-horizontal" method="post" id="validate" action="<?=$url?>" enctype="multipart/form-data">
					<fieldset>
					
						<div class="alert alert-block" style="margin-top: 16px;">
	                        <h6>Importante!</h6>
	                        <strong>1&ordm; Etapa</strong> - Informações principais do artigo.<br>
	                        <strong>2&ordm; Etapa</strong> - Inserção de texto e fotos para o artigo.<br>
	                    </div>
						
						<div class="widget row-fluid">

						    <div class="well">
						    
						        <div class="control-group">
	                                <label class="control-label">Título: </label>
	                                <div class="controls">
	                                    <input type="text" class="span12" name="titulo" />
	                                </div>
	                            </div>
	                            
	                            <div class="control-group">
	                                <label class="control-label">Meta Description: </label>
	                                <div class="controls">
	                                    <textarea name="meta_description" class="span12" maxlength="255" rows="5"></textarea>
	                                    <span class="help-block">Máximo de 255 caracteres<br>
	                                    Será usado descrições menores, compartilhamentos e meta-description (SEO).</span>
	                                </div>
	                            </div>
	                            
	                            <div class="control-group">
	                                <label class="control-label">Imagem Principal: </label>
	                                <div class="controls">
	                            		<input type="file" name="imagem" class="styled">
	                            		<span class="help-block">Extensões Permitidas: (jpg, jpeg, png, gif)</span>
	                            	</div>
	                            </div>
	                            
	                            <div class="form-actions align-right">
	                            	<button type="submit" class="btn btn-info">Enviar</button>
	                            	<div class="clear"></div>
	                            </div>

						    </div>
						</div>

					</fieldset>
					
				</form>

		    </div>
		    <!-- /content wrapper -->

		</div>
		<!-- /content -->

	</div>
	<!-- /content container -->

	<?php include('includes/footer.php'); ?>
</body>
</html>
