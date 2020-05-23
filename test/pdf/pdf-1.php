<?php 
include "vendor/html2pdf/src/Html2Pdf.php";
?>

<?php ob_start(); ?>

<style type="text/css">
    <!--

h2{

    font-weight:normal;

}

-->
</style>
<page> // tag che apre una pagina del pdf

<h2>TESTO ESEMPIO</h2>

</page> // tag che chiude la prima pagina del pdf

<?php
 
 $content = ob_get_clean();
 $html2pdf = new HTML2PDF('P','A4','it'); // istanzio l'oggetto html2pdf 
 $html2pdf->WriteHTML($content);
 $html2pdf->Output("esempio.pdf"); //lo genero

?>