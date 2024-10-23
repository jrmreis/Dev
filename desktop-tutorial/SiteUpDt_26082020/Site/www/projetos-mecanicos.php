<?php
include("system/config.php"); 

$seo = $sistema->get_info(2);
$seo['titulo'] = '';
$seo['description'] = '';
$title = !empty($seo['titulo']) ? $seo['titulo'] : TITLE;
$url = URL;
$description = $seo['description'];

$menu = 5;

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
			<h2>Projetos mecânicos</h2>
		</div>	
	</section>
	
	<!-- LISTA -->
	<section>
	
		<div class="container">
		
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> Estudos de Montagem</a></h3>
				<p class="mb-20">Quando existe uma falha em campo, o fator de falha mais intuitivo é a falha de material.</p>
				<p class="mb-20">Porém, na engenharia, é necessário analisar os fatos. A montagem equivocada pode <br /> resultar em falha imediata do componente, apesar do material estar dentro das especificações.</p>
				<p class="mb-20">Vídeo de excesso de contração eixo e mancal.</p>
				<iframe src="https://www.youtube.com/embed/XQu8TTBmGhA" frameborder="0" allowfullscreen></iframe>
			</div>
			
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> Simulação por Elementos Finitos (validação do projeto antes do protótipo).</a></h3>
				<iframe src="https://www.youtube.com/embed/XQu8TTBmGhA" frameborder="0" allowfullscreen></iframe>
			</div>
			
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> Estudo de caso Elos de Corrente:</a></h3>
				<iframe src="https://www.youtube.com/embed/XQu8TTBmGhA" frameborder="0" allowfullscreen></iframe>
			</div>
			
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> Engenharia Reversa e adequação do projeto à nova condição de trabalho.</a></h3>
				<div class="row">
					<figure class="col-desktop-6 col-smart-12 mb-30">
						<img src="<?=URLAPP?>img/engrenhagem-nova.jpg" alt="Engrenhagem Nova" />
						<figcaption>Engrenagem original – nova</figcaption>
					</figure>
					<figure class="col-desktop-6 col-smart-12 mb-30">
						<img src="<?=URLAPP?>img/engrenhagem-desgastada.jpg" alt="Engrenhagem Desgastada">
						<figcaption>Mesma engrenagem desgastada</figcaption>
					</figure>
				</div>
				<div class="row">
					<figure class="col-desktop-6 col-smart-12 mb-20">
						<img src="<?=URLAPP?>img/modelagem-3d.jpg" alt="Modelagem 3d">
						<figcaption>Modelamento 3D</figcaption>
					</figure>
					<figure class="col-desktop-6 col-smart-12 mb-20">
						<img src="<?=URLAPP?>img/engrenhagem-desenho.jpg" alt="Modelagem 3d">
						<figcaption>Readequação de projeto, incluindo Tratamento Térmico localizado de Têmpera por Indução, para aumentar a resistência à abrasão, sem afetar a ductilidade do núcleo da engrenagem, essencial para absorver choques, preservando a engrenagens de trincas.</figcaption>
					</figure>
				</div>
			</div>
			
		</div>
		
	</section>

</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>