<?php
include("system/config.php"); 

$seo = $sistema->get_info(1);
$seo['titulo'] = '';
$seo['description'] = '';
$title = !empty($seo['titulo']) ? $seo['titulo'] : TITLE;
$url = URL;
$description = $seo['description'];

$menu = 1;

?>

<!-- HEADER -->
<?php include("includes/header.php"); ?>

<!-- MENU INTERNAS -->
<?php include("includes/menu.php"); ?>

<!-- SLIDER -->
<?php include("includes/slider.php"); ?>

<!-- MAIN -->
<main class="main" role="main">

	<section class="home-simulacao">
		<div class="container">
			<div class="col-desktop-6 col-tablet-12 home-simulacao-text mt-50 mb-50">
				<h2><?php $sistema->get_texto(2); ?></h2>
				<p class="mt-20">
					<?php $sistema->get_texto(3,true); ?>
				</p>
			</div>
			<div class="col-desktop-6 col-tablet-12 home-simulacao-box mb-50">
				<img src="<?=URLAPP?>img/simulacao-box.png" alt="" />
			</div>
		</div>
	</section>

	<section class="home-desc">
		<div class="wrap">
			<div class="home-desc-logo col-desktop-6">
				<figure>
					<img src="<?=URLAPP?>img/logo-color.png" alt="" />
				</figure>
			</div>
			<div class="home-desc-text col-desktop-12 mt-40">
				<?php $sistema->get_texto(4); ?>
			</div>
		</div>
	</section>

	<section class="home-melhor">
		<div class="wrap">
			<div class="home-melhor-desc mb-60">
				<h2>A Updated Eng oferece o melhor para sua empresa</h2>
				<p class="mt-20">Veja quais são nossos principais atributos</p>
			</div>

			<div class="home-melhor-img col-desktop-12">
				<div class="home-melhor-box col-desktop-4 col-tablet-12 mb-40">
					<figure>
						<div class="home-melhor-box-img">
							<img src="<?=URLAPP?>img/agilidade.png" alt="" />
						</div>
						<figcaption>Agilidade</figcaption>
					</figure>
					<p><?php $sistema->get_texto(5, true); ?></p>
				</div>
				<div class="home-melhor-box col-desktop-4 col-tablet-12 mb-40">
					<figure>
						<div class="home-melhor-box-img">
							<img src="<?=URLAPP?>img/confiabilidade.png" alt="" />
						</div>
						<figcaption>Confiabilidade</figcaption>
					</figure>	
					<p><?php $sistema->get_texto(6); ?></p>
				</div>
				<div class="home-melhor-box col-desktop-4 col-tablet-12 mb-40">
					<figure>
						<div class="home-melhor-box-img">
							<img src="<?=URLAPP?>img/precos.png" alt="" />
						</div>
						<figcaption>Preços</figcaption>
					</figure>
					<p><?php $sistema->get_texto(7); ?></p>
				</div>
			</div>
		</div>
	</section>

	<section class="home-infos">
		<div class="home-infos-boxes custom-border mb-50 clear">
			<div class="home-infos-box">
				<div class="home-infos-left col-desktop-6 col-smart-12">
					<img src="<?=URLAPP?>img/profissional-quali.png" alt="" />
				</div>
				<div class="home-infos-right col-desktop-6 col-smart-12">
					<img src="<?=URLAPP?>img/equip-profissional.png" alt="" />
				</div>
			</div>
		</div>
	</section>

	<section class="home-produtos">
		<a href="#">
			<img src="<?=URLAPP?>img/img-engrenagem.png" alt="" />
		</a>
	</section>
</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>
