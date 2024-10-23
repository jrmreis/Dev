<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();

$table = $mga->cleanuserinput('artigos');

$qry = $mga->get_fields($table);
$campos = unserialize($qry['serialize']);

$current = $qry['icon'];

$cod = $mga->cleanuserinput($_GET['cod']);
$qrye = $mga->showRows($table,'','','id = "'.$cod.'"','');

$url = 'texto.php?cod='.$qrye['id'];
$urlocation = 'rel-'.$qry['tabela'].'.php';

$title = 'Notícia: '.$qry['titulo'];
$folder = '../files/'.$qry['folder'].'/';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	foreach($_POST as $campo => $valor){
		$coluna[] = $campo;
		$data[] = $valor;
		$$campo = $valor;
	}
	
	$result = $mga->update($table,$coluna,$data, 'id = "'.$qrye['id'].'"')or die(mysql_error());
	
	if ($result) {

		$lastid = $qrye['id'];
		
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
	CKEDITOR.replace('texto',{
		height: '500px'
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
	            
	            <div class="alert alert-block" style="margin-top: 16px;">
	            	<h6>Atenção!</h6>
	            	Para incluir imagens dentro do texto é necessário realizar o upload pelo formulário de upload no final da página e inserir a URL que se encontra na tabela de imagens cadastradas.<br>
	            	Caso queira incluir imagens que se encontrem dentro de outros servidores, copie a URL da imagem e insira dentro do texto.
	            	<strong>Para incluir as imagens, arraste elas até o campo "Drop Files Here".</strong>
	            </div>
	            
	            <form class="form-horizontal" method="post" id="validate" action="<?=$url?>" enctype="multipart/form-data">
					<div class="widget">
	                	<div class="navbar">
	                		<div class="navbar-inner">
	                			<h6><?=$title?></h6>
	                		</div>
	                	</div>
	                
                		<textarea name="texto"><?=$qrye['texto']?></textarea>
                		
                		<div class="form-actions align-right">
                			<a href="javascript:history.back(-1);" class="btn btn-info" style="float:left;">Voltar</a>
	                    	<button type="submit" class="btn btn-info">Enviar</button>
	                    </div>
                	</div>
				</form>
	            
	            <iframe src="frame.php?cod=<?=$qrye['id']?>" style="width: 100%;" height="1000px" frameborder="0"></iframe>

		    </div>
		    <!-- /content wrapper -->

		</div>
		<!-- /content -->

	</div>
	<!-- /content container -->


	<?php include('includes/footer.php'); ?>
</body>
</html>
