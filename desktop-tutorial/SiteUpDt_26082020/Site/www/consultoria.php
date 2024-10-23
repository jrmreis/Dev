<?php
include("system/config.php"); 

$seo = $sistema->get_info(2);
$seo['titulo'] = '';
$seo['description'] = '';
$title = !empty($seo['titulo']) ? $seo['titulo'] : TITLE;
$url = URL;
$description = $seo['description'];

$menu = 3;

?>

<!-- HEADER -->
<? include("includes/header.php"); ?>

<!-- MENU INTERNAS -->
<? include("includes/menu.php"); ?>

<!-- MAIN -->
<main class="main" role="main">

	<!-- INTERNAL BANNER -->
	<section class="banner-interno" style="background-image: url(<?=URLAPP?>img/banner-consultoria.jpg);">	
		<div class="banner-content">
			<h2>Consultoria em Processos de <br /> Tratamento Térmico em metalurgia</h2>
		</div>	
	</section>
	
	<!-- LISTA -->
	<section>
	
		<div class="container">
		
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> Definição de ciclo para T.T. para melhor usinagem</a></h3>
				<p>Estudo Microestrutura vs. Usinabilidade.</p>
			</div>
			
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> Interpretação de Microestrutura para qualificar T.T.</a></h3>
				<p>Slide de microestrutura.</p>
			</div>
			
			<div class="box-list">
				<h3><a href="#"><i class="fa fa-caret-right"></i> Análise de Falhas</a></h3>
			</div>
			
		</div>
		
	</section>

</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>