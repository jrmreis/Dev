<header class="header-internas" role="header">

	<div class="wrap">

		<h1 class="logo mt-20"><a href="<?=URL?>"><img src="<?=URLAPP?>img/logo-color.png" alt="<?=TITLE?>" /></a></h1>

		<nav>
		
			<ul class="menu">
				<li><a href="<?= BASE_URL; ?>"<?php echo $menu == 1 ? ' class="active"' : ''; ?>>Home</a></li>
				<li><a href="<?= BASE_URL.'sobre/'; ?>"<?php echo $menu == 2 ? ' class="active"' : ''; ?>>Sobre</a></li>
				<li><a href="<?= BASE_URL.'fornos/'; ?>"<?php echo $menu == 3 ? ' class="active"' : ''; ?>>Serviços</a></li>
				<li><a href="<?= BASE_URL.'contato/'; ?>"<?php echo $menu == 4 ? ' class="active"' : ''; ?>>Contato</a></li>
				<li><a href="<?= BASE_URL.'orcamento/'; ?>"<?php echo $menu == 5 ? ' class="active"' : ''; ?>>Orçamento</a></li>
			</ul>
			
			<a href="#" class="btn-menu-responsive"><i class="fa fa-bars"></i></a>
			
		</nav>

	</div>
	
</header>