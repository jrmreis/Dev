<?php
include('class.mysql.php');

class Administrator extends mysqlGeneral{

	var $mga = 'adm_mga';

	public function __construct() {
	
		session_start();  //teste sem (SS_NAME)
	
		$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
		mysql_select_db(DB_NAME, $conn)or die("Não foi possível conectar ao banco de dados!");
		mysql_query("SET NAMES 'utf8'");
		mysql_query('SET character_set_connection=utf8');
		mysql_query('SET character_set_client=utf8');
		mysql_query('SET character_set_results=utf8');
        
	}

	/*
		Cria o menu lateral em base da tabela *_fields
	*/
	public function show_menu($current){
		$li = '';
		$sql = $this->getRows('fields', '', '', 'tipo != "3"', 'order by ordem');
		while($qry = mysql_fetch_assoc($sql)){
			if($qry['tipo'] == '1'){
				$link = '#';
				$class = ' class="expand"';
				$submenu = '<ul>
				<li><a href="novo.php?t='.$qry['tabela'].'">Adicionar Novo</a></li>
				<li><a href="rel-'.$qry['tabela'].'.php">Cadastrados</a></li>
				</ul>';
			}else{
				$link = $qry['url'];
				$class = '';
				$submenu = '';
			}

			if($qry['icon'] == $current){
				$first = ' class="active"';
				$second = ' id="current"';
			}else{
				$first = '';
				$second = '';
			}

			$li .= '<li'.$first.'><a href="'.$link.'" title="'.$qry['titulo'].'"'.$second.$class.'><i class="'.$qry['icon'].'"></i>'.$qry['titulo'].'</a>
	            	'.$submenu.'
	            </li>';
	    }
	    echo $li;
	}

	/*
		Cria o menu lateral em base da tabela *_paginas
	*/
	public function show_pages($current){
		$li = '';

		$sql = $this->getRows('pages', '', '', '', 'group by page_id order by page_id');
		while($qry = mysql_fetch_assoc($sql)){
			$li .= '<li><a href="pages.php?cod='.$qry['page_id'].'">'.$qry['pagina'].'</a></li>';
	    }

	    if('icon-globe' == $current){
			$first = ' class="active"';
			$second = ' id="current"';
		}else{
			$first = '';
			$second = '';
		}

	    $menu = '<li'.$first.'><a href="#" title="Páginas" class="expand"'.$second.'><i class="icon-file"></i> Páginas</a>
	            	<ul>
	            		'.$li.'
	            	</ul>
	            </li>';
	    echo $menu;
	}

	/*
		Cria o menu lateral em base da tabela *_imagem
	*/
	public function show_pages_image($current){
		$li = '';

		$sql = $this->getRows('images', '', '', '', 'group by page_id order by page_id');
		while($qry = mysql_fetch_assoc($sql)){
			$li .= '<li><a href="page-image.php?cod='.$qry['page_id'].'">'.$qry['pagina'].'</a></li>';
	    }

	    if('icon-camera' == $current){
			$first = ' class="active"';
			$second = ' id="current"';
		}else{
			$first = '';
			$second = '';
		}

	    $menu = '<li'.$first.'><a href="#" title="Imagens" class="expand"'.$second.'><i class="icon-camera"></i> Imagens</a>
	            	<ul>
	            		'.$li.'
	            	</ul>
	            </li>';
	    echo $menu;
	}

	/*
		Cria os actions do topo em base da tabela *_fields
	*/
	public function show_actions(){
		$li = '';
		$sql = $this->getRows('fields', '', '', 'action = "1"', 'order by ordem');
		while($qry = mysql_fetch_assoc($sql)){
			$url = !empty($qry['action_url']) ? $qry['action_url'] : 'rel-'.$qry['tabela'].'.php';
			$li .= '<li><div class="depth"><a href="'.$url.'" title="'.$qry['titulo'].'" class="tip"><i class="'.$qry['icon'].'"></i></a></div></li>';
	    }
	    echo $li;
	}
	
	public function get_fields($tabela){
		$sql = $this->getRows('fields', '', '', 'tabela = "'.$tabela.'"', 'limit 1');
		if(mysql_num_rows($sql) > 0){
			$qry = mysql_fetch_assoc($sql);
			return $qry;
		}else{
			return false;
		}
	}

