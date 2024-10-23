<?php
	//Função que retorna a query com utf8_encode
	function utf8encode($arr){
		foreach($arr as $key => $value){
			$arr[$key] = utf8_encode($value);
		}
		return $arr;
	}

	/******************************************************************************/
 
	//Função de alerta
	function alerta($msg){
		echo '<script type="text/javascript">alert("'.$msg.'");</script>';	
	}
	
	/******************************************************************************/
	
	//Função de redirecionamento
	function redir($url){
		echo '<script type="text/javascript">window.location="'.$url.'";</script>';
	}
	
	/******************************************************************************/
 
	//Função de alerta
	function aledir($msg, $url){
		echo '<script type="text/javascript">alert("'.$msg.'"); window.location="'.$url.'";</script>';	
	}
	
	/******************************************************************************/
	
	//Função de Limpar URL para URL Amigável
	function RemoveSpecial($url){
		$output = preg_replace("/\s+/" , "_" , trim($url));
		$output = preg_replace("/\W+/" , "" , $output);
		$output = preg_replace("/_/" , "-" , $output);
		$output = preg_replace("/--/" , "-" , $output);
		return strtolower($output);
	}
	
	/******************************************************************************/
	
	//Remove acentos da variavel
	function RemoveAcentos($string){
		$acento1 = array("á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç", "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç", );
		$acento2 = array("a", "a", "a", "a", "a", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "o", "u", "u", "u", "u", "c", "A", "A", "A", "A", "A", "E", "E", "E", "E", "I", "I", "I", "I", "O", "O", "O", "O", "O", "U", "U", "U", "U", "C", );
		return str_replace( $acento1, $acento2, $string );
	}
	
	/******************************************************************************/
	
	//Função de Limpar URL para URL Amigável
	function limpaURL($string){
		$string = RemoveSpecial(RemoveAcentos($string));
		return $string;
	}
	
	/******************************************************************************/
	
	//Generate UID
	function uid($limit=10,$table='',$field='') {
		$allowed = array(
			'A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','P','Q','R','S','T','U','V','W','X','Y','Z',
			'0','1','2','3','4','5','6','7','8','9'
			);
		srand();
		shuffle($allowed);
		$tmp = $allowed;
		$code = '';
		for($a=1;$a<=$limit;$a++) {
			$code .= array_pop($tmp);
			srand(); shuffle($tmp);
		}
		if ($table!='') {
			$q = mysql_query("SELECT ".$field." FROM ".$table." WHERE ".$field."='$code'");
			while(intval(mysql_num_rows($q)) > 0) {
				srand();
				shuffle($allowed);
				$tmp = $allowed;
				$code = '';
				for($a=1;$a<=$limit;$a++) {
					$code .= array_pop($tmp);
					srand(); shuffle($tmp);
				}
				$q = mysql_query("SELECT ".$field." FROM ".$table." WHERE ".$field."='$code'");
			}
		}
		return $code;
	}
	
	/******************************************************************************/
	
	// Anti-Injection
	function cleanuserinput($dirty){
		if(get_magic_quotes_gpc()){
			$clean = mysql_real_escape_string(stripslashes($dirty));
		}else{
			$clean = mysql_real_escape_string($dirty);
		}
		return $clean;
	}
	
	/******************************************************************************/
	
	// Saudacao
	function saudacao(){
		$hr = date("H");
		
		if($hr >= 12 && $hr<18){
			$resp = "Boa tarde";
		}else if ($hr >= 0 && $hr <12 ){
			$resp = "Bom dia";
		}else{
			$resp = "Boa noite";
		}
		echo  $resp;
   }
   
   /******************************************************************************/
   function uploadImage($imageTmp, $imageName, $folder, $resize, $width, $height){
   
   		$options = array('jpegQuality' => 70);
   
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
		}
		
		$arq = $folder.$imageName;
		
		if($thumb->save($arq)){return true;}else{return false;}
		
   }
   
   function EnviarEmail($msg, $assunto, $para){
			
		$headers = "MIME-Version: 1.1\n";
		$headers .= "Content-type: text/html; charset=utf-8\n";
		$headers .= "From: ".EMAIL."\n";
			
		if(!mail($para, $assunto, $msg, $headers, "-r".EMAIL)){
			$headers .= "Return-Path: " . EMAIL . '\n';
			mail($para, $assunto, $msg, $headers );
		}
		
   }
	
?>