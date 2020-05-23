<?php
// header('Content-Type: application/json; charset=utf-8');
define('BASE_DIR', dirname(__FILE__) . '/');
define('NAME', 'gestionale-base');
define('PASSWORD', '1111');

if ($_SERVER['SERVER_NAME'] === 'localhost') {
    define('BASE_URL', 'http://localhost/workspace/' . NAME . '/'); // SVILUPPO
} else {
    define('BASE_URL', 'http://www.dmanzi.it/'); // PRODUZIONE
}