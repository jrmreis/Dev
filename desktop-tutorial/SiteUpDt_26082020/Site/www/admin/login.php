<?php include('inc/config.php');?>

<!DOCTYPE html>
<html lang="pt">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta http-equiv="refresh" content="3;url=../index.php" /> <!--tempo de inatividade para redirecionar para home-->
<title>Login | <?=TITLE?></title>
<link rel="shortcut icon" href="<?=URL?>img/favicon.ico">
<link href="css/main.css" rel="stylesheet" type="text/css" />
<!--[if IE 8]><link href="css/ie8.css" rel="stylesheet" type="text/css" /><![endif]-->
<!--[if IE 9]><link href="css/ie9.css" rel="stylesheet" type="text/css" /><![endif]-->
<!--[if lt IE 9]>
  <script src='https://html5shim.googlecode.com/svn/trunk/html5.js'></script>
<!--[endif]-->
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/forms/jquery.uniform.min.js"></script>
<script type="text/javascript" src="js/files/bootstrap.min.js"></script>
<script type="text/javascript" src="js/files/login.js"></script>
</head>

<body class="no-background">
	<div id="top">
		<div class="fixed">
			<ul class="top-menu">
				<li class="dropdown">
					<a class="login-top" data-toggle="dropdown"></a>
					<ul class="dropdown-menu pull-right">
						<li><a href="<?=URL2?>" title="<?=TITLE?>"><i class="icon-remove"></i>Ir para o site</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
    <div class="login">
        <div class="navbar">
            <div class="navbar-inner">
                <h6><i class="icon-user"></i>Login</h6>
            </div>
        </div>
        <div class="well">
        	<?php 
        		if(isset($_GET['e'])){
        			switch($_GET['e']){
	        			case 2:
	        				$error = '<strong>Email</strong> ou <strong>Senha</strong> Inválidos! Tente novamente ou contate o administrador.';
	        				break;
	        			
	        			case 1:
	        				$error = 'Um erro foi encontrado em sua sessão, faça o <strong>login</strong> novamente!';
	        				break;
        			}
        	?>
        	<div class="alert alert-error">
        		<button type="button" class="close" data-dismiss="alert">×</button>
        		<?php echo $error; ?>
        	</div>
        	<?php } ?>
            <form action="<?=URL?>valida.php" method="post" class="row-fluid">
                <div class="control-group">
                    <label class="control-label">Email:</label>
                    <div class="controls"><input class="span12" type="text" name="email" maxlength="50" placeholder="E-mail" /></div>
                </div>
                
                <div class="control-group">
                    <label class="control-label">Senha:</label>
                    <div class="controls"><input class="span12" type="password" name="senha" maxlength="32" placeholder="Senha" /></div>
                </div>

                <div class="login-btn">

		<input type="submit" value="Entrar no Sistema" class="btn btn-danger btn-block" /></div>

            </form>

        </div>
    </div>
	<?php include('includes/footer.php'); ?>
</body>
</html>