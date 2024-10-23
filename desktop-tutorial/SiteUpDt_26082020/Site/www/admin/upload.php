<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();
$current = "icon-upload";

$title = 'Upload de Imagens';

$url = 'upload.php';
$urlocation = 'upload.php';

$folder = '../files/pages/';

if(isset($_GET['ft'])){
	$ft = $folder.$_GET['ft'];
	if(is_file($ft)){
		unlink($ft);
	}
	header("Location: upload.php");
}
?>
<!DOCTYPE html>
<html lang="pt">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title><?=$title?> | <?=TITLE?></title>
<?php include('includes/header.php'); ?>
<script>
$(function() {

	$("#file-uploader2").pluploadQueue({
		runtimes : 'html5,html4',
		url : 'php/upload.php?folder=<?=$folder?>',
		max_file_size : '10mb',
		resize : {width : 800, quality : 80},
		unique_names : true,
		filters : [
			{title : "Image files", extensions : "jpg,gif,png"}
		]
	});
	
	$("#file-uploader2").pluploadQueue().bind("UploadComplete",function(uploader, file, response){
		location.reload();
	});

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
	            
	            <?php if ($_SERVER['REQUEST_METHOD'] == 'POST' || !empty($cmsg)) { ?>
	            <div class="alert alert-<?=$cmsg?>" style="margin-top: 16px;">
	            	<button type="button" class="close" data-dismiss="alert">×</button>
	            	<?=$msg?>
	            </div>
	            <?php } ?>
	            
	            <div class="alert alert-block" style="margin-top: 16px;">
	            	<h6>Atenção!</h6>
	            	Para incluir imagens dentro do texto é necessário realizar o upload pelo formulário de upload no final da página e inserir a URL que se encontra na tabela de imagens cadastradas.<br>
	            	Caso queira incluir imagens que se encontrem dentro de outros servidores, copie a URL da imagem e insira dentro do texto.
	            	<strong>Para incluir as imagens, arraste elas até o campo "Drop Files Here".</strong>
	            </div>
	            
	            <div class="widget">
					<div class="navbar"><div class="navbar-inner"><h6><?=$title?></h6></div></div>
					
                    <div id="file-uploader2" class="well">Seu navegador não tem suporte ao HTML4.</div>
                </div>
	            
	            <!-- Media datatable -->
                <div class="widget">
                	<div class="navbar">
                    	<div class="navbar-inner">
                        	<h6><?=$title?></h6>
                        </div>
                    </div>
                    <div class="table-overflow">
                        <table class="table table-striped table-bordered table-checks rel-table">
                            <thead>
                                <tr>
                                    <th width="10%">Imagem</th>
                                    <th>URL</th>
                                    <th class="actions-column">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            	<?php
                            		$folder = '../files/pages/';
                            		if(is_dir($folder)){
                            		$scan = scandir($folder);
                            		foreach($scan as $arquivo){
                            			if($arquivo != '.' && $arquivo != '..'){
                            	?>
                                <tr>
			                        <td class="align-center"><a href="<?=$folder?><?=$arquivo?>" class="lightbox"><img src="<?=$folder?><?=$arquivo?>" style="height:50px;" alt=""></a></td>
			                        <td><?=URL2?>files/pages/<?=$arquivo?></td>
			                        <td>
		                                <ul class="navbar-icons">
		                                    <li><a href="<?=$url?>?ft=<?=$arquivo?>" class="tip confirm" data-confirm="Deseja excluir a imagem? Caso ela esteja sendo usada em alguma página a mesma deverá ser removida para evitar conflitos." title="Excluir"><i class="icon-remove"></i></a></li>
		                                </ul>
			                        </td>
                                </tr>
                                <?php }}} ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /media datatable -->

		    </div>
		    <!-- /content wrapper -->

		</div>
		<!-- /content -->

	</div>
	<!-- /content container -->
</body>
</html>
