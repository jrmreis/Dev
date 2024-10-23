<?php
/*
	Desenvolvidor por Douglas Hideki Ishibashi Iga © Copyright 2014
	Última atualização 19/11/2014

	Gerador de serialize para a tabela *_filds
	Função chamada em class.administrador.php / @foreach_fields

	@array['tipo'] (Obrigatório):
		text 		= Campo tipo text
		ckeditor	= Campo tipo textarea CKEditor
		textarea	= Campo tipo textarea
		password 	= Campo tipo password
		spinner 	= Campo tipo spinner decimal
		password 	= Campo tipo password
		image 		= Campo tipo file para upload de imagens
		arquivo 	= Campo tipo file para upload de arquivos como PDF, XLS, DOC
		boolean 	= Campo tipo select com opções Sim e Não
		select 		= Campo tipo select. Obrigatório uso do @array['select']
		estado 		= Campo tipo select. Exibe os estados do Brasil a partir da tabela *_estados
		sql 		= Campo tipo select. Obrigatório uso do @array['sql']

	@array['campo'] (Obrigatório):
		Campo na Tabela usada

	@array['titulo'] (Obrigatório):
		Será exibido no label para o usuário

	@array['max'] (Opcional):
		Tamanho máximo de caracteres. Utilizado apenas em campos tipo text e password

	@array['mask'] (Opcional):
		Campo para formatação de Máscara. Ex: ##/##/#### (Campos com formatação de data)

	@array['help'] (Opcional):
		Texto de ajuda que será exibido abaixo do campo do input

	@array['classe'] (Opcional):
		Adiciona uma classe ao elemento

	@array['jsload'] (Opcional (True)):
		Caso TRUE ele não adiciona o valor ao primeiro SQL - Usando para carregar valores via AJAX

	@array['select'] (Obrigatório em @array['tipo'] = select):
		Matriz com os campo a serem exibidos pelo select.
		@key = Será exibido no valor do option
		@valor = Será exibido para o usuário
		Ex: array(key1 => valor1, key2 => valor2)
		<option value="key1">valor2</option>
		<option value="key2">valor2</option>

	@array['sql'] (Obrigatório em @array['tipo'] = sql):
		Array contendo os valores necessários para buscar na tabela e exibir em um select
		array[0] = Tabela a ser buscada
		array[1] = Campo na tabela que será exibido na Key*
		array[2] = Campo na tabela que será exibido no Valor*
		array[3] = Filtro para o where no sql. Ex: 'ativo = "1"'
		array[4] = Filtro para limit e orders. Ex: 'order by campo desc limit 10,0'
		array[5] = Campos necessários. Ex: '*, date_format(campo, "%d/%m/%Y")'
		array[6] = Campos inner join. Ex: 'inner join tabela™ on(tabela1.campo = tabela2.campo)'
		Ex: <option value="key*">valor*</option>

	Exemplos de Uso:
		$array[] = array(
					'tipo' => 'text',
					'campo' => 'titulo',
					'titulo' => 'Título:',
					'max' => '200',
					'mask' => '##/##/####',
					'help' => 'Texto de ajuda abaixo do campo.'
					);

		$array[] = array(
					'tipo' => 'select',
					'campo' => 'valores',
					'titulo' => 'Valores:',
					'select' => array('Opção dentro de Value 1' => 'Opção exibida no select 1',
									  'Opção dentro de Value 2' => 'Opção exibida no select 2')
					);

		$array[] = array(
					'tipo' => 'sql',
					'campo' => 'categoria_id',
					'titulo' => 'Categorias:',
					'sql' => array('categorias', 'id', 'titulo', 'ativo = "1"', 'limit 10', '*', 'inner join')
					);
*/

/*
	@serialize2
	Usado para casos onde existem imagens a serem cadastradas.
	Cada linha da equivale a 1 imagem.

	$array2[][0]: Campo da imagem na tabela
	$array2[][1]: Tipo de redimensionamento
		normal = Redimensiona proporcionalmente
		adaptive = Redimensiona e corta de acordo com as especificações

	$array2[][2]: Width - Largura
	$array2[][3]: Height - Altura
	$array2[][4]: Nome do campo que será pego para o nome da imagem. Caso não seja definido, irá com a data/hora do upload
*/
	$array[] = array(
				'tipo' => 'sql',
				'campo' => 'service_id',
				'titulo' => 'Serviços:',
				'sql' => array('services', 'id', 'title', 'deleted = "0"', '', '', '')
				);
$array[] = array(
			'tipo' => 'text',
			'campo' => 'title',
			'titulo' => 'Título:',
			'max' => '150'
			);

$array[] = array(
			'tipo' => 'ckeditor',
			'campo' => 'text',
			'titulo' => 'Texto:',
			);
			
$array[] = array(
			'tipo' => 'spinner',
			'campo' => 'sequence',
			'titulo' => 'Sequência de Exibição:',
			'help' => 'Ordem decrescente'
			);

$array[] = array(
			'tipo' => 'boolean',
			'campo' => 'active',
			'titulo' => 'Ativo:'
			);

$array2[] = array('image', 'adaptive', '1200', '375', 'title');

$serealize = serialize($array);
$serealize2 = serialize($array2);

if(isset($_GET['save']) && $_GET['save'] == true){
	include('inc/config.php');
	$id = 5;
	// $mga->update('fields', array('serialize', 'format_image'), array($serealize, $serealize2), 'id = "'.$id.'"')or die(mysql_error());
	$mga->update('fields', array('serialize'), array($serealize), 'id = "'.$id.'"')or die(mysql_error());
	header('Location: '.URL.'serialize.php');
	exit();
}
?>
<!DOCTYPE html>
<html lang="pt">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title></title>
<?php include('includes/header.php'); ?>
</head>

<body style="background:none; position:relative;">
<p style="text-align:center;"><a href="serialize.php?save=true" style="display:inline-block; padding: 10px; background: #000; color: #fff; text-transform: uppercase; width: 150px; height: 30px; margin: 10px auto; line-height: 30px; text-align:center;">Salvar</a></p>
<?php if(!empty($serealize)){ ?>
<pre style="width:80%; margin:0px auto; top:10%; position:absolute;left:0; right:0;"><?=$serealize?></pre>
<?php } ?>
<?php if(!empty($serealize2)){ ?>
<pre style="width:80%; margin:0px auto; top:50%; position:absolute;left:0; right:0;"><?=$serealize2?></pre>
<?php } ?>
</body>