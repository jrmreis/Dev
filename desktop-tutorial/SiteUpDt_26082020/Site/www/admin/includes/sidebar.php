<!-- Sidebar -->
		<div id="sidebar">

	        <div class="sidebar-user widget">
				<div class="navbar"><div class="navbar-inner"><h6>Bem-vindo,<br><?php echo isset($_SESSION['administratorName']) ? $_SESSION['administratorName'] : '' ?>!</h6></div></div>
	        </div>

		    <!-- Main navigation -->
	        <ul class="navigation widget">
	            <li><a href="<?=URL?>" title="<?=DASH?>"><i class="icon-home"></i><?=DASH?></a></li>
	            <?php $mga->show_pages($current) ?>
	            <?php //$mga->show_pages_image($current) ?>
	            <?php $mga->show_menu($current); ?>
	            <?php printMenu($current); ?>
	        </ul>
	        <!-- /main navigation -->
		</div>
		<!-- /sidebar -->