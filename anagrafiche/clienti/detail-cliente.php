
<!-- DA CANCELLARE -->
<div class="wrapper wrapper-1">
    <table class="table-subject">

    <thead>

        <tr class="tr-subject">
            <th colspan="8" class="th-subject bg-color-1"><h3 class="txt-color-1">Anagrafica Cliente</h3></th>
        </tr>
        <tr class="tr-subject">
            <th class="th-subject bg-color-1"><p class="txt-color-1">id</p></th>
            <th class="th-subject bg-color-1"><p class="txt-color-1">ragione sociale</p></th>
            <th class="th-subject bg-color-1"><p class="txt-color-1">partita iva</p></th>
            <th class="th-subject bg-color-1"><p class="txt-color-1">codice fiscale</p></th>
            <th class="th-subject bg-color-1"><p class="txt-color-1">email</p></th>
            <th class="th-subject bg-color-1"><p class="txt-color-1">telefono</p></th>
            <th class="th-subject bg-color-1"><p class="txt-color-1">fax</p></th>
            <th class="th-subject bg-color-1"><p class="txt-color-1">area_geografica</p></th>
        </tr>
    </thead>
    <tbody>
        <tr class="tr-subject">
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['id']; ?></p></td>
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['ragione_sociale']; ?></p></td>
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['partita_iva']; ?></p></td>
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['codice_fiscale']; ?></p></td>
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['email']; ?></p></td>
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['telefono']; ?></p></td>
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['fax']; ?></p></td>
            <td class="td-subject bg-color-2"><p class="txt-color-2"><?= $row['area_geografica']; ?></p></td>
        </tr>
    </tbody>
</table>
</div>