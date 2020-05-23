<?php
$file = basename(__FILE__, '.php');
$errorRequire = '{"status": "error", "error": "file", "file": "' . $file . '", "message": "non trovato il file';
if (file_exists('../../config.php')) { require_once '../../config.php'; } else { die($errorRequire . ' config.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'collection.php')) { require_once BASE_DIR . 'collection.php'; } else { die($errorRequire . ' collection.php" , "line": "'.__LINE__.'"}'); }
?>
<?php
// $soggetto = 'clienti';
// if (isset($_GET['soggetto'])) { $soggetto = $_GET['soggetto'] === 'fornitori' ? $_GET['soggetto'] : 'clienti'; }
// $idSoggetto = 12;
// if (isset($_GET['id'])) { $idSoggetto = $_GET['id'] ? $_GET['soggetto'] : 12; }
// $sql = "SELECT * FROM $soggetto WHERE id = $idSoggetto";
// if (!$result = $conn->query($sql)) { die('KO-1'); }
// $row = $result->fetch_assoc();
// echo '<pre>';print_r($row);echo '</pre>';
// $row_count = $result->num_rows;
// if ($result->num_rows == 0) { die('Il cliente con id ' . $idSoggetto . ' non esiste'); }
?>
<h2 class="page-title">Anagrafiche Indirizzi</h2>
<!-- <INDIRIZZI> -->
<div id="core">
<!-- <CLIENTI> -->
<div id="clienti" class="wrapper wrapper-1">
<!-- <CLIENTI-EDIT> -->
<table id="clienti-table">
<tbody>
<tr>
    <th><p>Cliente</p></th>
    <td colspan="5">
    <select id="select-clienti">
        <option value="0">Seleziona un Cliente</option>
        <?php
        $sql = "SELECT `id`, `nome`, `cognome` FROM `clienti2`";
        $res = $conn->query($sql);
        while ($row = $res->fetch_assoc()) {
            $id = $row['id'];
            $nome = $row['nome'];
            $cognome = $row['cognome'];
            $anagrafica = $nome . ' - ' . $cognome;
            print '<option value="' . $id . '">' . $anagrafica . '</option>';
        }
        ?>
    </select>
    </td>
</tr>
<tr>
    <th><p>Id</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="id" id="id" readonly disabled></td>
    <th><p>Nome</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="nome" id="nome" pattern="[\x00-\xFF]{2,50}" required readonly disabled></td>
    <th><p>Cognome</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="cognome" id="cognome" pattern="[\x00-\xFF]{2,50}" required readonly disabled></td>
</tr>
<tr>
    <th><p>Genere</p></th>
    <td>
        <select type="text" class="cliente-form-element" name="genere" id="genere" required disabled>
            <option value="-1"></option>
            <option value="m">maschio</option>
            <option value="f">femmina</option>
        </td>
    <th><p>C. Fiscale</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="c_fiscale" id="c_fiscale" pattern="[a-zA-Z0-9]{11,16}" readonly disabled></td>
    <th><p>P. Iva</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="p_iva" id="p_iva" pattern="[0-9]{11}" readonly disabled></td>
</tr>
<tr>
    <th><p>Telefono</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="tel" id="tel" pattern="[\x00-\x7F]{2,50}" required readonly disabled></td>
    <th><p>Email</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="email" id="email" pattern=".+@.+[.]+.+" readonly disabled></td>
    <th><p>Facebook</p></th>
    <td><input type="text" class="cliente-form-element cliente-input" name="facebook" id="facebook" pattern="[\x00-\xFF]{2,50}" readonly disabled></td>
</tr>
</tbody>
</table>
<!-- </CLIENTI-EDIT> -->
</div>
<!-- </CLIENTI> -->
<?php
    require 'address-list.php';
    require 'cards.php';
?>
</div>
<!-- </INDIRIZZI> -->
<?php
if (file_exists('../../footer.php')) { require_once '../../footer.php'; } else { die('{"status": "error", "error": "footer", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file footer.php non trovato"}'); }
?>
<script>

</script>
<!-- <script src="../../js/mobile.js"></script> -->
<script src="../../js/menu.js"></script>
<script type="module" src="js/index.js"></script>
</body>
</html>