<?php
function printMenu($current=null){

	/**
	* Define as páginas do módulo de administrador dentro do sidebar.
	*
	* @array[$1] 				 = Define o nome do primeiro bloco do menu.
	* @array[$1]['icon'] 		 = O icone do menu.
	* @array[$1]['url'] 		 = Caso não possua submenus, é a página que será redirecionado o menu
	* @array[$1]['pages'] 		 = Caso possua submenus, irá criar um submenu dentro do menu Pai.
	* @array[$1]['pages'][$1] 	 = Nome do submenu.
	* @array[$1]['pages'][$1] => = Página que será redirecionada.
	*
	*/
	
	/**
	* Exemplo
	*
	*
			"Página Incial"		=> array(
							"icon" 	=> "icon-reorder",
							"url" 	=> "index.php",
							"pages" => false
						),
			"Página Inicial 2"	=> array(
							"icon" 	=> "icon-home",
							"url"	=> false,
							"pages" => array(
									"Teste" 	=> "teste1.php",
									"teste2"	=> "teste2.php"
								)
						),				
	*/
	
	$menu = array(
			"Upload de Imagens" => array(
							"icon" 	=> "icon-upload",
							"url" 	=> 'upload.php',
							"pages" => false
						),
			"Relatórios" => array(
							"icon" 	=> "icon-signal",
							"url" 	=> false,
							"pages" => array(
									"Contatos" 	=> "rel-contatos.php",
									"Orçamentos" 	=> "rel-orcamentos.php",
									"Newsletter" 	=> "rel-newsletter.php"
								)
						)
	);
	
	$li = '';

	
	// Percorre toda a array do menu para fazer a impressão dentro do sidebar
	// ==============================
	foreach($menu as $menu1 => $arr1){
	
		$first = '';
		$second = '';
	
		if($arr1['icon'] == $current){
			$first = ' class="active"';
			$second = ' id="current"';
		}
	
		// Imprimi o primeiro li
		$li .= '<li'.$first.'>';
		$count = '';
		$ul = '';
		// Percorre a array de cada menu Pai
		foreach($arr1 as $param1 => $res1){
		
			/**
			* Define um parametro para cada campo;
			*
			* @param string $icon 	= Icone do menu.
			* @param string $url 	= URL do Menu Pai
			* @param string $pages 	= Páginas e Links dos Submenu
			*
			*/
			switch($param1){
			
				// Define o Icone
				case 'icon':
					$ic = '<i class="'.$res1.'"></i>';
					break;
					
				// Define a URL
				case 'url':
					
					// Verifica se existe Submenus
					if($res1){
						
						$link1=URL.$res1;
						$class1='';
						
					// Caso exista
					}else{
						$link1='#';
						$class1=' class="expand"';
					}
					
					// Monta o menu
					$cur1 = '<a href="'.$link1.'" title="'.$menu1.'"'.$class1.$second.'>';
					break;
				
				// Define o Submenu
				case 'pages':
					
					// Caso tenha submenus
					if($res1){
					
						$ul .= '<ul>';
						
						// Percorre a array de submenus para impressao
						foreach($res1 as $menu2 => $link2){
						
							// Guarda os menus
							$ul .= '<li><a href="'.$link2.'" title="'.$menu2.'">'.$menu2.'</a></li>';
							
							// Contador de Submenus
							$count++;
						}
						
						$ul .= '</ul>';
						
						// Guarda o número de submenus
						#$count = '<strong>'.$count.'</strong>';
						$count = '';
						
					}else{
						$ul = '';
						$num1 = '';
						$count = '';
					}
					
					break;
					
			}	// Switch
			
		}	// 2 Foreach
		
		// Monta toda a estrutura do menu
		$li .= $cur1 . $ic . $menu1 . $count . '</a>';
		$li .= $ul;
		$li .= '</li>';

	}	// 1 Foreach
	
	echo $li;	// Imprime o menu

}
?>