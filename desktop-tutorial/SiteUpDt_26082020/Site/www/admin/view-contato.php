<?php include('inc/config.php'); ?>
<?php
$mga->protegePagina();
$current = 'icon-signal';

$title = 'Contato';
$table = 'contatos';

$cod = $mga->cleanuserinput($_GET['cod']);
$qry = $mga->showRows($table,
'*, date_format(data_contato, "%d/%m/%Y %T")as dt_contato',
'',
'id = "'.$cod.'"',
'limit 1')or die(mysql_error());

$url = 'view-contato.php?cod='.$qry['id'];
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
	            
	            <form class="form-horizontal" method="post" id="validate" action="<?=$url?>" enctype="multipart/form-data">
		            <div class="widget">
	                    <div class="row-fluid">
	                    
	                    	<div class="span12">
			                	<div class="navbar"><div class="navbar-inner"><h6>Cálculo de Frete N&ordm; <?=$qry['id']?></h6></div></div>
			                    <div class="table-overflow">
			                        <table class="table table-bordered">
			                            <tbody>
			                            	<tr>
			                                    <td width="20%" class="bg-even"><strong>Código:</strong></td>
			                                    <td width="30%"><?=$qry['id']?></td>
			                                    <td width="20%" class="bg-even"><strong>Data do Contato:</strong></td>
			                                    <td width="30%"><?=$qry['dt_contato']?></td>
			                                </tr>
			                                <tr>
				                                <td class="bg-even"><strong>Tipo:</strong></td>
			                                    <td><?=$qry['tipo']?></td>
			                                    <td class="bg-even"><strong>Modo:</strong></td>
			                                    <td><?=$qry['modo']?></td>
			                                </tr>
			                                <tr>
			                                    <td class="bg-even"><strong>CNPJ:</strong></td>
			                                    <td><?=$qry['cnpj']?></td>
			                                    <td class="bg-even"><strong>Razão Social:</strong></td>
			                                    <td><?=$qry['razao_social']?></td>
			                                </tr>
			                                <tr>
			                                    <td class="bg-even"><strong>Telefone:</strong></td>
			                                    <td><?=$qry['telefone']?></td>
			                                    <td class="bg-even"><strong>Email:</strong></td>
			                                    <td><?=$qry['email']?></td>
			                                </tr>
			                                <tr>
			                                    <td class="bg-even"><strong>Endereço:</strong></td>
			                                    <td><?=$qry['endereco']?></td>
			                                    <td class="bg-even"><strong>Contato:</strong></td>
			                                    <td><?=$qry['contato']?></td>
			                                </tr>
			                                <tr>
			                                    <td class="bg-even"><strong>Mercadoria:</strong></td>
			                                    <td><?=$qry['mercadoria']?></td>
			                                    <td class="bg-even"><strong>Volume/Cubagem:</strong></td>
			                                    <td><?=$qry['volume']?></td>
			                                </tr>
			                                <tr>
			                                    <td class="bg-even"><strong>Peso:</strong></td>
			                                    <td><?=$qry['peso']?></td>
			                                    <td class="bg-even"><strong>Destino:</strong></td>
			                                    <td><?=$qry['destino']?></td>
			                                </tr>
			                                <tr>
			                                    <td class="bg-even"><strong>Origem:</strong></td>
			                                    <td><?=$qry['origem']?></td>
			                                    <td class="bg-even"><strong>Incoterms:</strong></td>
			                                    <td><?=$qry['incoterms']?></td>
			                                </tr>
			                            </tbody>
			                        </table>
			                    </div>
	                    	</div>
	                    	
	                    </div>
	                </div>
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
