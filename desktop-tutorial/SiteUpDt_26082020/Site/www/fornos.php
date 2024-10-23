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
			<h2>Fornos de Tratamento Térmico</h2>
		</div>	
	</section>
	
	<!-- LISTA -->
	<section>
	
		<div class="container">
		
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> Calibração de Termopares</a></h3>
				<p>Utilizando a norma CQI-9, é realizado a calibração dos termo-sensores, que podem ser termopares ou termo-resistências PT-100. <br /> Termopares devem ser calibrados trimestralmente.</p>
			</div>
			
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> TUS – Thermal Uniformity Survey:</a></h3>
				<div class="row">
					<div class="col-desktop-7">
						<p class="mb-20">Com base na norma AMS 2750E, é realizado teste de uniformidade de temperatura em fornos de tratamento térmico com o objetivo de qualificar o forno conforme norma CQI-9 ou API-6A.</p>
						<p class="mb-20">TUS deve ser realizado anualmente ou após reforma do forno à qual possa modificar a estabilidade de controle da zona de trabalho.</p>
						<p class="mb-20">Para CQI-9, a tolerância da uniformidade de temperatura para fornos de têmpera deve ser +/- 15°C. Para fornos de revenimento deve ser +/- 10°C.</p>
						<p class="mb-20">Para Fornos Contínuos, esse requisito aplica-se para zona de trabalho qualificada.</p>
						<p class="mb-20">Registros de temperatura(s) para revenimento e processos de endurecimento por precipitação devem ser controlados entre +/- 5°C do set point evidenciado pelos registros contínuos dos pirômetros. </p>
						<p>Segundo a norma API-6A, apêndice H, quando a temperatura do forno atingir o set-point, a temperatura em qualquer ponto da zona de trabalho não deve variar mais que +/- 14°C em relação ao set-point de temperatura do forno. Fornos utilizados para revenimento, alívio de tensões, aging (endurecimento por precipitação), quando a temperatura do forno atingir o set-point, a temperatura em qualquer ponto da zona de trabalho não deve variar mais que +/- 8°C em relação ao set-point de temperatura do forno.</p>
					</div>
					<div class="col-desktop-5 mt-40">
						<img src="<?=URLAPP?>img/fornos-desenho.jpg" alt="Fornos" />
					</div>
				</div>
			</div>
			
			<div class="box-list">
				<h3 class="mb-20"><a href="#"><i class="fa fa-caret-right"></i> SAT</a></h3>
				<p class="mb-20">O Teste de acuidade do sistema de controle da zona qualificada como zona de trabalho deve ser <br /> realizado mensalmente pelo método de sondagem ou semanalmente pelo método comparativo</p>
				<p class="mb-20"><strong>Método por sondagem:</strong> <br /> Tolerância +/- 5°C do set point do controlador em relação ao indicador.</p>
				<figure class="mb-20"><img src="<?=URLAPP?>img/forno-circuito.jpg" alt="Forno Circuito" /></figure>
				<p><strong>Método comparativo:</strong> <br /> Tolerância +/- 1°C do set point do controlador em relação ao indicador.</p>
			</div>
			
		</div>
		
	</section>

</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>