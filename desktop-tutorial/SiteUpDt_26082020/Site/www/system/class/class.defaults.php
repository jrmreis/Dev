<?php 
require_once('class.db.php');
class Defaults{

	private $prefix = PREFIX;
	private $database;

	public function insert($table, $fields, $last = false){

		$this->database = new Database();
		
		$table = $this->prefix . $table;
		$place = $placeu = '';

		if(is_array($fields)){
			$i=0;
			foreach($fields as $campo => $valor){
				$place[] .= $campo;
				$placeu[] .= ":f".$i;
				$i++;
			}
		}

		$sql = "INSERT INTO $table(".implode(', ',$place).") VALUES(".implode(', ',$placeu).")";

		$this->database->query($sql);

		if(is_array($fields)){
			$j=0;
			foreach($fields as $campo => $valor){
				$this->database->bind(':f'.$j, $valor);
				$j++;
			}
		}
		
		$exec = $this->database->execute();

		return $last ? $this->database->lastInsertId() : $exec;

	}
	
	public function update($table, $fields, $clause){

		$this->database = new Database();

		$table = $this->prefix . $table;
		$place = $placeu = $where = '';
		$sql = "UPDATE $table SET ";

		if(is_array($fields)){
			$i=0;
			foreach($fields as $campo => $valor){
				$place[] .= "$campo = :f".$i;
				$i++;
			}
			$sql .= implode(', ',$place);
		}

		if(is_array($clause)){
			$j=0;
			foreach($clause as $campo => $valor){
				$placeu[] = substr($campo, -1) == '!' ? str_replace('!', '', $campo)." != :fu".$j : "$campo = :fu".$j;
				$j++;
			}
			$where .= implode(' AND ', $placeu);
			$sql .= " WHERE $where";
		}

		$this->database->query($sql);

		if(is_array($fields)){
			$k=0;
			foreach($fields as $campo => $valor){
				$this->database->bind(':f'.$k, $valor);
				$k++;
			}
		}

		if(is_array($clause)){
			$n=0;
			foreach($clause as $campo => $valor){
				$this->database->bind(':fu'.$n, $valor);
				$n++;
			}
		}
		
		$exec = $this->database->execute();

		return $exec;
		
	}

	public function delete($table, $clause){

		$this->database = new Database();

		$table = $this->prefix . $table;
		$place = $placeu = $where = '';
		$sql = "DELETE from $table";

		if(is_array($clause)){
			$j=0;
			foreach($clause as $campo => $valor){
				$placeu[] = substr($campo, -1) == '!' ? str_replace('!', '', $campo)." != :fu".$j : "$campo = :fu".$j;
				$j++;
			}
			$where .= implode(' AND ', $placeu);
			$sql .= " WHERE $where";
		}

		$this->database->query($sql);

		if(is_array($clause)){
			$n=0;
			foreach($clause as $campo => $valor){
				$this->database->bind(':fu'.$n, $valor);
				$n++;
			}
		}
		
		$exec = $this->database->execute();

		return $exec;
		
	}

	public function getRows($table, $fields = false, $innerJoin = false, $clause = false, $order = false, $mult = true){
	
		$this->database = new Database();

		$table = $this->prefix . $table; $where = '';
	
		$sql = "SELECT ";
		$sql .= $fields ? $fields . " " : "* ";
		$sql .= "FROM $table ";
		
		$sql .= $innerJoin ? $innerJoin : '';
		
		if(is_array($clause)){
			$where .= "WHERE ";

			$i=0;
			foreach($clause as $campo => $valor){
				$arr[] = substr($campo, -1) == '!' ? str_replace('!', '', $campo)." != :f".$i : "$campo = :f".$i;
				$i++;
			}
			$where .= implode(' AND ', $arr);
		}

		$sql .= (!empty($where)) ? $where : '';
		$sql .= $order ? ' '.$order : '';

		$this->database->query($sql);
		
		if(is_array($clause)){
			$j=0;
			foreach($clause as $campo => $valor){
				$this->database->bind(':f'.$j, $valor);
				$j++;
			}
		}

		if($mult){
			$rows = $this->database->resultset();
		}else{
			$rows = $this->database->single();
		}

		return $rows;
		
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
		echo '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><script type="text/javascript">alert("'.$msg.'"); window.location="'.$url.'";</script></head><body></body></html>';
	}

	public function mask($val, $mask){
		$maskared = '';
		$k = 0;
		for($i = 0; $i<=strlen($mask)-1; $i++){
			if($mask[$i] == '#'){
				if(isset($val[$k])){
					$maskared .= $val[$k++];
				}
			}else{
				if(isset($mask[$i])){
					$maskared .= $mask[$i];
				}
			}
		}
		return $maskared;
	}

	public function enviarEmail($html, $assunto, $para, $template = false){
			
		$headers = "MIME-Version: 1.1\n";
		$headers .= "Content-type: text/html; charset=utf-8\n";
		$headers .= "From: ".EMAILNAME." <".EMAIL.">\n";
		
		$assunto = '=?UTF-8?B?'.base64_encode($assunto).'?=';

		if($template){
			$html = $html;
		}
			
		if(!mail($para, $assunto, $html, $headers, "-r".EMAIL)){
			$headers .= "Return-Path: " . EMAIL . '\n';
			if(mail($para, $assunto, $html, $headers)){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}

	public function get_mes($mes){
		$meses = array("01" => "Janeiro",
			   "02" => "Fevereiro",
			   "03" => "Março",
			   "04" => "Abril",
			   "05" => "Maio",
			   "06" => "Junho",
			   "07" => "Julho",
			   "08" => "Agosto",
			   "09" => "Setembro",
			   "10" => "Outubro",
			   "11" => "Novembro",
			   "12" => "Dezembro");
			   
		return $meses[$mes];
	}

}
?>