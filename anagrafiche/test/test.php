<?php
$file = basename(__FILE__, '.php');
$errorRequire = '{"status": "error", "error": "file", "file": "' . $file . '", "message": "non trovato il file';
if (file_exists('../../config.php')) { require_once '../../config.php'; } else { die($errorRequire . ' config.php", "line": "'.__LINE__.'"}'); }
// if (file_exists(BASE_DIR . 'config.php')) { require_once BASE_DIR . 'config.php'; } else { die($errorRequire . ' config.php", "line": "'.__LINE__.'"}'); }
if (file_exists(BASE_DIR . 'collection.php')) { require_once BASE_DIR . 'collection.php'; } else { die($errorRequire . ' collection.php" , "line": "'.__LINE__.'"}'); }
?>

<h2 class="page-title">TEST</h2>
<!-- <ORDINI> -->
<div id="core">
 <!-- <MESSAGE> -->
 <div id="message" class="wrapper wrapper-1"></div>
    <!-- </MESSAGE> -->

    <!-- <SELECT_CLIENTI> -->
<div id="clienti" class="wrapper wrapper-0">
    <div id="test" class="section">

    <!-- <div id="test-lib">
    <select id="select-lib">
      <option value="sospeso">sospeso</option>
      <option value="produzione">produzione</option>
      <option value="completato">completato</option>
      <option value="deposito">deposito</option>
      <option value="fatturato">fatturato</option>
      <option value="spedito">spedito</option>
    </select>
    <hr>
    <button id="btn-add-ordine" class="btn btn-primary btn-flat">BUTTON</button>
    </div> -->
<table>
    <tr class="row">
        <th class="col">text</th>
        <td class="col"><input type="text" name="text" id="text"></td>
    </tr>
    <tr class="row">
        <th class="col">number</th>
        <td class="col"><input type="number" name="number" id="number"></td>
    </tr>
    <tr class="row">
        <th class="col">password</th>
        <!-- <td class="col"><input type="password" name="password" id="password"></td> -->
    </tr>
    <tr class="row">
        <th class="col">radio</th>
        <td class="col"><input type="radio" name="radio" id="radio"></td>
    </tr>
    <tr class="row">
        <th class="col">range</th>
        <td class="col"><input type="range" name="range" id="range"></td>
    </tr>
    <tr class="row">
        <th class="col">tel</th>
        <td class="col"><input type="tel" name="tel" id="tel"></td>
    </tr>
    <tr class="row">
        <th class="col">color</th>
        <td class="col"><input type="color" name="color" id="color"></td>
    </tr>
    <tr class="row">
        <th class="col">checkbox</th>
        <td class="col"><input type="checkbox" name="checkbox" id="checkbox"></td>
    </tr>
    <tr class="row">
        <th class="col">email</th>
        <td class="col"><input type="email" name="email" id="email"></td>
    </tr>
    <!-- <tr class="row">
        <th class="col">time</th>
        <td class="col"><input type="time" name="time" id="time"></td>
    </tr>
    <tr class="row">
        <th class="col">week</th>
        <td class="col"><input type="week" name="week" id="week"></td>
    </tr>
    <tr class="row">
        <th class="col">date</th>
        <td class="col"><input type="date" name="date" id="date"></td>
    </tr>
    <tr class="row">
        <th class="col">datetime</th>
        <td class="col"><input type="datetime" name="datetime" id="datetime"></td>
    </tr>
    <tr class="row">
        <th class="col">datetime-local</th>
        <td class="col"><input type="datetime-local" name="datetime-local" id="datetime-local"></td>
    </tr>
    <tr class="row">
        <th class="col">reset</th>
        <td class="col"><input type="reset" value="reset"></td>
    </tr>
    <tr class="row">
        <th class="col">button</th>
        <td class="col"><input type="button" value="button"></td>
    </tr> -->
</table>


        </div>
    </div>
    <!-- </SELECT_CLIENTI> -->
</div>
<!-- </TEST> -->
<?php
if (file_exists('../../footer.php')) { require_once '../../footer.php'; } else { die('{"status": "error", "error": "footer", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file footer.php non trovato"}'); }
?>
<script src="../../js/menu.js"></script> 
</body>
</html>
