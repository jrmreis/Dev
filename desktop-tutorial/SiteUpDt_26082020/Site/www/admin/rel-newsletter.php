<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();
$current = "icon-signal";

$title = 'Relatório de Newsletters';
$table = 'newsletters';
#$folder = '../files/artigos/';

$url = 'rel-newsletters.php';

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
	header("Location: ".$url."?success=1");
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
                                    <th>Data de Contato</th>                                   
                                    <th>Email</th>                                    
                                    <th class="actions-column">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            	<?php 
                            		$sql = $mga->getRows($table,
                            		'*, date_format(data_contato, "%d/%m/%Y %T")as dt_contato',
                            		'',
                            		'',
                            		'')or die(mysql_error());
                            		while($qry=mysql_fetch_array($sql)){
                            	?>
                                <tr>
			                        <td align="center"><?=$qry['id']?></td>
			                        <td><?=$qry['dt_contato']?></td>			                        
			                        <td><?=$qry['email']?></td>			                        
			                        <td>
		                                <ul class="navbar-icons">		                                	
		                                    <li><a href="?excluir=<?=$qry['id']?>" class="tip confirm" data-confirm="Deseja excluir o contato código <?=$qry['id']?>?" title="Excluir"><i class="icon-remove"></i></a></li>
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
