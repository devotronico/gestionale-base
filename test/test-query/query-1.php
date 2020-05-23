<?php


require 'conn.php';
$piva = '144141203';
$sql = "SELECT id FROM fornitori WHERE partita_iva LIKE '02$piva'";
$result = $conn->query($sql);
if($result->num_rows > 0) {
    $dati = $result->fetch_assoc();
    $id = $dati['id'];
    echo $id;
}
// $piva = '02144141203';
// $sql = "SELECT id FROM fornitori WHERE partita_iva LIKE '%$piva'";
// $result = $conn->query($sql);
// if($result->num_rows > 0) {
//     $dati = $result->fetch_assoc();
//     $id = $dati['id'];
//     echo $id;
// }