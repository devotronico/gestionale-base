<?php

// incollare il link sotto nella barra degli indirizzi del browser:
// http://localhost/workspace/gestionale-mini/test/path/path-0.php


define('NAME', 'gestionale-mini');


echo $_SERVER['DOCUMENT_ROOT']; // C:/xampp_7_3_6/htdocs
echo '<br>--------------------------------------------------<br>';
echo $_SERVER['SERVER_NAME']; // localhost
echo '<br>--------------------------------------------------<br>';
echo __DIR__; // C:\xampp_7_3_6\htdocs\workspace\gestionale-mini\test\path
echo '<br>--------------------------------------------------<br>';
echo __FILE__; // C:\xampp_7_3_6\htdocs\workspace\gestionale-mini\test\path\path-0.php
echo '<br>--------------------------------------------------<br>';

define('__ROOT__', dirname(dirname(__FILE__))); 
echo __ROOT__; // C:\xampp_7_3_6\htdocs\workspace\gestionale-mini\test
// require_once(__ROOT__.'/config.php'); 
echo '<br>--------------------------------------------------<br>';




echo 'SERVER_NAME: ' . $_SERVER['SERVER_NAME']; // localhost
echo '<br>';
echo 'SERVER_PORT: ' . $_SERVER['SERVER_PORT']; // 80
echo '<br>';

if ( $_SERVER['SERVER_NAME'] === 'localhost' ) {
    echo 'SVILUPPO';
    $base = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/workspace/' . NAME . '/';
    echo '<br>';
    echo $base; // localhost:80/workspace/gestionale-mini/
} else {
    echo 'PRODUZIONE';
    $base = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/' . NAME . '/';
}
echo '<br>--------------------------------------------------<br>';
echo '<br>--------------------------------------------------<br>';
// Ottenere PROTOCOLLO
$protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === true ? 'https://' : 'http://';
echo 'protocol: ' . $protocol; // http://
echo '<br>';

echo 'base: ' . $base;
echo '<br>';
$path = $protocol . $base;
echo 'path: ' . $path;
echo '<br>';
$dashnuovi = $path . 'dashnuovi.php';
echo 'dashnuovi: ' . $dashnuovi;
echo '<br>';

// if (file_exists($dashnuovi . 'menu.php')) { require_once $protocol . $base . 'menu.php'; } else { die('{"status": "error", "line": "'.__LINE__.'", "message": "file menu.php non trovato"}'); }
// if (file_exists($menu)) { require_once $menu; } else { die('{"status": "error", "line": "'.__LINE__.'", "message": "file menu.php non trovato"}'); }
// require_once $path . 'menu.php';
echo '<br>--------------------------------------------------<br>';

//---
// PRODUZIONE
// l'echo a $_SERVER['DOCUMENT_ROOT'] è eseguito nel percorso

// echo $_SERVER['DOCUMENT_ROOT']; // C:/xampp/htdocs
// echo '<br>--------------------------------------------------<br>';

?>