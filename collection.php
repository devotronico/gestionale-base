<?php
if (file_exists(BASE_DIR . 'auth.php')) { require_once BASE_DIR . 'auth.php'; } else { die($errorRequire . ' auth.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'conn.php')) { require_once BASE_DIR . 'conn.php'; } else { die($errorRequire . ' conn.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'head.php')) { require_once BASE_DIR . 'head.php'; } else { die($errorRequire . ' head.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'menu.php')) { require_once BASE_DIR . 'menu.php'; } else { die($errorRequire . ' menu.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'header.php')) { require_once BASE_DIR . 'header.php'; } else { die($errorRequire . ' header.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'components/debug.php')) { require_once BASE_DIR . 'components/debug.php'; } else { die($errorRequire . ' debug.php", "line": "'.__LINE__.'"}'); }
?>