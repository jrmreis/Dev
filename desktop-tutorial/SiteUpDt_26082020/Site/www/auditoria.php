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
			<h2>Auditoria Interna</h2>
		</div>	
	</section>
	
	<!-- LISTA -->
	<section>
	
		<div class="container">
		
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> CQI-9</a></h3>
				<p class="mb-20">A auditoria interna é uma ferramenta extremamente importante para preparar a fábrica <br /> para uma auditoria de cliente ou órgão certificador.</p>
				<p class="mb-20">Porém, normas como a CQI-9 visam implementar um método de trabalho o qual diminui-se <br /> o risco, implementando meios para reduzir a probabilidade de eventos indesejáveis <br /> ocorrerem, dessa forma a frequência de peças não conformes diminua drasticamente</p>
				<figure class="mb-20"><img src="<?=URLAPP?>img/tabela-quimica.jpg" alt="Tabela" /></figure>
				<p>Dessa forma o desperdício de recursos (insumos e mão de obra) é eliminado e o fornecedor de Tratamento <br /> Térmico pode oferecer um serviço com qualidade e preço competitivo.</p>
			</div>
			
		</div>
		
	</section>

</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>