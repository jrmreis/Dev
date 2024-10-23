<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();

$table = $mga->cleanuserinput($_GET['t']);
$qry = $mga->get_fields($table);
$campos = unserialize($qry['serialize']);

$current = $qry['icon'];

$title = 'Relatório '.$qry['titulo'];
$folder = '../files/'.$qry['folder'].'/';

$url = 'rel.php?t='.$qry['tabela'].'';

if(isset($_GET['excluir'])){
	$excluir = $mga->cleanuserinput($_GET['excluir']);
	$result = $mga->delete($table,'id = "'.$excluir.'"');
	if(isset($_GET['ft'])){
		$ft = $mga->cleanuserinput($_GET['ft']);
		$fold = str_replace('{$lastid}', $excluir, $folder);
		if(is_file($fold.$ft)){
			unlink($fold.$ft);
		}
	}
	header("Location: ".$url."&success=1");
	exit();
}

if(isset($_GET['desativar'])){
	$result = $mga->update($table,array('ativo'), array('0'), 'id = "'.$_GET['desativar'].'"');
	header("Location: ".$url."&success=1");
	exit();
}

if(isset($_GET['ativar'])){
	$result = $mga->update($table,array('ativo'), array('1'), 'id = "'.$_GET['ativar'].'"');
	header("Location: ".$url."&success=1");
	exit();
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
				
				<h5 class="widget-name"><i class="icon-ok"></i><?=$title?></h5>
				
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
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Cidade</th>
                                    <th>Imagem</th>
                                    <th>Destaque</th>
                                    <th>Ativo</th>
                                    <th class="actions-column">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            	<?php 
                            		$sqlr = $mga->getRows($table,
                            		'',
                            		'',
                            		'',
                            		'')or die(mysql_error());
                            		while($qryr=mysql_fetch_array($sqlr)){
	                            		$arquivo = is_file($folder.$qryr['imagem']) ? '<a href="'.$folder.$qryr['imagem'].'" class="lightbox">Visualizar Imagem</a>' : '';
                            	?>
                                <tr>
			                        <td align="center"><?=$qryr['id']?></td>
			                        <td><?=$qryr['titulo']?></td>
			                        <td><?=$qryr['cidade']?></td>
			                        <td><?=$arquivo?></td>
			                        <td><?=$VARS['ativo'][$qryr['destaque']]?></td>
			                        <td><?=$VARS['ativo'][$qryr['ativo']]?></td>
			                        <td>
		                                <ul class="navbar-icons" style="width:130px;">
		                                    <li><a href="ed-<?=$qry['tabela']?>.php?cod=<?=$qryr['id']?>" class="tip" title="Editar"><i class="icon-pencil"></i></a></li>
		                                    <?php 
		                                    	if($qryr['ativo'] == '0'){
		                                    ?>
		                                    <li><a href="?ativar=<?=$qryr['id']?>" class="tip confirm" data-confirm="Deseja ativar o ID <?=$qryr['id']?>?" title="Ativar"><i class="icon-lock"></i></a></li>
		                                    <?php }else{ ?>
			                                <li><a href="?desativar=<?=$qryr['id']?>" class="tip confirm" data-confirm="Deseja desativar o ID <?=$qryr['id']?>?" title="Desativar"><i class="icon-unlock"></i></a></li>
		                                    <?php } ?>
		                                    <li><a href="?excluir=<?=$qryr['id']?>" class="tip confirm" data-confirm="Deseja excluir o ID <?=$qryr['id']?>?" title="Excluir"><i class="icon-remove"></i></a></li>
		                                </ul>
			                        </td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>

		    </div>
		    <!-- /content wrapper -->

		</div>
		<!-- /content -->

	</div>
	<!-- /content container -->

	<?php include('includes/footer.php'); ?>
</body>
</html>