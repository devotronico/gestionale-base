<?php
// SVILUPPO
// l'echo a $_SERVER['DOCUMENT_ROOT'] è eseguito nel percorso
// 
echo $_SERVER['DOCUMENT_ROOT']; // C:/xampp/htdocs
echo '<br>--------------------------------------------------<br>';
echo $_SERVER['SERVER_NAME']; // 192.168.1.87
echo '<br>--------------------------------------------------<br>';
echo __DIR__; // 
echo '<br>--------------------------------------------------<br>';
echo __FILE__; // 
echo '<br>--------------------------------------------------<br>';

define('__ROOT__', dirname(dirname(__FILE__))); 
echo __ROOT__; // C:\xampp\htdocs\workspace
// require_once(__ROOT__.'/config.php'); 
echo '<br>--------------------------------------------------<br>';




echo 'SERVER_NAME: ' . $_SERVER['SERVER_NAME']; // 192.168.1.87
echo '<br>';
echo 'SERVER_PORT: ' . $_SERVER['SERVER_PORT']; // 80
echo '<br>';

if ( $_SERVER['SERVER_NAME'] === '192.168.1.87' ) {
    echo 'SVILUPPO'; // 
    $base = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/workspace/IMCA/';
} else {
    echo 'PRODUZIONE'; // http://192.168.1.68:8080/IMCA/menu.php
    $base = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/IMCA/';
}
echo '<br>';
// Ottenere PROTOCOLLO
$protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === true ? 'https://' : 'http://';
echo 'protocol: ' . $protocol; // http://
echo '<br>';

echo 'base: ' . $base; // 
echo '<br>';
$path = $protocol . $base;
echo 'path: ' . $path; //  
echo '<br>';
$dashnuovi = $path . 'dashnuovi.php';
echo 'dashnuovi: ' . $dashnuovi; //  
echo '<br>';

// if (file_exists($dashnuovi . 'menu.php')) { require_once $protocol . $base . 'menu.php'; } else { die('{"status": "error", "line": "'.__LINE__.'", "message": "file menu.php non trovato"}'); }
// if (file_exists($menu)) { require_once $menu; } else { die('{"status": "error", "line": "'.__LINE__.'", "message": "file menu.php non trovato"}'); }
require_once $path . 'menu.php';
echo '<br>--------------------------------------------------<br>';



// require_once(): http:// wrapper is disabled in the server configuration by allow_url_include=0
// https://stackoverflow.com/questions/26281426/http-wrapper-is-disabled-in-the-server


//---
// PRODUZIONE
// l'echo a $_SERVER['DOCUMENT_ROOT'] è eseguito nel percorso
// http://192.168.1.68:8080/IMCA/test.php
// echo $_SERVER['DOCUMENT_ROOT']; // C:/xampp/htdocs
// echo '<br>--------------------------------------------------<br>';
// $base = "http://192.168.1.87/workspace/IMCA"; // SVILUPPO
// $base = "http://192.168.1.68:8080/IMCA"; // PRODUZIONE
?>