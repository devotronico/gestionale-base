<?php
// http://localhost/workspace/indirizzi/src/query-on-user-action.php
header('Content-Type: application/json; charset=utf-8');
// header("Content-type: application/json");

$file = basename(__FILE__);

if (!isset($_POST)) { die('{ "status": "error", "error": "http", "file": "' . $file . '", "line": "'.__LINE__.'", "mess": "metodo request errato o assente"}'); }
if (empty($_POST)) { die('{ "status": "error", "error": "http", "file": "' . $file . '", "line": "'.__LINE__.'", "mess": "metodo POST vuoto"}'); }
if (!filter_has_var(INPUT_POST, 'data')) { die('{ "status": "error", "error": "http", "file": "' . $file . '", "line": "'.__LINE__.'", "mess": "metodo POST con indice data non trovata"}'); }

$str = $_POST['data'];
$obj = json_decode($str);
$query = $obj->query;
$id = $obj->id;

$str = '{"status": "error", "file": "' . $file . '", "switch": "'.$query.'", "filter": "'.$id.'",'; // DEBUG
if ( file_exists('../../../conn.php')  ) { require_once '../../../conn.php'; } else { die($str . '"line": "'.__LINE__.'", "error": "php", "mess": "file conn.php non trovato"}'); }

switch ($query) {
    case 'clienti':
        $data = ['cliente' => [], 'indirizzi' => []];
        $sql = "SELECT * FROM `clienti2` WHERE `id` = $id";
        if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysqli::query", "mess": "errore su clienti"}'); }
        $row = $result->fetch_assoc();
        $data['cliente'] = [
            'id' => $row['id'],
            'genere' => $row['genere'],
            'nome' => $row['nome'],
            'cognome' => $row['cognome'],
            'c_fiscale' => $row['c_fiscale'],
            'p_iva' => $row['p_iva'],
            'tel' => $row['tel'],
            'email' => $row['email']
        ];

        $sql = "SELECT * FROM `indirizzi` WHERE `cliente_id` = $id ORDER BY `principale` ASC";
        if (!$res = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysqli::query", "mess": "errore su indirizzi"}'); }
        $address = [];
        while ($row = $res->fetch_assoc()) {
            $address = [
                'indirizzoId' => $row['id'],
                'principale' => $row['principale'],
                'via' => $row['via'],
                'civico' => $row['civico'],
                'cap' => $row['cap'],
                'comune' => $row['comune'],
                'provincia' => $row['provincia'],
                'nazione' => $row['nazione']
            ];

            $data['indirizzi'][] = $address;

        }
        die(JSON_encode($data));
        break;
    case 'indirizzi':
        $soggetto = $obj->soggetto;
        $sql = "SELECT id, indirizzo, altriIndirizzi FROM $soggetto WHERE id = $id";
        if (!$result = $conn->query($sql)) { die($str . '"line": "'.__LINE__.'", "error": "mysqli::query", "mess": "errore su indirizzi"}'); }
        $data = [];
        $row = $result->fetch_assoc();
        $data[] = array('value' => $row['indirizzo'], 'text' => $row['indirizzo']);

        if (!empty($row['altriIndirizzi'])) {
            $elencoIndirizzi = explode(';', $row['altriIndirizzi']);
            for ($i=0; $i<count($elencoIndirizzi); $i++) {
                $data[] = array('value' => $elencoIndirizzi[$i], 'text' => $elencoIndirizzi[$i]);
            }
        }
        die(JSON_encode($data, JSON_UNESCAPED_UNICODE));
        break;
    case 'indirizzi-new':
        // $sql = "SELECT * FROM `indirizzi` WHERE `cliente_id` = $id";// ORDER BY `principale` DESC";
        $sql = "SELECT * FROM `indirizzi` WHERE `cliente_id` = $id ORDER BY `principale` ASC";
        if (!$result = $conn->query($sql)) { die('{ "error": "msqli" }'); }
        $data = [];
        $row = $result->fetch_assoc();
        while ($row = $result->fetch_assoc()) { $data[] = array('value' => $row['id'], 'text' => $row['indirizzo']); }
        die(JSON_encode($data));
        break;
    default:
        die($str . '"line": "'.__LINE__.'", "error": "post", "mess": "Il valore passato non viene gestito"}');
        break;
}
