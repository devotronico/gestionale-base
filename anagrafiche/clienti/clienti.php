<?php
$file = basename(__FILE__, '.php');
$errorRequire = '{"status": "error", "error": "file", "file": "' . $file . '", "message": "non trovato il file';
if (file_exists('../../config.php')) { require_once '../../config.php'; } else { die($errorRequire . ' config.php", "line": "'.__LINE__.'"}'); }
// if (file_exists(BASE_DIR . 'config.php')) { require_once BASE_DIR . 'config.php'; } else { die($errorRequire . ' config.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'collection.php')) { require_once BASE_DIR . 'collection.php'; } else { die($errorRequire . ' collection.php" , "line": "'.__LINE__.'"}'); }
?>
<h2 class="page-title">Carica Nuovo Cliente</h2>
<!-- <CLIENTI> -->
<div id="core">
<div id="clienti-mode" class="wrapper wrapper-0">
    <div class="box-btn-mode" class="section">
        <button class="btn btn-mode-create btn-mode btn-primary btn-flat" disabled>Crea un Cliente</button>
        <button class="btn btn-mode-revise btn-mode btn-warning btn-flat">Modifica i Clienti</button>
    </div>
</div>

<div id="message" class="wrapper wrapper-1"></div>
<div id="clienti" class="wrapper wrapper-2">
<?php
require 'mode-create.php';
require 'mode-revise.php';
?>
</div>
</div>
<!-- </CLIENTI> -->
<?php
if (file_exists('../../footer.php')) { require_once '../../footer.php'; } else { die('{"status": "error", "error": "footer", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file footer.php non trovato"}'); }
?>
<script>
function goBack() {
  window.history.go(-1);
}
</script>
<!-- <script src="../../js/mobile.js"></script> -->
<script src="../../js/menu.js"></script> 
<script type="module" src="js/index.js"></script>
</body>
</html>



