
<?php

header("Content-type: application/json");
require '../../conn.php';


$sql = "SELECT id, numero, cliente, importo FROM dich_intenti_ric";
if (!$result = $conn->query($sql)) { die("errore database"); }
while ($row = $result->fetch_assoc()) {
$id = $row['id'];
$idCliente = $row['cliente'];

$resB = $conn->query("SELECT * FROM clienti WHERE id = $idCliente");
$rowCliente = $resB->fetch_assoc();
$nomeFornitore = $rowCliente['ragione_sociale'];


$sql = "SELECT SUM(imponibile) AS `sum_imponibile` FROM `ftin` WHERE `dicIntenti` = $id"; // funziona su aruba
// la query sotto funziona solo in locale. sul database aruba da errore:
// $sql = "SELECT id, dicIntenti, SUM(imponibile) AS sum_imponibile FROM ftin WHERE dicIntenti = $id"; // originale/funziona solo in locale
$resResiduo = $conn->query($sql);
$rowResiduo = $resResiduo->fetch_assoc();
$residuo = $row['importo'] - $rowResiduo['sum_imponibilie']; // originale
$text = $idCliente . ' | ' . $residuo . '€ - ' . $rowCliente['ragione_sociale'] . ' - ' . $row['numero']; // originale
//$text = 'test';
$data[] = array('value' => $id, 'text' => $text);
}


die(JSON_encode($data));