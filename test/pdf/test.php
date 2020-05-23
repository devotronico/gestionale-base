<?php
/**
 * Html2Pdf Library - example
 *
 * HTML => PDF converter
 * distributed under the OSL-3.0 License
 *
 * @package   Html2pdf
 * @author    Laurent MINGUET <webmaster@html2pdf.fr>
 * @copyright 2017 Laurent MINGUET
 */

ini_set('allow_url_fopen', 'On');
ini_set('allow_url_include', 'On');

require_once dirname(__FILE__).'/../vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

try {
    //ob_start();
    //include dirname(__FILE__).'/res/example00.php';
    //include 'http://192.168.1.87/workspace/IMCA/xxdati/xxcrea/stampaFatturaBanco_test.php?id=5137';
    //$content = ob_get_clean();
    $content = file_get_contents('http://192.168.1.87/workspace/IMCA/xxdati/xxcrea/stampaFatturaBanco_test.php?id=5137');
        
    
    //print_r($content);
    $html2pdf = new Html2Pdf('P', 'A4', 'it');
   
    $html2pdf->setDefaultFont('Arial');
    $html2pdf->writeHTML($content);
    $html2pdf->output('example00.pdf');
    
} catch (Html2PdfException $e) {
    $html2pdf->clean();

    $formatter = new ExceptionFormatter($e);
    echo $formatter->getHtmlMessage();
}
