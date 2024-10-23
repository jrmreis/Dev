<?php
require_once('class.db.php');
require_once('class.defaults.php');
class Sistema extends Defaults{

	private $database;

	public function __construct() {

		session_start();

		$this->database = new Database();

	}

	public function get_info($cod, $table = 'seo', $field = 'id'){
		$sql = $this->getRows($table, '', '', array($field => $cod), 'limit 1', false);

		return $sql;
	}

	public function get_texto($cod, $nlbr = false){
		$sql = $this->getRows('pages', 'texto', '', array('id' => $cod), 'limit 1', false);
		$texto = $sql['texto'];
		if($nlbr){
			echo nl2br($texto);
		}else{
			echo $texto;
		}
	}

	public function get_image($cod){
		$sql = $this->getRows('imagem', 'imagem', '', array('id' => $cod), 'limit 1', false);
		$img = $sql['imagem'];
		echo $img;
	}

	public function get_slider(){
		$sql = $this->getRows('slider', '', '', array('ativo' => '1'));
		if(sizeof($sql) > 0){
			$img = '';
			foreach($sql as $qry){
				if(is_file('files/slider/'.$qry['imagem'])){
					$pic = '<img src="'.URLFILES.'slider/'.$qry['imagem'].'" alt="'.$qry['titulo'].'">';
					if(!empty($qry['url'])){
						$target = !empty($qry['target']) ? ' target="'.$qry['target'].'"' : '';
						$pic = '<a href="'.$qry['url'].'"'.$target.'>'.$pic.'</a>';
					}
					$img .= $pic;
				}
			}

			echo '<div class="slider" style="display:none;">'.$img.'</div>';
		}
	}

	public function get_services(){
		$sql = $this->getRows('services', 'title, friend', '', array('active' => '1', 'deleted' => '0'));
		if(sizeof($sql) > 0){
			$li = '';
			foreach($sql as $qry){
				$li .= '<li><a href="'.URL.'servico/'.$qry['friend'].'">'.$qry['title'].'</a></li>';
			}

			echo $li;
		}
	}
	
	public function grava_contato(){
		$array = array('acao', 'mensagem');
		foreach($_POST as $campo => $valor){
			if(!in_array($campo, $array)){
				$coluna[$campo] = $valor;
			}
			$$campo = $valor;
		}
		
		$coluna['mensagem'] = $mensagem;
		
		$result = $this->insert('contatos', $coluna)or die(mysql_error());
		
		if($result){

			$id = $this->database->lastInsertId();

			$html = '<table width="750" border="1" align="center" cellspacing="0" cellpadding="5" style="font-family:Calibri, Verdana, Geneva, sans-serif; font-size:13px; color:#006899;">
			<tr>
			<td colspan="2" align="center" valign="top" bgcolor="#F4F4F4"><h3><strong>Update Eng<br />
			Formul&aacute;rio de Contato</strong></h3></td>
			</tr>
			<tr>
			<td width="202" align="right" valign="top" bgcolor="#F4F4F4"><strong>Data de Envio:</strong></td>
			<td width="522" align="left" valign="top">'.date('Y/m/d H:i:s').'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Nome:</strong></td>
			<td align="left" valign="top">'.$nome.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Email:</strong></td>
			<td align="left" valign="top">'.$email.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Telefone:</strong></td>
			<td align="left" valign="top">'.$telefone.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Mensagem:</strong></td>
			<td align="left" valign="top">'.nl2br($mensagem).'</td>
			</tr>
			</table>';

			$this->enviarEmail($html, 'Contato #'.$id.' - Update Eng', EMAIL2);

			return true;
		}else{
			return false;
		}
		
	}

