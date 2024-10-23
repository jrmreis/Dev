<header class="<?php echo $menu == 1 ? 'header' : 'header-internas'; ?>" role="banner">

	<div class="wrap">

		<h1 class="logo mt-20"><a href="<?=BASE_URL?>"><img src="<?=URLAPP?>img/<?php echo $menu == 1 ? 'logo.png' : 'logo-color.png'; ?>" alt="<?=TITLE?>" /></a></h1>

		<nav>

			<ul class="menu">
				<li><a href="<?= BASE_URL; ?>"<?php echo $menu == 1 ? ' class="active"' : ''; ?>>Home</a></li>
				<li><a href="<?= BASE_URL.'sobre/'; ?>"<?php echo $menu == 2 ? ' class="active"' : ''; ?>>Sobre</a></li>
				<li>
					<a href="#"<?php echo $menu == 3 ? ' class="active"' : ''; ?>>Serviços</a>
					<ul class="submenu">
						<?php $sistema->get_services(); ?>
					</ul>
				</li>
				<li><a href="<?= BASE_URL.'contato/'; ?>"<?php echo $menu == 4 ? ' class="active"' : ''; ?>>Contato</a></li>
				<li><a href="<?= BASE_URL.'orcamento/'; ?>"<?php echo $menu == 5 ? ' class="active"' : ''; ?>>Orçamento</a></li>
			</ul>

			<a href="#" class="btn-menu-responsive"><i class="fa fa-bars"></i></a>

		</nav>

	</div>

</header>