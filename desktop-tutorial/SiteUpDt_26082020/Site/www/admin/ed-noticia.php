<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();
$current = "icon-info-sign";

$title = 'Editar Notícia';
$table = 'noticias';

$cod = $mga->cleanuserinput($_GET['cod']);
$qry = $mga->showRows($table,'','','id = "'.$cod.'"','');

$url = 'ed-noticia.php?cod='.$qry['id'];
$urlocation = 'rel-noticias.php';

$folder = '../files/artigos/'.$qry['id'].'/';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	foreach($_POST as $campo => $valor){
		$coluna[] = $campo;
		$data[] = utf8_decode($valor);
		$$campo = $valor;
	}
		
	$friend = $mga->limpaURL($titulo).'-'.$qry['id'];
		
	array_push($coluna, 'friend');
	array_push($data, $friend);
		
	$result = $mga->update($table,$coluna,$data,'id = "'.$qry['id'].'"')or die(mysql_error());
		
	if($result){
		$imagem = $_FILES['imagem'];
		$titulo_image = $titulo.'-'.$qry['id'];
		
		$image_name = $mga->validaImage($imagem, $titulo_image);
		
		if(!empty($image_name)){
		
			if($mga->uploadImage($imagem['tmp_name'], $image_name, $folder, 'normal', '800', '600')){
				$result = $mga->update($table,array('imagem'),array($image_name),'id = "'.$qry['id'].'"');
			}
			
		}
		
		header("Location: ".$urlocation."?success=1");
	} else {
		header("Location: ".$url."?error=1");
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
		                <li class="active"><a href="<?=$url?>?cod=<?=$qry['id']?>" title="<?=$title?>"><?=$title?></a></li>
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

						<!-- General form elements -->
						<div class="widget row-fluid">

						    <div class="well">
						    
						        <div class="control-group">
	                                <label class="control-label">Título: </label>
	                                <div class="controls">
	                                    <input type="text" class="span12" value="<?=$qry['titulo']?>" name="titulo" />
	                                </div>
	                            </div>
	                            
	                            <div class="control-group">
	                                <label class="control-label">Meta Description: </label>
	                                <div class="controls">
	                                    <textarea name="meta_description" class="span12" maxlength="255" rows="5"><?=$qry['meta_description']?></textarea>
	                                    <span class="help-block">Máximo de 255 caracteres<br>
	                                    Será usado descrições menores, compartilhamentos e meta-description (SEO).</span>
	                                </div>
	                            </div>
	                            
	                            <div class="control-group">
	                                <label class="control-label">Imagem Principal: </label>
	                                <div class="controls">
	                            		<input type="file" name="imagem" class="styled">
	                            		<?php echo is_file($folder.$qry['imagem']) ? '<a href="'.$folder.$qry['imagem'].'" class="lightbox help-block">Imagem Atual</a>' : ''; ?>
	                            		<span class="help-block">Extensões Permitidas: (jpg, jpeg, png, gif)</span>
	                            	</div>
	                            </div>
	                            
	                            <div class="control-group">
	                                <label class="control-label">Ativo:</label>
	                                <div class="controls">
	                                    <select name="ativo" class="styled">
	                                    	<option value="1"<?php if($qry['ativo']=='1'){echo ' selected';} ?>>Sim</option>
	                                    	<option value="0"<?php if($qry['ativo']=='0'){echo ' selected';} ?>>Não</option>
	                                    </select>
	                                </div>
	                            </div>
	                            
	                            <div class="form-actions align-right">
	                            	<button type="submit" class="btn btn-info">Enviar</button>
	                            	<div class="clear"></div>
	                            </div>
	                            
						    </div>
						</div>
						<!-- /general form elements -->

					</fieldset>
					
				</form>

		    </div>
		    <!-- /content wrapper -->

		</div>
		<!-- /content -->

	</div>
	<!-- /content container -->

	<?php include('includes/footer.php'); ?>
	<script>
		$(document).ready(function() {
			$("select#categoria_id").change(function() {
			
				$("#subcategoria_id").html('<option>Carregando Subcategorias...</option>');
				
				ajaxJSON('e', $(this).val(), "select#subcategoria_id");
	
			});
			
			function ajaxJSON(bd, valor, campo){
				$.getJSON("ajax.bd.php",{search: valor, banco: bd}, function(j){
					var options = '';
					for (var i = 0; i < j.length; i++) {
						options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
					}
					
					$(campo).html(options);
				}).complete(function(){
					
				});
			}
			
		});
	</script>
</body>
</html>
