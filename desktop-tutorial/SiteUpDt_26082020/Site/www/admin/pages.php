<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();
$current = "icon-globe";
$table = 'pages';

$cod = $mga->cleanuserinput($_GET['cod']);
$qry = $mga->showRows($table,'page_id, pagina, GROUP_CONCAT(tipo) as concat_tipo, GROUP_CONCAT(id) as concat_id','','page_id = "'.$cod.'"','group by page_id');

$title = 'Texto: '.$qry['pagina'];

$url = 'pages.php?cod='.$qry['page_id'];
$urlocation = 'pages.php?cod='.$qry['page_id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	
	foreach($_POST['texto'] as $pagina_id => $texto){
		$coluna = array('texto');
		$data = array($texto);
		$result = $mga->update($table,$coluna,$data,'id = "'.$pagina_id.'"')or die(mysql_error());
	}
	
	if($result){
		header("Location: ".$urlocation."&success=1");
	} else {
		header("Location: ".$urlocation."&error=1");
	}

}

$tipos = explode(',', $qry['concat_tipo']);
$ids = explode(',', $qry['concat_id']);
?>
<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="utf-8">
	<title><?=$title?> | <?=TITLE?></title>
	<?php include('includes/header.php'); ?>
	<script type="text/javascript" src="ckeditor2/ckeditor.js"></script>
	<script type="text/javascript">
	$(function(){

		<?php
		$i = 0;
		foreach($tipos as $ckeditor){
			if($ckeditor == 'ckeditor'){
				?>
				CKEDITOR.replace('texto[<?=$ids[$i]?>]', {
					height: '300px',
				});
				<?php }$i++;} ?>

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
								$sqlf = $mga->getRows('pages', '', '', 'page_id = "'.$cod.'"', '');
								while($qryf = mysql_fetch_assoc($sqlf)){
									?>
									<div class="control-group">
										<label class="control-label"><?=$qryf['titulo']?>: </label>
										<div class="controls">
											<?php
											switch ($qryf['tipo']) {
												case 'textarea':
												echo '<textarea name="texto['.$qryf['id'].']" rows="10" class="span12">'.$qryf['texto'].'</textarea>';
												break;

												case 'ckeditor':
												echo '<textarea name="texto['.$qryf['id'].']" rows="10" class="span12">'.$qryf['texto'].'</textarea>';
												break;

												case 'input':
												echo '<input type="text" class="span12" name="texto['.$qryf['id'].']" value="'.$qryf['texto'].'">';
												break;
												
												default:
												echo '<input type="text" class="span12" name="texto['.$qryf['id'].']" value="'.$qryf['texto'].'">';
												break;
											}
											?>
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

					<iframe src="upload-frame.php?cod=<?=$qrye['id']?>" style="width: 100%;" height="1000px" frameborder="0"></iframe>

				</div>
				<!-- /content wrapper -->

			</div>
			<!-- /content -->

		</div>
		<!-- /content container -->

		<?php include('includes/footer.php'); ?>
	</body>
	</html>
