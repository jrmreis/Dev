<!-- Page header -->
			    <div class="page-header">
			    	<div class="page-title">
				    	<h5>Dashboard</h5>
				    	<span><?=$mga->saudacao()?>, <?php echo isset($_SESSION['administratorName']) ? $_SESSION['administratorName'] : '' ?>!</span>
			    	</div>
			    </div>
			    <!-- /page header -->

			    <!-- Action tabs -->
			    <div class="actions-wrapper">
				    <div class="actions">

				    	<div id="user-stats">
					        <ul class="round-buttons">
					        	<?=$mga->show_actions()?>
					        </ul>
				    	</div>

				    	<ul class="action-tabs">
				    		<li><a href="#user-stats" title="">Ações</a></li>
				    	</ul>
				    </div>
				</div>
			    <!-- /action tabs -->
			    
			    <?php if (!empty($msg)) { ?>
	            <div class="alert alert-<?=$cmsg?>" style="margin-top: 16px;">
	            	<button type="button" class="close" data-dismiss="alert">×</button>
	            	<?=$msg?>
	            </div>
	            <?php } ?>