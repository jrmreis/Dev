<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();

$table = 'faq';
$qry = $mga->get_fields($table);
$campos = unserialize($qry['serialize']);

$current = $qry['icon'];

$cod = $mga->cleanuserinput($_GET['cod']);
$qrye = $mga->showRows($table,'','','id = "'.$cod.'"','');

$url = 'ed-'.$qry['tabela'].'.php?cod='.$qrye['id'];
$urlocation = 'rel-'.$qry['tabela'].'.php';

$title = 'Editar '.$qry['titulo'];
$folder = '../files/'.$qry['folder'].'/';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	foreach($_POST as $campo => $valor){
		$coluna[] = $campo;
		$data[] = $valor;
		$$campo = $valor;
	}
	
	$result = $mga->update($table,$coluna,$data, 'id = "'.$qrye['id'].'"')or die(mysql_error());
	
	if ($result) {
		$imagem = $_FILES['imagem'];
		$titulo_image = $titulo.'-'.$qrye['id'];
		
		$image_name = $mga->validaImage($imagem, $titulo_image);
		
		if(!empty($image_name)){
		
			if($mga->uploadImage($imagem['tmp_name'], $image_name, $folder, 'adaptive', '400', '400')){
				$result = $mga->update($table,array('imagem'),array($image_name),'id = "'.$qrye['id'].'"');
				if($result){
					header("Location: ".$urlocation."?success=1");
				}
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
<script type="text/javascript" src="ckeditor2/ckeditor.js"></script>
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
	            
	            <?php if (!empty($msg)) { ?>
	            <div class="alert alert-<?=$cmsg?>" style="margin-top: 16px;">
	            	<button type="button" class="close" data-dismiss="alert">×</button>
	            	<?=$msg?>
	            </div>
	            <?php } ?>
	            
	             <form class="form-horizontal" method="post" id="validate" action="<?=$url?>" enctype="multipart/form-data">
					<fieldset>
						
						<div class="widget row-fluid">

						    <div class="well">
						    
						        <?php $mga->foreach_fields($campos, $folder, true, $qrye); ?>
	                            
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
