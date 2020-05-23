<?php
$file = basename(__FILE__, '.php');
$errorRequire = '{"status": "error", "error": "file", "file": "' . $file . '", "message": "non trovato il file';
if (file_exists('../../config.php')) { require_once '../../config.php'; } else { die($errorRequire . ' config.php", "line": "'.__LINE__.'"}'); }
// if (file_exists(BASE_DIR . 'config.php')) { require_once BASE_DIR . 'config.php'; } else { die($errorRequire . ' config.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'collection.php')) { require_once BASE_DIR . 'collection.php'; } else { die($errorRequire . ' collection.php" , "line": "'.__LINE__.'"}'); }
?>
<h2 class="page-title">Ordini dei Clienti</h2>
<!-- <ORDINI> -->
<div id="core">
 <!-- <MESSAGE> -->
 <div id="message" class="wrapper wrapper-1"></div>
    <!-- </MESSAGE> -->

    <!-- <SELECT_CLIENTI> -->
    <div id="clienti" class="wrapper wrapper-0">
        <table id="clienti-table" class="section">
            <tbody>
                <tr>
                    <th><p id="cliente_id">Cliente</p></th>
                    <td>
                        <select id="clienti-select-lib">
                            <option value="0">Seleziona un Cliente</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- </SELECT_CLIENTI> -->

     <!-- <BTN_MODE> -->
    <div id="ordine-mode" class="wrapper wrapper-2">
        <div id="box-btn-mode" class="section">
            <button id="btn-mode-list" class="btn btn-primary btn-flat">Mostra Lista Ordini</button>
            <button id="btn-mode-add" class="btn btn-success btn-flat">Aggiungi Nuovo Ordine</button>
        </div>
    </div>
    <!-- </BTN_MODE> -->

<?php
require 'ordine-new.php';
require 'ordini-list.php';
?>
</div>
<!-- </ORDINI> -->
<?php
if (file_exists('../../footer.php')) { require_once '../../footer.php'; } else { die('{"status": "error", "error": "footer", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file footer.php non trovato"}'); }
?>
<script src="../../js/menu.js"></script>
<script type="module" src="js/index.js"></script>
</body>
</html>
