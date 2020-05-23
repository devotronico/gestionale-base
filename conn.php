<?php
if ( $_SERVER['SERVER_NAME'] === 'localhost' ) {
    // echo 'SVILUPPO';
    // $base = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/workspace/' . NAME . '/';
    // echo '<br>';
    // echo $base; // localhost:80/workspace/gestionale-mini/

    $servername = "localhost";
    $username = "root";
    // $password = "rootPsw";
    $password = "";
    $dbname = "tomatoware_local";
} else {
    // echo 'PRODUZIONE';
    // $base = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/' . NAME . '/';

    // PRODUZIONE
    // host: 89.46.111.115
    // username: Sql1351322
    // password: 5caq4i6j12
    // nomedatabase: Sql1351322_1

    $servername = '89.46.111.115';
    $username = 'Sql1351322';
    $password = '5caq4i6j12';
    $dbname = 'Sql1351322_1';
}

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}