<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

<!-- <FAVICON> -->
<link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192" href="img/favicon/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="img/favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
<link rel="manifest" href="img/favicon/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="img/favicon/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
<!-- </FAVICON> -->

<link rel="stylesheet" href="css/menu.css">
<link rel="stylesheet" href="css/page.css">
<title>Dashboard</title>
<style>
td {
    text-align: center;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
    border: 5px solid white;
    width: 200px;
    height: 100px;
    vertical-align: middle;
    cursor: pointer;
}
.contratto { background-color: green; color: white; width: 200px; }
.anagrafico { background-color: #DC143C; color: white; }
.contabile { background-color: #6495ED; color: white; }
.new { background-color: #333; color: white }
.contrattoL { background-color: green; color: white; width: 200px; }
.anagraficoL { background-color: #DC143C; color: white; }
.contabileL { background-color: #6495ED; color: white; }
.classi { background-color: #DAA520; color: white; }
.tuttiL { background-color: #F08080; color: white; }
.classiL { background-color: #DAA520; color: white; }
</style>
<script>

function filtra(tipologia) {
    var tipo = tipologia;
    let mostra;
    switch(tipo){
    case 'contabile' : var elimina = document.querySelectorAll(".anagrafico, .contratto, .classi");  mostra = document.querySelectorAll(".contabile");
        break;
    case 'anagrafico': var elimina = document.querySelectorAll(".contabile, .contratto, .classi");	 mostra = document.querySelectorAll(".anagrafico");
        break;
    case 'contratto': var elimina = document.querySelectorAll(".anagrafico, .contabile, .classi");  mostra = document.querySelectorAll(".contratto");
        break;
    case 'classi': var elimina = document.querySelectorAll(".anagrafico, .contabile, .contratto");  mostra = document.querySelectorAll(".classi");
    break;
    case 'new': var elimina = document.querySelectorAll(".new"); mostra = document.querySelectorAll('.new');
        break;
    case 'tutti': var elimina = document.querySelectorAll(".nessuno");  mostra = document.querySelectorAll(".contratto, .anagrafico, .contabile, .classi");
        break;
    }

    for (var i = 0, n = elimina.length; i < n; i++) {
    var eliminato = elimina[i];
    eliminato.style.visibility = 'hidden';
    }

    for (var j = 0, m = mostra.length; j < m; j++) {
        var mostrato = mostra[j];
        mostrato.style.visibility = 'visible';
    }
}

function goBack() {
  window.history.go(-1);
}
</script>
</head>
<body>
<!-- <CONTAINER> -->
<div class="container">
<?php
$file = basename(__FILE__);
if (file_exists('menu.php')) { require_once 'menu.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file menu.php non trovato"}'); }
if (file_exists('conn.php')) { require_once 'conn.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file conn.php non trovato"}'); }
if (file_exists('header.php')) { require_once 'header.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file header.php non trovato"}'); }
?>
<h2 class="page-title">Nuovo</h2>
<table>
<tr>
<td class="contabileL" onclick="return filtra('contabile')">
<h2>Contabilità</h2>
</td>
<td class='anagraficoL' onclick="return filtra('anagrafico')">
<h2>Anagrafiche</h2>
</td>
<td class='contrattoL' onclick="return filtra('contratto')">
<h2>Contratti</h2>
</td>
<td class='classiL' onclick="return filtra('classi')">
<h2>Classi</h2>
</td>
<td class='tuttiL' onclick="return filtra('tutti')">
<h2>Mostra tutti</h2>
</td>
</tr>
</table>
<br>
<?php
// SVILUPPO
//echo $_SERVER['DOCUMENT_ROOT']; // C:/xampp/htdocs 
//---
// PRODUZIONE
//echo $_SERVER['DOCUMENT_ROOT']; //
?>
<table>
    <tr>
        <td class='contabile' onclick="window.location.href='xxdati/ncarnetdati.php'">
        <h2>Carnet Assegni</h2>
        </td>
        <td class='anagrafico' onclick="window.location.href='xxdati/ncdati.php'">
        <h2>Cliente</h2>
        </td>
        <td class='contratto' onclick="window.location.href='xxdati/ncndati.php'">
        <h2>Contratto</h2>
        </td>
        <td class='contabile' onclick="window.location.href='xxdati/nspedDash.php'">
        <h2>DDT in uscita</h2>
        </td>
        <td class='contabile' onclick="window.location.href='xxdati/dicintdati.php'">
        <h2>Dichiarazione di intento emessa</h2>
        </td>
	</tr>
    <tr>
        <td class="contabile" onclick="window.location.href='xxdati/fattura-create.php'"><h2>Fattura Emessa</h2></td>
        <!-- <td class='contabile' onclick="window.location.href='xxdati/nfatDash.php'"><h2>Fattura Emessa <small>vecchia versione</small></h2></td> -->
        <td class='contabile' onclick="window.location.href='xxdati/nfatindati.php'"><h2>Fattura Ricevuta</h2></td>
        <td class='contabile' onclick="window.location.href='xxdati/nfondati.php'">
        <h2>Fondo Monetario</h2>
        </td>
        <td class='anagrafico' onclick="window.location.href='xxdati/nfdati.php'">
        <h2>Fornitore</h2>
        </td>
        <td class='anagrafico' onclick="window.location.href='xxdati/nimbdati.php'">
        <h2>Imballaggio</h2>
        </td>
    </tr>
    <tr>
        <td class='contabile' onclick="window.location.href='xxdati/ncindati.php'">
        <h2>Nota Credito Emessa</h2>
        </td>
        <td class='contratto' onclick="window.location.href='xxdati/norfdati.php'">
        <h2>Ordine Fornitore</h2>
        </td>
        <td class='contratto' onclick="window.location.href='xxdati/nordati.php'">
        <h2>Ordine Cliente</h2>
        </td>
        <td class='contabile' onclick="window.location.href='xxdati/parcdati.php'">
        <h2>Parcella</h2>
        </td>
        <td class='anagrafico' onclick="window.location.href='xxdati/npfdati.php'">
        <h2>Prodotto</h2>
        </td>
    </tr>
    <tr>
        <td class='anagrafico' onclick="window.location.href='xxdati/nvetdati.php'">
        <h2>Vettore</h2>
        </td>
        <td class='contabile' onclick="window.location.href='xxdati/ncricdati.php'">
        <h2>Nota Credito Ricevuta</h2>
        </td>
        <td class='classi' onclick="window.location.href='xxdati/classPF.php'">
        <h2>Classe Prodotti Finiti</h2>
        </td>
        <td class='classi' onclick="window.location.href='xxdati/classIMB.php'">
        <h2>Classe Imballaggi</h2>
        </td>
        <td class='classi' onclick="window.location.href='xxdati/areaGeog.php'">
        <h2>Area Geografica</h2>
        </td>
    </tr>
    <tr>
        <td class='anagrafico' onclick="window.location.href='xxdati/depDati.php'">
        <h2>Deposito</h2>
        </td>
        <td class='contratto' onclick="window.location.href='xxdati/scaDepDati.php'">
        <h2>Scarico Deposito</h2>
        </td>

        <td class='contabile' onclick="window.location.href='xxdati/dicintdatirice.php'">
        <h2>Dichiarazione di intento ricevuta</h2>
        </td>
        <td class='anagrafico' onclick="window.location.href='xxdati/nlotto.php'">
        <h2>Lotto</h2>
        </td>
        </td>
        <td class='anagrafico' onclick="window.location.href='xxdati/nbrand.php'">
        <h2>Brand</h2>
        </td>
    </tr>
    <tr>
        <td class='contabile' onclick="window.location.href='xxdati/datipagamento.php'">
        <h2>Pagamento</h2>
        </td>
        <td class='contabile' onclick="window.location.href='xxdati/datiincasso.php'">
        <h2>Incasso</h2>
        </td>
        <td class='anagrafico' onclick="window.location.href='xxdati/datidistruzione.php'">
        <h2>Distruzione Materiale</h2>
        </td>

        <td class='anagrafico' onclick="window.location.href='xxdati/merceEtichettata.php'">
        <h2>Merce Etichettata</h2>
        </td>
        </td>
        <td class='contabile' onclick="window.location.href='xxdati/importZipFront.php'">
        <h3>Importa fattura elettronica manualmente</h3>
        </td>
    </tr>
    <tr>
        <td class='contabile' onclick="window.location.href='xxdati/nfatDash.php'"><h2>Fattura Emessa <small>con Ordine</small></h2></td>
        <!-- <td class="new" onclick="window.location.href='xxdati/fattura-create.php'"><h2>Fattura Emessa <small>nuova versione</small></h2></td> -->
    </tr>

</table>
<?php
if (file_exists('footer.php')) { require_once 'footer.php'; } else { die('{"status": "error", "error": "footer", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file footer.php non trovato"}'); }
?>
<script src="js/menu.js"></script>
</body>
</html>


