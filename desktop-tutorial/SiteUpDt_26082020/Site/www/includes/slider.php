<section class="hero-slider">

	<!-- HOLDING -->
	<div class="hero-slider-holding">

		<!-- STAGE -->
		<div class="hero-slider-stage">
			<?php 
				$sqlr = $sistema->getRows('slider', '', '', '', '');
				foreach($sqlr as $qryr){
					if($qryr['ativo'] == 1){
			?>		
			<div style="background-image: url(files/slider/<?=$qryr['imagem']?>);">
				<section class="container">
					<section class="content">
						<h2><?=$qryr['titulo']?></h2>
						<p><?=$qryr['subtitulo']?></p>
						<?php if($qryr['url']){ ?>
						<a href="<?=$qryr['url']?>" target="<?=$qryr['target']?>">Confira aqui</a>
						<?php } ?>
					</section>
				</section>
			</div>
			<?php }
			} ?>
		</div>
		
	</div>

	<!-- CONTROLLERS -->
	<div class="hero-slider-controllers">
	
		<!-- BULLETS -->
		<div class="wrap">
			<div class="hero-slider-bullets"></div>
		</div>
		
	</div>

</section>