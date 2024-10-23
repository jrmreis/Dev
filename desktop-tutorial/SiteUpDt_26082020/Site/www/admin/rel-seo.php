<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();

$table = 'seo';
$qry = $mga->get_fields($table);
$campos = unserialize($qry['serialize']);

$current = $qry['icon'];

$title = 'Relatório '.$qry['titulo'];
$folder = '../files/'.$qry['folder'].'/';

$url = 'rel-'.$qry['tabela'].'.php';
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
                                    <th>Página</th>
                                    <th>Título</th>
                                    <th>Descrição</th>
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
                            	?>
                                <tr>
			                        <td align="center"><?=$qryr['id']?></td>
			                        <td><?=$qryr['pagina']?></td>
			                        <td><?=$qryr['titulo']?></td>
			                        <td><?=$qryr['description']?></td>
			                        <td>
		                                <ul class="navbar-icons" style="width:130px;">
		                                    <li><a href="ed.php?t=<?=$qry['tabela']?>&amp;cod=<?=$qryr['id']?>" class="tip" title="Editar"><i class="icon-pencil"></i></a></li>
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