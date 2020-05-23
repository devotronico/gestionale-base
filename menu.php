<!-- <SIDEBAR> -->
<div class="menu menu-bg-color-3">
    <div class="menu-fixed">
        <div class="sidebar-section sidebar-section-head">
            <div class="sidebar-section-head">
                <h3 class="sidebar-section-head-title menu-txt-color-1">Gestionale</h3>
            </div>
        </div>
        <div class="menu-content menu-bg-color-0">
            <ul class="menu-list">
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0"
                        href="<?= BASE_URL ?>dashboard.php">Dashboard</a></li>
                <!-- <li class="menu-item menu-item-normal disp-desktop menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>xxdati/fattura-create.php">Crea Fattura</a></li> -->
                <!-- <li class="menu-item menu-item-normal disp-desktop menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>xxelenco/foutfiltro.php">Elenco Fatture</a></li> -->
                <!-- <li class="menu-item menu-item-normal disp-desktop menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>xxedit/fatture-out-list.php">Modifica Fatture</a></li> -->
                <!-- <li class="menu-item menu-item-normal disp-desktop menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>xxdati/ncdati.php">Carica Cliente</a></li> -->
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0"
                        href="<?= BASE_URL ?>anagrafiche/clienti/clienti.php">Anagrafiche Clienti</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0"
                        href="<?= BASE_URL ?>anagrafiche/indirizzi/indirizzi.php">Anagrafiche Indirizzi</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0"
                        href="<?= BASE_URL ?>anagrafiche/ordini/ordini.php">Ordini</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0"
                        href="<?= BASE_URL ?>anagrafiche/test/test.php">TEST</a></li>
                <!-- <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>index.php">Home</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>dashnuovi.php">Nuovo</a></li>
                <li class="menu-item btn-accordion menu-bg-color-4">
                    <p class="title-accordion menu-txt-color-0">Documenti</p>
                    <div class="accordion-content menu-bg-color-2">
                        <ul class="accordion-list menu-bg-color-2">
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/cnelenco.php">Contratti</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/storicoConsegne.php">Storico Consegne</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/scaDepelenco.php">Scarico Deposito Esterno</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/ofelenco.php">Ordini a fornitori inevasi</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/stofelenco.php">Ordini a fornitori storico</a></li>
                        </ul>
                    </div>
                </li>
                <li class="menu-item btn-accordion menu-bg-color-4">
                    <p class="title-accordion menu-txt-color-0">Consegne</p>
                    <div class="accordion-content menu-bg-color-2">
                        <ul class="accordion-list">
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>shipment/shsospelenco.php">Sospese</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>shipment/shworkelenco.php">Lavorazione</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>shipment/shcompelenco.php">Complete</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>shipment/shsendelenco.php">Spedite</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>shipment/shdepelenco.php">Deposito</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>shipment/shfattelenco.php">Fatturate</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/cercaVolantino.php">Volantini</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/elencoVettori.php">Vettori</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>shipment/allshelenco.php">Cerca Ordine</a></li>
                        </ul>
                    </div>
                </li>
                <li class="menu-item btn-accordion menu-bg-color-4">
                    <p class="title-accordion menu-txt-color-0">Magazzino</p>
                    <div class="accordion-content menu-bg-color-2">
                        <ul class="accordion-list">
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/depositi.php">Depositi</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/pfelenco.php">Prodotti Finiti</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/imbelenco.php">Imballaggi</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/pedane.php">Pedane</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/mag_totali_vendite.php">Totali Vendite</a></li>
                        </ul>
                    </div>
                </li>
                <li class="menu-item btn-accordion menu-bg-color-4">
                    <p class="title-accordion menu-txt-color-0">Personale</p>
                    <div class="accordion-content menu-bg-color-2">
                        <ul class="accordion-list">
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxdati/ndipdati.php">Nuovo Dipendente</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxdati/nbpdati.php">Nuova Busta Paga</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/dipelenco.php">Elenco Dipendenti</a></li>
                            <li class="accordion-item"><a class="accordion-link menu-txt-color-1" href="<?= BASE_URL ?>xxelenco/bpelenco.php">Elenco Buste Paga</a></li>
                        </ul>
                    </div>
                </li>
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>dashcont.php">Contabilità</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>modificaDash.php">Modifica Dati</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-4"><a class="menu-link menu-txt-color-0" href="<?= BASE_URL ?>messaggi.php">Invia Messaggio</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-5"><a class="menu-link menu-txt-color-1" href="<?= BASE_URL ?>logout.php">Logout</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-6"><a class="menu-link menu-txt-color-1" href="<?= BASE_URL ?>about.php">About</a></li>
                <li class="menu-item menu-item-normal menu-bg-color-7"><a class="menu-link menu-txt-color-1" href="<?= BASE_URL ?>guida.pdf">Guida</a></li> -->
            </ul>
        </div>
    </div>
</div>
<!-- </SIDEBAR> -->