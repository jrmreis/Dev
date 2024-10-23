<?php
class mysqlGeneral{

	var $error;
	var $prefix = PREFIX;

	function get_error(){
		return $this->error;
	}
	
	public function utf8encode($arr){
		foreach($arr as $key => $value){
			$arr[$key] = utf8_encode($value);
		}
		return $arr;
	}
	public function cleanuserinput($dirty){
		if(get_magic_quotes_gpc()){
			$clean = mysql_real_escape_string(stripslashes($dirty));
		}else{
			$clean = mysql_real_escape_string($dirty);
		}
		return $clean;
	}
	public function RemoveSpecial($url){
		$output = preg_replace("/\s+/" , "_" , trim($url));
		$output = preg_replace("/\W+/" , "" , $output);
		$output = preg_replace("/_/" , "-" , $output);
		$output = preg_replace("/--/" , "-" , $output);
		return strtolower($output);
	}
	public function RemoveAcentos($string){
		$acento1 = array("á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç", "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç", );
		$acento2 = array("a", "a", "a", "a", "a", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "o", "u", "u", "u", "u", "c", "A", "A", "A", "A", "A", "E", "E", "E", "E", "I", "I", "I", "I", "O", "O", "O", "O", "O", "U", "U", "U", "U", "C", );
		return str_replace( $acento1, $acento2, $string );
	}
	public function limpaURL($string){
		$string = $this->RemoveSpecial($this->RemoveAcentos($string));
		return $string;
	}
	public function alerta($msg){
		echo '<script type="text/javascript">alert("'.$msg.'");</script>';	
	}
	public function redir($url){
		echo '<script type="text/javascript">window.location="'.$url.'";</script>';
	}
	public function aledir($msg, $url){
		echo '<script type="text/javascript">alert("'.$msg.'"); window.location="'.$url.'";</script>';	
	}


	function insert($table, $camposarray, $dataarray){
		$i = 0; $j = 0; $data = ''; $campos = ''; $table = $this->prefix . $table;
		
		while(isset($dataarray[$i])){
		
			if($dataarray[$i]=='NOW()'){
				$data .= $dataarray[$i];
			}else{
				$data .= "'" . $this->cleanuserinput($dataarray[$i]) . "'";
			}
			
			
			if (isset($dataarray[$i+1])){$data .= ", ";}
			$i++;
		}
		
		while(isset($camposarray[$j])){
			$campos .= $camposarray[$j];
			
			if (isset($camposarray[$j+1])){$campos .= ", ";}
			
			$j++;
		}
		
		if(mysql_query("INSERT INTO $table($campos) VALUES ($data)")){return true;}else{$this->error = mysql_error(); return false;}

	}
	
	function insertID(){
		$lastID = mysql_insert_id();
		return $lastID;
	}
	
	function update($table, $fields, $values, $clause){
		$table = $this->prefix . $table;
		if(count($fields) != count($values)){
			return false;
		}
		
		$sql = "UPDATE $table SET ";
		
		$i=0;
		
		while(isset($fields[$i])){
		
			if($values[$i]=='NOW()'){
				$sql .= $fields[$i] . " = " . $values[$i];
			}else{
				$sql .= $fields[$i] . " = '" . $this->cleanuserinput($values[$i]) . "'";
			}
			
			if(isset($fields[$i+1])){$sql .= ', ';}
			
			$i++;
		}
		
		$sql .= " WHERE $clause";
		
		if(mysql_query($sql)){return true;}else{$this->error=mysql_error(); return false;}
		
	}
	
	function delete($table, $clause){
		$table = $this->prefix . $table;
		mysql_query("DELETE FROM $table WHERE $clause");
	}

	function createSQL($q){
		if($result = mysql_query($q)){return $result;}else{	$this->error=mysql_error(); return false;}
	}
	
	function getRows($table, $fields, $innerJoin, $clause=NULL, $order=NULL){
	
		$table = $this->prefix . $table;
	
		$sql = "SELECT ";
		
		$sql .= ($fields != '') ? $fields . " " : "* ";
		
		$sql .= "FROM $table ";
		
		if($innerJoin != ''){$sql .= $innerJoin;}
		
		if($clause != ''){$sql .= "WHERE $clause ";}
		
		if($order != ''){$sql .= " $order ";}
		
		if($result = mysql_query($sql)){return $result;}else{$this->error=mysql_error(); return false;}
		
	}
	
	function showRows($table, $fields, $innerJoin, $clause, $order){
		
		$result = $this->getRows($table, $fields, $innerJoin, $clause, $order);
		
		$numResult = mysql_num_rows($result);
		if($numResult > 0){
			return mysql_fetch_array($result);
		}else{
			return false;
		}
		
	}


}

?>