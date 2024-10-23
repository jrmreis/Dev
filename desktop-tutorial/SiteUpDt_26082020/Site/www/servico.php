<?php
include("system/config.php"); 

$friend = $_GET['friend'];

$qrys = $sistema->getRows('services', '', '', array('friend' => $friend, 'active' => '1', 'deleted' => '0'), 'limit 1', false);

if(!$qrys){
	header('Location:' . URL);
	exit();
}

$title = !empty($qrys['seo_title']) ? $qrys['seo_title'] : $qrys['title'] . ' - ' . TITLE;
$url = URL.'servico/'.$qrys['friend'];
$description = $qrys['seo_description'];

$menu = 3;

?>

<!-- HEADER -->
<? include("includes/header.php"); ?>

<!-- MENU INTERNAS -->
<? include("includes/menu.php"); ?>

<!-- MAIN -->
<main class="main" role="main">

	<!-- INTERNAL BANNER -->
	<section class="banner-interno" style="background-image: url(<?=URLAPP?>files/services/<?php echo !empty($qrys['image']) ? $qrys['image'] : 'banner-consultoria.jpg'; ?>);">	
		<div class="banner-content">
			<h2><?=$qrys['title']?></h2>
		</div>	
	</section>
	
	<!-- LISTA -->
	<section>
	
		<div class="container">

			<?php 
				$sqlc = $sistema->getRows('service_content', '', '', array('service_id' => $qrys['id'], 'active' => '1'), 'order by sequence desc, id');
				foreach($sqlc as $qryc){
			?>
		
			<div class="box-list">
				<h3 class="mb-20"><i class="fa fa-caret-right"></i> <?=$qryc['title']?></h3>
				<div class="texto-interno">
					<?=$qryc['text']?>
				</div>
			</div>

			<?php } ?>
			
		</div>
		
	</section>

</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>