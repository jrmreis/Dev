<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();
$current = "icon-camera";
$table = 'images';

$cod = $mga->cleanuserinput($_GET['cod']);
$qry = $mga->showRows($table,'page_id, pagina, GROUP_CONCAT(id) as concat_id','','page_id = "'.$cod.'"','group by page_id');

$title = 'Imagens: '.$qry['pagina'];

$url = 'page-image.php?cod='.$qry['page_id'];
$urlocation = 'page-image.php?cod='.$qry['page_id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$imagem = $_FILES['imagem'];

	foreach($imagem['tmp_name'] as $id => $tmp_name){
		if($imagem['error'][$id] == 0){
			$qryf = $mga->showRows($table,'','','id = "'.$id.'"','limit 1');
			$folder = '../files/'.$qryf['folder'].'/';
			
			/*
				$format_image[0] = Campo na tabela
				$format_image[1] = Forma de redimensionamento - Normal ou Adaptive
				$format_image[2] = Largura
				$format_image[3] = Altura
			*/
			$format_image = unserialize($qryf['format_image']);

			if(is_file($tmp_name)){
				$titulo_image = $mga->limpaURL(substr($qryf['titulo'], 0, 60)).'-'.$id;

				$ext = array_reverse(explode('.',$imagem['name'][$id]));
				if(in_array(strtolower($ext[0]), array('jpg', 'jpeg', 'png', 'gif'))){
					$titulo_image = $titulo_image.'.'.$ext[0];
					if($mga->uploadImage($imagem['tmp_name'][$id], $titulo_image, $folder, $format_image[0][1], $format_image[0][2], $format_image[0][3])){
						$mga->update($table,array('imagem'),array($titulo_image),'id = "'.$id.'"');
					}
				}

			}
		}

	}
		
	header("Location: ".$urlocation."&success=1");

}

$ids = explode(',', $qry['concat_id']);
?>
<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
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
	            
	             <form class="form-horizontal" method="post" id="validate" action="<?=$url?>" enctype="multipart/form-data">
					<fieldset>

						<!-- General form elements -->
						<div class="widget row-fluid">

						    <div class="well">
	                            
	                            <?php 
	                            	$sqlf = $mga->getRows('images', '', '', 'page_id = "'.$cod.'"', '');
	                            	while($qryf = mysql_fetch_assoc($sqlf)){
	                            		$picf = '../files/'.$qryf['folder'].'/'.$qryf['imagem'];
	                            ?>
	                            <div class="control-group">
	                                <label class="control-label"><?=$qryf['titulo']?>: </label>
	                                <div class="controls">
	                                	<input type="file" name="imagem[<?=$qryf['id']?>]" class="styled">
	                                    <?php if(is_file($picf)){ ?><span class="help-block"><a href="<?=$picf?>" class="lightbox">Visualizar Imagem</a></span><?php } ?>
	                                    <span class="help-block">Extenções Permitidas: .jpg, .jpeg, .gif, .png<br>Tamanho Ideal: <?=$qryf['help']?> px</span>
	                                </div>
	                            </div>
	                            <?php } ?>
	                            
	                            <div class="form-actions align-right">
	                            	<a href="javascript:history.back(-1);" class="btn btn-info pull-left">&laquo; Voltar</a>
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
</body>
</html>
