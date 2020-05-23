<table>
	<tr>
		<th>#</th>
		<th>IMBALL</th>
		<th>QT ENTR</th>
		<th>DDT</th>
		<th>DATA</th>
		<th>Fornitor</th>
	</tr>
<?php
$servername = "localhost";
$username = "root";
$password = "rootPsw";
//$password = "";
$dbname = "tomatoware";
$i = 1;
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sql = $conn->query("SELECT entrate.id as idEntrata, entrate.qt as qtEntrate, rowordineout.qt as qtOrdine, rowordineout.imballaggio, entrate.dataIngresso,
					( SELECT SUM(movimballaggi.carico) from movimballaggi WHERE movimballaggi.imballaggio = rowordineout.imballaggio AND movimballaggi.data = entrate.dataIngresso ) as
					movimentato, ddtin.codice as ddt, ddtin.fornitore as fornitore FROM entrate INNER JOIN rowordineout on entrate.rowordineout = rowordineout.id
					INNER JOIN ddtin on entrate.ddt = ddtin.id WHERE rowordineout.stato != 'inviato' AND ( SELECT SUM(movimballaggi.carico)
					FROM movimballaggi WHERE movimballaggi.imballaggio = rowordineout.imballaggio AND movimballaggi.data = entrate.dataIngresso )
					IS NULL ORDER BY `movimentato` ASC");
while($dati = $sql->fetch_assoc()){
//	$qtMov = $dati["movimentato"];
	 $imb = $dati["imballaggio"];
	 $qt = $dati["qtEntrate"];
	$ddt =  $dati["ddt"];
	$data = $dati["dataIngresso"];
	 $forn = $dati["fornitore"];

	print "<tr>
	<td>$i</td>
		<td>".$dati["imballaggio"]."</td>
	<td>".$dati["qtEntrate"]."</td>
	<td>".$dati["ddt"]."</td>
	<td>".$dati["dataIngresso"]."</td>
	<td>".$dati["fornitore"]."</td>
	</tr>";
	// $conn->query("INSERT INTO movimballaggi(id, imballaggio, brand, scarico, carico, pzu, lavorazione, ddt, ddt_row, data, fornitore)
	// 				VALUES(NULL, '$imb', '0', '0','$qt','0','0','$ddt','0','$data','$forn')");
	$i++;
}
?>
</table>