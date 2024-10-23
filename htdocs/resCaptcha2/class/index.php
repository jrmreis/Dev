<?php
include('inc/config.php');
include('config/config.php');
$mga->protegePagina();
?>
<!DOCTYPE html>
<html lang="pt">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta http-equiv="refresh" content="30;url=logout.php" /> <!--tempo de inatividade para logout-->
<title><?=TITLE?></title>
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
		            </ul>
			    </div>
			    <!-- /breadcrumbs line -->

			     <?php include('includes/actions.php'); ?>

		    </div>
		    <!-- /content wrapper -->

		</div>
		<!-- /content -->

	</div>
	<!-- /content container -->


	<?php include('includes/footer.php'); ?>
            
	<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
        <script src="https://www.google.com/recaptcha/api.js?render=<?php echo SITE_KEY; ?>"></script>
        <script src="libraries/Javascript.js"></script>   

</body>

</html>