	public function foreach_fields($campos, $folder = '', $show = false, $qrye = '', $editar = false){
		foreach($campos as $fields){
		
			$help = ''; $helpblock = '';
		
			if($show){
				$valor = $qrye[$fields['campo']];
			}else{
				$valor = '';
			}
			
			$max = !empty($fields['max']) ? ' maxlength="'.$fields['max'].'"' : '';
			$mascara = !empty($fields['mask']) ? ' data-mask="'.$fields['mask'].'"' : '';
			$classe = !empty($fields['classe']) ? ' '.$fields['classe'] : '';
			
			if(!empty($fields['tipo'])){
			
				switch($fields['tipo']){
				
					case 'ckeditor':
						$input = '<textarea name="'.$fields['campo'].'" id="'.$fields['campo'].'" class="span12'.$classe.'">'.$valor.'</textarea>';
						break;						    			
								    		
					case 'textarea':
						$input = '<textarea name="'.$fields['campo'].'" id="'.$fields['campo'].'" rows="10" class="span12'.$classe.'">'.$valor.'</textarea>';
						break;
						
					case 'password':
						$input = '<input type="password" maxlength="32" class="span12'.$classe.'" name="'.$fields['campo'].'" id="'.$fields['campo'].'" />';
						break;
								    			
					case 'text':
						$input = '<input type="text" class="span12'.$classe.'"'.$mascara.$max.' value="'.$valor.'" name="'.$fields['campo'].'" id="'.$fields['campo'].'" />';
						break;
								    			
					case 'spinner':
						$input = '<input type="text" class="spinner-default'.$classe.'" value="'.$valor.'" name="'.$fields['campo'].'" id="'.$fields['campo'].'" />';
						break;
								    			
					case 'image':
						$input = '<input type="file" name="'.$fields['campo'].'" class="styled'.$classe.'">';
						$help = is_file($folder.$valor) ? '<span class="help-block"><a href="'.$folder.$valor.'" class="lightbox">Visualizar Imagem</a></span>' : '';
						break;
						
					case 'arquivo':
						$input = '<input type="file" name="'.$fields['campo'].'" class="styled'.$classe.'">';
						break;
								    			
					case 'boolean':
						$s1 = $valor == '1' ? ' selected' : '';
						$s2 = $valor == '0' ? ' selected' : '';
						$input = '<select name="'.$fields['campo'].'" id="'.$fields['campo'].'" class="styled'.$classe.'">
									<option value="1"'.$s1.'>Sim</option>
								    <option value="0"'.$s2.'>Não</option>
								  </select>';
						break;
						
					case 'select':
						$option = '';
						foreach($fields['select'] as $option_value => $option_show){
							$s = $valor == $option_value ? ' selected' : '';
							$option .= '<option value="'.$option_value.'"'.$s.'>'.$option_show.'</option>';
						}
						$input = '<select name="'.$fields['campo'].'" class="'.$classe.'">
									'.$option.'
								  </select>';
						break;

					case 'estado':
						$option = '';
						$sqlest = $this->getRows('estados', '', '', '', 'limit 27');
						while($qryest = mysql_fetch_assoc($sqlest)){
							$s = $valor == $qryest['uf'] ? ' selected' : '';
							$option .= '<option value="'.$qryest['uf'].'"'.$s.'>'.$qryest['nome'].'</option>';
						}
						$input = '<select name="'.$fields['campo'].'" class="styled'.$classe.'">
									'.$option.'
								  </select>';
						break;

					case 'sql':
						$option = '';
						$sqlest = $this->getRows($fields['sql'][0], $fields['sql'][5], $fields['sql'][6], $fields['sql'][3], $fields['sql'][4]);
						while($qryest = mysql_fetch_assoc($sqlest)){
							$s = $valor == $qryest[$fields['sql'][1]] ? ' selected' : '';
							$option .= '<option value="'.$qryest[$fields['sql'][1]].'"'.$s.'>'.$qryest[$fields['sql'][2]].'</option>';
						}
						if(isset($fields['jsload']) && $fields['jsload'] && !$editar){
							$option = '';
						}
						$input = '<select name="'.$fields['campo'].'" class="'.$classe.'">
									<option value=""></option>
									'.$option.'
								  </select>';
						break;
		
				} // Fim Switch
								    			
			}else{
				$input = '<input type="text" class="span12'.$classe.'"'.$mascara.$max.' value="'.$qrye[$fields['campo']].'" name="'.$fields['campo'].'" id="'.$fields['campo'].'" />';
			} // Fim $fields['tipo']
			
			if(isset($fields['help']) && !empty($fields['help'])){
				$helpblock = '<span class="help-block">'.$fields['help'].'</span>';
			}
			
			echo '<div class="control-group">
	                                <label class="control-label">'.$fields['titulo'].'</label>
	                                <div class="controls">
	                                    '.$input.'
	                                    '.$help.'
	                                    '.$helpblock.'
	                                </div>
	                            </div>';
		
		} // Fim Foreach
	
	} // Fim Function
	
