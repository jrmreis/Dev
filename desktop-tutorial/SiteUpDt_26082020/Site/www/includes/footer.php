	<footer class="footer mb-40" role="contentinfo">
		<div class="container">
			<div class="footer-logo col-desktop-3 col-tablet-12 mt-80">
				<figure>
					<a href="<?= BASE_URL; ?>"><img src="<?=URLAPP?>img/logo-color.png" alt="" /></a>
					<figcaption>&copy; All rights reserved 2015. UpdateENG. <br><br>
					Desenvolvido por<br>
					<a href="<?=AUTHORSITE?>" rel="nofollow" target="_blank"><?=AUTHOR?></a></figcaption>
				</figure>
			</div>
			<div class="footer-servicos col-desktop-3 col-tablet-12 mt-80">
				<h2 class="footer-title">SERVIÇOS</h2>
				<ul>
					<?php $sistema->get_services(); ?>
				</ul>				
			</div>
			<div class="footer-contato col-desktop-3 col-tablet-12 mt-80">
				<h2 class="footer-title">CONTATO</h2>
				<h3><?php $sistema->get_texto(8); ?></h3>
				<h3><?php $sistema->get_texto(9); ?></h3>
				<div class="footer-btn-orcamento mt-20">
					<a class="" href="<?= BASE_URL.'orcamento.php'; ?>">PEÇA UM ORÇAMENTO</a>
				</div>
			</div>
			<div class="footer-newsletter col-desktop-3 col-tablet-12 mt-80">
				<form action="<?=URL?>sis/" method="POST" enctype="multipart/form-data">
					<h2 class="footer-title">assine a newsletter</h2>
					<input type="email" name="email" placeholder="EMAIL..." />
					<button type="submit" class="footer-btn-search"><i class="fa fa-angle-double-right"></i></button>
					<input type="hidden" name="acao" value="newsletter">
				</form>
				<div class="footer-social mt-20">
					<a href="#" class="footer-fb"><i class="fa fa-facebook-square"></i></a>
					<a href="#" class="footer-tw"><i class="fa fa-twitter-square"></i></a>
					<a href="#" class="footer-gp"><i class="fa fa-google-plus-square"></i></a>
				</div>
			</div>
		</div>
	</footer>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="<?=URLAPP?>js/main.min.js"></script>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3&appId=298504896997977";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>

	</body>

</html>