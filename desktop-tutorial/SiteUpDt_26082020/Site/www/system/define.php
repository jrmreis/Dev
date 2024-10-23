<?php 
define('TITLE', 'Update Eng');
define('TITLE2', 'Update Eng');
if (file_exists('../development.env')) {
	define('BASE_URL', 'https://localhost/clientes/update/');
	define('URL', 'https://localhost/clientes/update/');
	define('URLAPP', 'https://localhost/clientes/update/');
	define('URLFILES', 'https://localhost/clientes/update/files/');
	define('URLSYSTEM', 'https://localhost/clientes/update/system/');
}else{
	define('BASE_URL', 'https://www.updatedeng.com.br/');
	define('URL', 'https://www.updatedeng.com.br/');
	define('URLAPP', 'https://www.updatedeng.com.br/');
	define('URLFILES', 'https://www.updatedeng.com.br/files/');
	define('URLSYSTEM', 'https://www.updatedeng.com.br/system/');
}
define('SS_NAME', 'updateeng');
define('AUTHOR', 'Criação de Sites - Sitevelox');
define('AUTHORSITE', 'https://www.sitevelox.com.br/');

define('DB_HOST', 'mysql.updatedeng.com.br');
define('DB_USER', 'updatedeng');
define('DB_PASS', 'uPdT1357'); #uPdT1357
define('DB_NAME', 'updatedeng');

define('EMAIL', 'contato@updatedeng.com.br');
define('EMAIL2', 'contato@updatedeng.com.br');
define('EMAILNAME', 'Update ENG');

define('PREFIX', 'up_');
?>