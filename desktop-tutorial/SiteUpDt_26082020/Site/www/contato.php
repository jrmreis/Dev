<?php
include("system/config.php");
include("config/configContato.php");  

$seo = $sistema->get_info(2);
$seo['titulo'] = '';
$seo['description'] = '';
$title = !empty($seo['titulo']) ? $seo['titulo'] : TITLE;
$url = URL;
$description = $seo['description'];

$menu = 4;

?>

<!-- HEADER -->
<?php include("includes/header.php"); ?>

<!-- MENU INTERNAS -->
<?php include("includes/menu.php"); ?>

	<main clas="main" role="main">	
		<section class="contato-banner">
			<div class="wrap">
				<div class="contato-infos">
					<h1 class="contato-title">Updated eng.</h1>
					<h3><i class="fa fa-phone-square"></i><?php $sistema->get_texto(8); ?></h3>
					<h3><i class="fa fa-envelope"></i><?php $sistema->get_texto(9); ?></h3>
				</div>		
			</div>	
		</section>

		<section class="">
			<div class="container">
				<h2 class="mt-40 mb-20">Entre em contato</h2>

				<form action="<?=URL?>sis/" method="POST" enctype="multipart/form-data"> 

				<!--<form action="<?=URL?>sis/" method="POST" enctype="multipart/form-data"> //recaptcha -->
					<fieldset>
						<div class="row">
							<div class="col-desktop-6 col-tablet-12">
								<div class="row">
									<div class="col-desktop-12 mb-10">
										<input type="text" class="form-control" name="nome" placeholder="Nome"/>
									</div>
									<div class="col-desktop-12 mb-10">
										<input type="email" class="form-control" name="email" placeholder="Email"/>
									</div>
									<div class="col-desktop-12 mb-10">
										<input type="text" class="form-control" name="telefone" placeholder="Telefone"/>
									</div>
								</div>
							</div>
							<div class="col-desktop-6 col-tablet-12 mb-10">
								<textarea name="mensagem" class="form-control" rows="7" placeholder="Deixe sua mensagem..."></textarea>
							</div>
							<div class="col-desktop-12">
								<div class="mb-20 text-center">
									
            								<!--<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response"> -->

									<input type="submit" class="btn red" value="Enviar" />
									<input type="hidden" name="acao" value="contato">
								</div>
							</div>
						</div>
					</fieldset>

            
        </form>

        <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response"> 

        <script src="https://www.google.com/recaptcha/api.js?render=<?php echo SITE_KEY; ?>"></script>
        <script src="libraries/Javascript.js"></script>



				<!--</form>  //recaptcha -->
				<p style="color: black;">
				<?php 
					if(isset($_GET['success']) && $_GET['success'] == 1){
						echo 'Mensagem enviada com sucesso!';
					}else if(isset($_GET['success'])){
						echo $msg;
					} 




	
				?>	
				</p>			
			</div>
		</section>
	</main>
		
<!-- FOOTER -->
<? include("includes/footer.php"); ?>
