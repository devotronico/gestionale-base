<?php
// http://localhost/workspace/indirizzi/src/action-on-customer.php // DEBUG
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

// $action = 'clienti'; $id = 1; // DEBUG
switch ($action) {
case 'create':
$nome = $obj->nome;
$cognome = $obj->cognome;
$genere = $obj->genere;
$c_fiscale = $obj->c_fiscale;
$p_iva = $obj->p_iva;
$tel = $obj->tel;
$email = $obj->email;
$facebook = $obj->facebook;
$datetime = date('Y-m-d H:i:s');
$sql = "INSERT INTO `clienti2` (`genere`, `nome`, `cognome`, `c_fiscale`, `p_iva`, `tel`, `email`, `facebook`, `created_at`, `updated_at`)
VALUES ('$genere', '$nome', '$cognome', '$c_fiscale', '$p_iva', '$tel', '$email', '$facebook', '$datetime', '$datetime')";
if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysqli::query", "mess": "errore su clienti"}'); }
$idCliente = $conn->insert_id;
// die('{"clienteId":"' . $clienteId . '"}');
$message = 'Il cliente è stato creato con successo!';
die('{"messaggio":"' . $message . '", "idCliente":"' . $idCliente . '", "genere":"' . $genere . '", "nome":"' . $nome . '", "cognome":"' . $cognome . '", "c_fiscale":"' . $c_fiscale . '", "p_iva":"' . $p_iva . '", "tel":"' . $tel . '", "email":"' . $email . '", "facebook":"' . $facebook . '", "datetime":"' . $datetime . '"}');
break;

case 'update':
$idCliente = $obj->idCliente;
$nome = $obj->nome;
$cognome = $obj->cognome;
$genere = $obj->genere;
$c_fiscale = $obj->c_fiscale;
$p_iva = $obj->p_iva;
$tel = $obj->tel;
$email = $obj->email;
$facebook = $obj->facebook;

$sql = "UPDATE `clienti2` SET `genere` = '$genere', `nome`= '$nome', `cognome` = '$cognome', `c_fiscale` = '$c_fiscale', `p_iva` = '$p_iva', `tel` = '$tel', `email` = '$email', `facebook` = '$facebook', `updated_at` = NOW() WHERE `id` = '$idCliente'";
if (!$result = $conn->query($sql)) { die('{"status":"KO","case":"update", "mysql":"UPDATE"}'); }
die('{"idCliente":"' . $idCliente . '", "genere":"' . $genere . '", "nome":"' . $nome . '", "cognome":"' . $cognome . '", "c_fiscale":"' . $c_fiscale . '", "p_iva":"' . $p_iva . '", "tel":"' . $tel . '", "email":"' . $email . '", "facebook":"' . $facebook . '"}');
break;

case 'select-single': // NON UTILIZZATO
// $idCliente = $obj->idCliente;
// $sql = "SELECT `id`, `nome`, `cognome` FROM `clienti2` WHERE `id` = '$idCliente'";
// $res = $conn->query($sql);
// $row = $res->fetch_assoc();
// $data[] = array('value' => $row['id'], 'text' => $row['nome'] . ' - ' . $row['cognome']);
// die(JSON_encode($data));
break;

case 'select-all': // NON UTILIZZATO
// $data[] = array('value' => 0, 'text' => 'Seleziona un Cliente');
// $sql = "SELECT `id`, `nome`, `cognome` FROM `clienti2`";
// $res = $conn->query($sql);
// while ($row = $res->fetch_assoc()) {
//     $data[] = array('value' => $row['id'], 'text' => $row['nome'] . ' - ' . $row['cognome']);
// }
// die(JSON_encode($data));
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