	public function grava_newsletter(){
		$array = array('acao');
		foreach($_POST as $campo => $valor){
			if(!in_array($campo, $array)){
				$coluna[$campo] = $valor;
			}
			$$campo = $valor;
		}

		$sql = $this->getRows('newsletters', '', '', array('email' => $email), 'limit 1', false);

		if(!$sql){
			$result = $this->insert('newsletters', $coluna)or die(mysql_error());
		}else{
			return true;
		}
		
		if($result){

			if(!$sql){

				$id = $this->database->lastInsertId();

				$html = '<table width="750" border="1" align="center" cellspacing="0" cellpadding="5" style="font-family:Calibri, Verdana, Geneva, sans-serif; font-size:13px; color:#006899;">
				<tr>
				<td colspan="2" align="center" valign="top" bgcolor="#F4F4F4"><h3><strong>Update Eng<br />
				Assinatura de Newsletter</strong></h3></td>
				</tr>
				<tr>
				<td width="202" align="right" valign="top" bgcolor="#F4F4F4"><strong>Data de Cadastro:</strong></td>
				<td width="522" align="left" valign="top">'.date('Y/m/d H:i:s').'</td>
				</tr>
				<tr>
				<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Email:</strong></td>
				<td align="left" valign="top">'.$email.'</td>
				</tr>
				</table>';

				$this->enviarEmail($html, 'Assinatura de Newsletter - Update Eng', EMAIL2);

			}

			return true;
		}else{
			return false;
		}
		
	}

	public function grava_orcamento(){
		$array = array('acao', 'mensagem', 'cep1', 'cep2');
		foreach($_POST as $campo => $valor){
			if(!in_array($campo, $array)){
				$coluna[$campo] = $valor;
			}
			$$campo = $valor;
		}

		$cep = $_POST['cep1']. ' - '.$_POST['cep2'];
		
		$coluna['cep'] = $cep;
		$coluna['mensagem'] = $mensagem;
		
		$result = $this->insert('orcamentos', $coluna)or die(mysql_error());
		
		if($result){

			$id = $this->database->lastInsertId();

			$html = '<table width="750" border="1" align="center" cellspacing="0" cellpadding="5" style="font-family:Calibri, Verdana, Geneva, sans-serif; font-size:13px; color:#006899;">
			<tr>
			<td colspan="2" align="center" valign="top" bgcolor="#F4F4F4"><h3><strong>Update Eng<br />
			Formul&aacute;rio de Or&ccedil;amento</strong></h3></td>
			</tr>
			<tr>
			<td width="202" align="right" valign="top" bgcolor="#F4F4F4"><strong>Data de Envio:</strong></td>
			<td width="522" align="left" valign="top">'.date('Y/m/d H:i:s').'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>CNPJ:</strong></td>
			<td align="left" valign="top">'.$cnpj.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Nome:</strong></td>
			<td align="left" valign="top">'.$nome.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Email:</strong></td>
			<td align="left" valign="top">'.$email.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>CEP:</strong></td>
			<td align="left" valign="top">'.$cep.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Cargo:</strong></td>
			<td align="left" valign="top">'.$cargo.'</td>
			</tr>
			<tr>
			<td align="right" valign="top" bgcolor="#F4F4F4"><strong>Detalhes:</strong></td>
			<td align="left" valign="top">'.nl2br($mensagem).'</td>
			</tr>
			</table>';

			$this->enviarEmail($html, 'Orçamento #'.$id.' - Update Eng', EMAIL2);

			return true;
		}else{
			return false;
		}
		
	}
	
	/*
		$total = Total de registros na tabela inteira
		$url = URL para qual deve ser jogada a páginação
		$page = Página atual que se encontra
		$numperpage = Número de registros por página
			
		@return = Retorna uma array com a paginação e outra o (limit) para o SQL
	*/
		public function pagination($total, $url, $page = '', $numperpage = 5){

			$this->page = $this->cleanuserinput($page);

			$pag = (!empty($this->page)) ? $this->page : 1;
			$inicio = 0;

			if (!empty($pag)){
				$inicio = ($pag - 1) * $numperpage;
			}

			$num = ceil($total/$numperpage);

			for($i=1;$i<=$num;$i++){
				if($i==$pag){
					$li .= '<li class="current-page"><a href="'.$url.$i.'/">'.$i.'</a></li>';
				}else{
					$li .= '<li><a href="'.$url.$i.'/">'.$i.'</a></li>';
				}
			}

			$ul = '<ul class="pagination">'.$li.'</ul>';

			$limit = 'limit '.$inicio.','.$numperpage;

			$array = array('pagination' => $ul,
				'limit' => $limit);

			return $array;

		}

	}
	?>