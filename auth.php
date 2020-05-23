<?php
session_start();

if (isset($_POST['password'])) {
    if (empty($_POST)) {
        header('Location:' . $base . 'index.php');
        die;
      } else if ($_POST['password'] == PASSWORD) {
        $_SESSION['password'] = $_POST['password'];
        $_SESSION['CREATED'] = time();
      } else {
        header('Location:' . $base . 'index.php');
        die;
      }
} else if (!isset($_SESSION['password']) || $_SESSION['password'] != PASSWORD) {
    header('Location:' . $base . 'index.php');
    die;
} 
else if (time() - $_SESSION['CREATED'] > 6000) {
    session_regenerate_id(true);
    session_destroy();
    session_unset();
    header('Location:' . $base . 'index.php');
    die;
}

//600 seconds = 10 minutes
?>