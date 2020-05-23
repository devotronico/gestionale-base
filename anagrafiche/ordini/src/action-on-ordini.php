<?php
// http://localhost/workspace/anagrafiche-ordini/src/action-on-ordini.php // DEBUG
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

switch ($action) {
case 'create':
$cliente_id = $obj->cliente_id;
$data_ordine = $obj->data_ordine;
$data_ritiro = $obj->data_ritiro;
$stato_ordine = $obj->stato_ordine;

$sql = "INSERT INTO `ordini` (`cliente_id`, `data_ordine`, `data_ritiro`, `stato_ordine`) VALUES ('$cliente_id', '$data_ordine', '$data_ritiro', '$stato_ordine')";
if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysql INSERT", "mess": "errore su creazione ordine"}'); }
$ordine_id = $conn->insert_id;
$message = 'Ordine Creato';

//---------------------------------------------------------+
// | %w | Numeric day of the week        | da 0 a 6        |
// | %j | Day of the month               | 1 to 31         |
// | %n | Numeric month, NO leading zero | 1 through 12    |
// | %y | Two digit for year             | Es: 09 for 2009 |
// | %H | Two digit for the hour         | da 00 a 23      |
// | %i | Two digit for minutes          | da 00 a 59      |
//---------------------------------------------------------+
$data_ordine_formatted = date_format(date_create($data_ordine), 'w-j-n-y-H:i');
$data_ritiro_formatted = date_format(date_create($data_ritiro), 'w-j-n-y-H:i');


die('{"messaggio":"' . $message . '", "ordine_id":"' . $ordine_id . '", "cliente_id":"' . $cliente_id . '", "data_ordine":"' . $data_ordine_formatted . '", "data_ritiro":"' . $data_ritiro_formatted . '", "stato_ordine":"' . $stato_ordine . '"}');
break;


case 'read_clienti':
$sql = "SELECT `id`, `nome`, `cognome` FROM `clienti2`";
if (!$res = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysql SELECT", "mess": "errore lettura clienti"}'); }
$data = [];
while ($row = $res->fetch_assoc()) {
    $id = $row['id'];
    $nome = $row['nome'];
    $cognome = $row['cognome'];
    $anagrafica = $nome . ' - ' . $cognome;
    $data[] = ['value'=> $id, 'text'=> $anagrafica];
}
die(JSON_encode($data));
break;


case 'read':
$cliente_id = $obj->cliente_id;
$data = ['cliente' => [], 'ordini' => []];
        $sql = "SELECT * FROM `clienti2` WHERE `id` = '$cliente_id'";
        if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysql SELECT", "mess": "errore lettura cliente"}'); }
        // if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysqli::query", "mess": "errore su clienti"}'); }
        $row = $result->fetch_assoc();
        $data['cliente'] = [
            'cliente_id' => $row['id'],
            // 'genere' => $row['genere'],
            'nome' => $row['nome'],
            'cognome' => $row['cognome'],
            // 'c_fiscale' => $row['c_fiscale'],
            // 'p_iva' => $row['p_iva'],
            'tel' => $row['tel'],
            // 'email' => $row['email']
        ];

        $sql = "SELECT *,
        DATE_FORMAT(`data_ordine`, '%w-%e-%c-%y-%H:%i') AS data_ordine_formatted,
        DATE_FORMAT(`data_ritiro`, '%w-%e-%c-%y-%H:%i') AS data_ritiro_formatted
        FROM `ordini` WHERE `cliente_id` = '$cliente_id' ORDER BY `data_ritiro` ASC";
        if (!$res = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysql SELECT", "mess": "errore lettura ordini"}'); }
        // if (!$res = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysqli::query", "mess": "errore su ordini"}'); }
        $ordine = [];
        while ($row = $res->fetch_assoc()) {
            $ordine = [
                'ordine_id' => $row['id'],
                'cliente_id' => $row['cliente_id'],
                'data_ordine' => $row['data_ordine_formatted'],
                'data_ritiro' => $row['data_ritiro_formatted'],
                'stato_ordine' => $row['stato_ordine'],
            ];

            $data['ordini'][] = $ordine;
        }

        die(JSON_encode($data));
break;


case 'read-test':
$ordine_id = $obj->ordine_id;
$sql = "SELECT * FROM `ordini_rows` WHERE `ordine` = '$ordine_id'";
if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysql SELECT", "mess": "errore TEST"}');  }
$row = $result->fetch_assoc();
$data = [
    'id' => $row['id'],
    'ordine' => $row['ordine'],
    'cod_product' => $row['cod_product'],
    'nome_product' => $row['nome_product'],
];
die(JSON_encode($data));
break;

case 'update':
$ordine_id = $obj->ordine_id;
$cliente_id = $obj->cliente_id;
$data_ordine = $obj->data_ordine;
$data_ritiro = $obj->data_ritiro;
$stato_ordine = $obj->stato_ordine;

$sql = "UPDATE `ordini` SET `data_ordine` = '$data_ordine', `data_ritiro`= '$data_ritiro', `stato_ordine` = '$stato_ordine' WHERE `id` = '$ordine_id'";
if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysql UPDATE", "mess": "errore modifica ordine"}'); }
// if (!$result = $conn->query($sql)) { die('{"status":"KO","error":"database","case":"update", "mysql":"UPDATE"}'); }
$message = 'Ordine Modificato';
die('{"messaggio":"' . $message . '", "ordine_id":"' . $ordine_id . '", "cliente_id":"' . $cliente_id . '", "data_ordine":"' . $data_ordine . '", "data_ritiro":"' . $data_ritiro . '", "stato_ordine":"' . $stato_ordine . '"}');
break;

case 'delete':
$ordine_id = $obj->ordine_id;
$cliente_id = $obj->cliente_id;
$data_ordine = $obj->data_ordine;
$data_ritiro = $obj->data_ritiro;
$stato_ordine = $obj->stato_ordine;
$sql = "DELETE FROM `ordini` WHERE `id` = '$ordine_id'";
if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysql DELETE", "mess": "errore cancellazione ordine"}'); }
$message = 'Ordine Cancellato';
die('{"messaggio":"' . $message . '", "ordine_id":"' . $ordine_id . '", "cliente_id":"' . $cliente_id . '", "data_ordine":"' . $data_ordine . '", "data_ritiro":"' . $data_ritiro . '", "stato_ordine":"' . $stato_ordine . '"}');
break;

default:
die('{"status":"ERROR","case":"caso non previsto"}');
    break;
}

