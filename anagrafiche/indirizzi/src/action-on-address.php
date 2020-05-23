<?php
// http://localhost/workspace/indirizzi/src/action.php // DEBUG
header('Content-Type: application/json; charset=utf-8');
// header("Content-type: application/json");

// echo '<pre>';print_r($_POST);echo '</pre>'; die;// DEBUG

$file = basename(__FILE__);

if (!isset($_POST)) { die('{ "status": "error", "error": "http", "file": "' . $file . '", "line": "'.__LINE__.'", "mess": "metodo request errato o assente"}'); }
if (empty($_POST)) { die('{ "status": "error", "error": "http", "file": "' . $file . '", "line": "'.__LINE__.'", "mess": "metodo POST vuoto"}'); }
if (!filter_has_var(INPUT_POST, 'data')) { die('{ "status": "error", "error": "http", "file": "' . $file . '", "line": "'.__LINE__.'", "mess": "metodo POST con indice data non trovata"}'); }

$str = $_POST['data'];
$obj = json_decode($str);
$action = $obj->action;

$str = '{"status": "error", "file": "' . $file . '", "switch": "'.$action.'",'; // DEBUG
if ( file_exists('../../../conn.php')  ) { require_once '../../../conn.php'; } else { die($str . '"line": "'.__LINE__.'", "error": "php", "mess": "file conn.php non trovato"}'); }

// id, principale, cliente_id, indirizzo, via, civico, cap, comune, provincia
// action: 'add', principale, clienteId, indirizzo, via, civico, cap, comune, provincia, nazione
switch ($action) {
case 'add':
$principale = $obj->principale;

if ($principale === 1) {
    $sql = "SELECT `id` FROM `indirizzi` WHERE `principale` = 1";
    if (!$result = $conn->query($sql)) { die('{"status":"KO", "case":"add", "mysql":"SELECT"}}'); }
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $indirizzoId = $row['id'];
        $sql = "UPDATE `indirizzi` SET `principale` = 0 WHERE `id` = '$indirizzoId'";
        if (!$result = $conn->query($sql)) { die('{"status":"KO", "case":"add", "mysql":"UPDATE"}'); }
    }
}

$clienteId = $obj->clienteId;
$indirizzo = $obj->indirizzo;
$via = $obj->via;
$civico = $obj->civico;
$cap = $obj->cap;
$comune = $obj->comune;
$provincia = $obj->provincia;
$nazione = $obj->nazione;
$sql = "INSERT INTO `indirizzi` (`cliente_id`, `principale`, `indirizzo`, `via`, `civico`, `cap`, `comune`, `provincia`, `nazione`) VALUES ('$clienteId', '$principale', '$indirizzo', '$via', '$civico', '$cap', '$comune', '$provincia', '$nazione')";
if (!$result = $conn->query($sql)) { die('{"status":"KO","case":"add", "mysql":"INSERT"}'); }
$indirizzoId = $conn->insert_id;
die('{"indirizzoId":"' . $indirizzoId . '", "principale":"' . $principale . '", "via":"' . $via . '", "civico":"' . $civico . '", "cap":"' . $cap . '", "comune":"' . $comune . '", "provincia":"' . $provincia . '", "nazione":"' . $nazione . '"}');
break;

case 'update':
$principale = $obj->principale;
if ($principale === 1) {
    $sql = "SELECT `id` FROM `indirizzi` WHERE `principale` = 1";
    if (!$result = $conn->query($sql)) { die('{"status":"KO","case":"update", "mysql":"SELECT"}}'); }
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $indirizzoId = $row['id'];
        $sql = "UPDATE `indirizzi` SET `principale` = 0 WHERE `id` = '$indirizzoId'";
        if (!$result = $conn->query($sql)) { die('{"status":"KO", "case":"update", "mysql":"UPDATE"}'); }
    }
}

$indirizzoId = $obj->indirizzoId;
$indirizzo = $obj->indirizzo;
$via = $obj->via;
$civico = $obj->civico;
$cap = $obj->cap;
$comune = $obj->comune;
$provincia = $obj->provincia;
$nazione = $obj->nazione;
$sql = "UPDATE `indirizzi` SET `principale` = '$principale', `indirizzo`= '$indirizzo', `via` = '$via', `civico` = '$civico', `cap` = '$cap', `comune` = '$comune', `provincia` = '$provincia', `nazione` = '$nazione' WHERE `id` = '$indirizzoId'";
if (!$result = $conn->query($sql)) { die('{"status":"KO","case":"update", "mysql":"UPDATE"}'); }
die('{"indirizzoId":"' . $indirizzoId . '", "principale":"' . $principale . '", "via":"' . $via . '", "civico":"' . $civico . '", "cap":"' . $cap . '", "comune":"' . $comune . '", "provincia":"' . $provincia . '", "nazione":"' . $nazione . '"}');
break;

case 'delete':
$idAddress = $obj->idAddress;
$sql = "DELETE FROM `indirizzi` WHERE `id` = '$idAddress'";
if (!$result = $conn->query($sql)) { die('{"status":"KO","case":"delete", "mysql":"DELETE"}'); }
die('{"status":"OK","case":"delete"}');
break;

default:
die('{"status":"ERROR","case":"caso non previsto"}');
    break;
}

