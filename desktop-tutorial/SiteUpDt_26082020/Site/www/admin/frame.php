<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();

$table = $mga->cleanuserinput('artigos');

$qry = $mga->get_fields($table);
$campos = unserialize($qry['serialize']);

$current = $qry['icon'];

$cod = $mga->cleanuserinput($_GET['cod']);
$qrye = $mga->showRows($table,'','','id = "'.$cod.'"','');

$url = 'frame.php?cod='.$qrye['id'];
$urlocation = 'frame.php?cod='.$qrye['id'];

$title = 'Galeria de '.$qry['titulo'];
$folder = '../files/'.$qry['folder'].'/';
$folder = str_replace('{$lastid}', $qrye['id'], $folder);

if(isset($_GET['ft'])){
	$ft = $folder.$_GET['ft'];
	if(is_file($ft)){
		unlink($ft);
		header("Location: ".$url);
		exit();
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

<body style="background: none;">

	<div id="container">

		<!-- Content -->
		<div id="content">

		    <!-- Content wrapper -->
		    <div class="wrapper">
	            
	            <!-- Multiple file uploader -->
                <div class="widget">
					<div class="navbar"><div class="navbar-inner"><h6><?=$title?></h6></div></div>
					
                    <div id="file-uploader2" class="well">Seu navegador não tem suporte ao HTML4.</div>
                </div>
                <!-- /multiple file uploader -->
                <h5 class="widget-name"><i class="icon-th"></i><?=$title?></h5>

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
                            		if(is_dir($folder)){
                            		$scan = scandir($folder);
                            		foreach($scan as $arquivo){
                            			if(!in_array($arquivo, array('.', '..', $qrye['imagem']))){
                            	?>
                                <tr>
			                        <td><a href="<?=$folder?><?=$arquivo?>" class="lightbox"><img src="<?=$folder?><?=$arquivo?>" style="height:50px" alt=""></a></td>
			                        <td><?=URL2?>files/artigos/<?=$qrye['id']?>/<?=$arquivo?></td>
			                        <td>
		                                <ul class="navbar-icons">
		                                    <li><a href="?cod=<?=$qry['id']?>&amp;ft=<?=$arquivo?>" class="tip confirm" data-confirm="Deseja excluir a imagem <?=$arquivo?>?" title="Excluir"><i class="icon-remove"></i></a></li>
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
</body>
</html>
