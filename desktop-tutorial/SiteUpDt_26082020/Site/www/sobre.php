<?php
include("system/config.php"); 

$seo = $sistema->get_info(2);
$seo['titulo'] = '';
$seo['description'] = '';
$title = !empty($seo['titulo']) ? $seo['titulo'] : TITLE;
$url = URL;
$description = $seo['description'];

$menu = 2;

?>

<!-- HEADER -->
<? include("includes/header.php"); ?>

<!-- MENU INTERNAS -->
<? include("includes/menu.php"); ?>

	<main clas="main" role="main">

		<section class="sobre-desc">
			<div class="sobre-title">
				<h1>Sobre a empresa</h1>
			</div>
			<div class="container">
				<div class="about">
					<div class="sobre-text">
					<?php 
						$sistema->get_texto(1);
					 ?>					
					</div>
				</div>
			</div>
		</section>

		<section class="home-infos">
			<div class="home-infos-boxes no-border mb-50 clear">
				<div class="home-infos-box">
					<div class="home-infos-left col-desktop-6 col-tablet-12">
						<img src="<?=URLAPP?>img/profissional-quali.png" alt="" />
					</div>
					<div class="home-infos-right col-desktop-6 col-tablet-12">
						<img src="<?=URLAPP?>img/equip-profissional.png" alt="" />
					</div>
				</div>
			</div>
		</section>
	</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>
