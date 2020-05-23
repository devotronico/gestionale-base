<?php
if (file_exists('config.php')) { require_once 'config.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file config.php non trovato"}'); }
if (file_exists('auth.php')) { require_once 'auth.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file auth.php non trovato"}'); }
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
<link rel="stylesheet" href="css/vars.css">
<link rel="stylesheet" href="css/menu.css">
<link rel="stylesheet" href="css/buttons.css">
<link rel="stylesheet" href="css/page.css">
<title>Dashboard</title>
<style>

@media(min-width:0) {
#time { font-size: 2rem; }
h1 { text-align: center; font-size: 2rem;}
/* h2 { margin-bottom: 0.5rem; opacity: 0.6; } */

/* .page-bg-color-0 { background-color: transparent; } */

.content {
	box-shadow: none;
	/* background-color: transparent; */
}

.content {
  /* The image used */
  /* background-image: url("img_girl.jpg"); */
  /* Full height */
  /* height: 100%; */
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.page {
	/* box-shadow: none; */
	background-color: transparent;
}

.dashboard-content {
  padding: 30px;
  background-color: rgba(255,255,255,0.5);
}

}

@media (min-width: 768px) {
  #time {
    font-size: 6rem;
  }
  h1 { font-size: 4rem; }
}
</style>
</head>
<body>
<!-- <CONTAINER> -->
<div class="container">
<?php
$file = basename(__FILE__);
// if (file_exists('components/debug.php')) { require_once 'components/debug.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file debug.php non trovato"}'); }
if (file_exists('menu.php')) { require_once 'menu.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file menu.php non trovato"}'); }
if (file_exists('conn.php')) { require_once 'conn.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file conn.php non trovato"}'); }
if (file_exists('header.php')) { require_once 'header.php'; } else { die('{"status": "error", "error": "file", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file header.php non trovato"}'); }
?>
<h2 class="page-title page-txt-color-0">Dashboard</h2>
<div class="dashboard-content">
<time id="time"></time>
    <h1>
      <span id="greeting"></span>
      <!-- <span id="name" contenteditable="true"></span> -->
    </h1>
    <!-- <h2>What Is Your Focus For Today?</h2>
    <h2 id="focus" contenteditable="true"></h2> -->
</div>
<?php
if (file_exists('footer.php')) { require_once 'footer.php'; } else { die('{"status": "error", "error": "footer", "file": "' . $file . '", "line": "'.__LINE__.'", "message": "file footer.php non trovato"}'); }
?>
<script>
// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  // name = document.getElementById('name'),
  // focus = document.getElementById('focus'),
  content = document.querySelector('.content');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    content.style.backgroundImage = "url('https://i.ibb.co/R4NsPBC/industry-0.jpg')";
    // document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Buon Giorno';
  } else if (hour < 18) {
    // Afternoon
    // content.style.backgroundImage = "url('https://i.ibb.co/R4NsPBC/industry-0.jpg')";
    // content.style.backgroundImage = "url('https://i.ibb.co/4KLmnmg/industry-6.jpg')";
    content.style.backgroundImage = "url('https://i.ibb.co/HtLVXZ8/industry-1.jpg')";
    // document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Buon Pomeriggio';
  } else {
    // Evening
    content.style.backgroundImage = "url('https://i.ibb.co/4KLmnmg/industry-6.jpg')";
    // document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Buona Sera';
    document.body.style.color = 'white';
  }
}

// <NAME>
/*
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Inserisci il tuo nome]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}
*/
// </NAME>

// <FOCUS>
/*
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}
*/

/*
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}
*/
// </FOCUS>

// name.addEventListener('keypress', setName);
// name.addEventListener('blur', setName);
// focus.addEventListener('keypress', setFocus);
// focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
// getName();
// getFocus();

</script>
<script>
/*
const time = document.getElementById('time'),
      content = document.querySelector('.content');
let seconds = 5;

const img = [
'https://i.ibb.co/R4NsPBC/industry-0.jpg',
'https://i.ibb.co/HtLVXZ8/industry-1.jpg',
'https://i.ibb.co/5sZBH6P/industry-2.jpg',
'https://i.ibb.co/5xGsQhH/industry-3.jpg',
'https://i.ibb.co/9wzKZmk/industry-4.jpg',
'https://i.ibb.co/jMWkrfv/industry-5.jpg',
'https://i.ibb.co/4KLmnmg/industry-6.jpg',
'https://i.ibb.co/h1Vfbfv/industry-7.jpg',
'https://i.ibb.co/6RqHKpy/industry-8.jpg',
'https://i.ibb.co/pKDGRR7/industry-9.jpg'
]


function showTime() {
  if (seconds > 0) {
    seconds--;
  } else {
    seconds = 10;
    const numeroIntero = Math.floor(Math.random() * 10); // da 0 a 9
    content.style.backgroundImage = `url(${img[numeroIntero]})`;
    console.log('OK');
  }
  setTimeout(showTime, 1000);
}
showTime();
*/
</script>
<script src="js/menu.js"></script>
</body>
</html>

