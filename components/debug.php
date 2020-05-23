<?php

/**
 * RACCOLTA DI FUNZIONI DI DEBUG
 */


function de($var) {
    foreach($GLOBALS as $var_name => $value) {
        if ($value === $var) {
          echo $var_name . ': ' . $var . '<br>';
          break;
        }
    }
}

function da($arr) {
    echo '<pre>';
    print_r($arr);
    echo '</pre>';
    die;
}

/**
 * Undocumented function
 *
 * @param [type] $var
 * @return void
 */
function dd($var) {
  $test = '';
  if (is_null($var)) { $test .= '<br>è null'; } else  { $test .= '<br>non è null'; }
  if (isset($var)) { $test .= '<br>è settata'; } else  { $test .= '<br>non è settata'; }
  if (!$var) { $test .= '<br>è false'; } else { $test .= '<br>non è false'; }
  if (empty($var)) { $test .= '<br>è empty'; } else { $test .= '<br>non è empty'; }
  $type = gettype($var);
  $test .= '<br>il tipo è: ' . $type;
  if ($type !== 'array') {
      $test .= '<br>valore: ' . $var;
  } else {
      $test .= '<br>l\'array è lungo: ' . count($var);
  }
  echo $test;
}
// function dd($var) {
//   $test = '';
//   $test .= '<br>valore: ' . $var;
//   if (is_null($var)) { $test .= '<br>null'; }
//   if (isset($var)) { $test .= '<br>settata'; }
//   if (!$var) { $test .= '<br>false'; }
//   if (empty($var)) { $test .= '<br>empty'; }
//   echo $test;
// }




/*
Debug 2
var_export( $ );
echo '<pre>';print_r($var); echo '</pre>'; die;
echo '<pre>';var_dump( $ );  echo '</pre>'; die;
if ( isset( $ )) { var_dump( $ ); echo '<pre>';print_r( $ ); die(); }
*/



/*
// Debug 3
define('LOOP',10000000);

// TEST 1
function fn1() {
  for($i=0; $i<LOOP; ++$i) {}
}

// TEST 2
function fn2() {
  for($j=0; $j<LOOP; ++$j) {}
}

// TEST 1
$start = microtime(true);
fn1();
$stop = microtime(true);
$time1 = $stop - $start;

// TEST 2
$start = microtime(true);
fn2();
$stop = microtime(true);
$time2 = $stop - $start;

echo $time1;
echo "<br>--------------<br>";
echo $time2;
*/