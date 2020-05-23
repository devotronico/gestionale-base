<!-- <ORDINI-NEW> -->
<div id="ordine-new" class="wrapper wrapper-3">
    <table id="ordine-new_table" class="section">
        <tbody>
            <tr>
                <th>data_ordine</th>
                <td><p id="ordine-new_data"></td>
                <!-- <td><input type="hidden" id="ordine-new_data"></td> -->
                <!-- <td><input type="datetime-local" id="ordine-new_data" class="module-ordine-new" required></td> -->
            </tr>
            <tr>
                <th>ritiro_ordine</th>
                <td><input type="datetime-local" id="ordine-new_ritiro" class="module-ordine-new" required></td>
            </tr>
            <tr>
                <th>stato_ordine</th>
                <td>
                    <select id="ordine-new_stato" class="module-ordine-new">
                        <option value="sospeso">sospeso</option>
                        <option value="produzione">produzione</option>
                        <option value="completato">completato</option>
                        <option value="deposito">deposito</option>
                        <option value="fatturato">fatturato</option>
                        <option value="spedito">spedito</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>azione</th>
                <td><button id="btn-add-ordine" class="btn btn-primary btn-flat" disabled>Crea Ordine</button></td>
            </tr>
        </tbody>
    </table>
</div>
<!-- </ORDINI-NEW> -->