	protected function GeradorSenha($tipo="L L N N L N L L N N N L") {
		
		// o explode retira os espaços presentes entre as letras (L) e números (N)        
        $tipo = explode(" ", $tipo);

		// Criação de um padrão de letras e números
        $padrao_letras = "A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|X|W|Y|Z";
        $padrao_numeros = "0|1|2|3|4|5|6|7|8|9";

		// Criando os arrays, que armazenarão letras e números
		// o explode retire os separadores | para utilizar as letras e números
        $array_letras = explode("|", $padrao_letras);
        $array_numeros = explode("|", $padrao_numeros);

		// cria a senha baseado nas informações da função (L para letras e N para números)
        $senha = "";
        for ($i=0; $i<sizeof($tipo); $i++) {
            if ($tipo[$i] == "L") {
                $senha.= $array_letras[array_rand($array_letras,1)];
            } else {
                if ($tipo[$i] == "N") {
                    $senha.= $array_numeros[array_rand($array_numeros,1)];
                }
            }
        }
		
        return strtolower($senha);
    }
	public function saudacao(){
		$hr = date(" H ");
		
		if($hr >= 12 && $hr<18){
			$resp = "Boa tarde";
		}else if ($hr >= 0 && $hr <12 ){
			$resp = "Bom dia";
		}else{
			$resp = "Boa noite";
		}
		echo  $resp;
   }
	
	public function validaImage($image, $nome, $arr = array('jpg', 'jpeg', 'png', 'gif')){
	
		if(!empty($image) and is_file($image['tmp_name'])){
			$ext = array_reverse(explode('.',$image['name']));
			
			if($arr === false){
				$name = $this->limpaURL($nome).'.'.$ext[0];
				return $name;
			}else{
				if(in_array(strtolower($ext[0]), $arr)){
					$name = $this->limpaURL($nome).'.'.$ext[0];
					return $name;
				}
			}
			
		}
   
	}
	public function uploadImage($imageTmp, $imageName, $folder, $resize, $width, $height){
   
   		$options = array('jpegQuality' => 95);
   
		$thumb = PhpThumbFactory::create($imageTmp, $options);
		if($resize=='adaptive'){
			$thumb->adaptiveResize($width, $height);
		}elseif($resize=='normal'){
			$thumb->resize($width, $height);
		}else{
			return false;
		}
		
		if(!file_exists($folder)){
			mkdir($folder, 0777);
			chmod($folder, 0777);
		}
		
		$arq = $folder.$imageName;
		
		if($thumb->save($arq)){return true;}else{return false;}
		
   }

   public function move_uploaded($arquivoTmp, $arquivoName, $folder){
	
		if(!file_exists($folder)){
			mkdir($folder, 0777);
			chmod($folder, 0777);
		}
		
		if(move_uploaded_file($arquivoTmp, $folder.$arquivoName)){
			return true;
		}else{
			return false;
		}

	}
	
	public function validaUsuario($email, $senha){
	
		$email = $this->cleanuserinput($email);
		$senha = md5($this->cleanuserinput($senha));
		
		$sql = $this->getRows($this->mga, '', '', 'email = "'.$email.'" and senha = "'.$senha.'" and ativo="1"', 'limit 1');
		
		if(mysql_num_rows($sql) > 0){
			$qry = mysql_fetch_assoc($sql);
			$first_name = explode(' ', $qry['nome']);
		
			$_SESSION['administratorID'] = $qry['id'];
			$_SESSION['administratorName'] = $qry['nome'];
			$_SESSION['administratorEmail'] = $qry['email'];
			
			return true;
		}else{
			return false;
		}
		
	}

	public function send_email($destinatario, $assunto, $mensagem){	
		require 'PHPMailer/PHPMailerAutoload.php';
		$mail = new PHPMailer;

		//$mail->SMTPDebug = 3;                               // Enable verbose debug output

		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'EMAIL AQUI';                 // SMTP username
		$mail->Password = 'SENHA AQUI';                           // SMTP password
		$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 587;                                    // TCP port to connect to

		$mail->setFrom('EMAIL AQUI', 'Update ENG');

		$mail->addAddress($destinatario);     // Add a recipient
		$mail->isHTML(true);                                  // Set email format to HTML

		$mail->Subject = $assunto;
		$mail->Body    = $mensagem;

		if(!$mail->send()) {						
			return false;
		} else {
		    return true;
		}		
	}
	
	public function protegePagina(){
		if(!isset($_SESSION['administratorID']) or !isset($_SESSION['administratorName'])) {
			$this->expulsaVisitante('');
		}
	}
	public function expulsaVisitante($e = null){
		$paginaLogin = URL.'login.php';
		unset($_SESSION['administratorID'], $_SESSION['administratorName']);
		header("Location: ".$paginaLogin.$e);
	}
	
}
?>