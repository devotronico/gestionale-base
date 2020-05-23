import { request } from './request.js';
import { buildRowOrdini } from './build-row-ordini.js';
import { clickOnOrdiniRows } from './handle-cards.js';
import { showMessage } from './message-handler.js';

// <SELECT-CHANGE>
/**
 * Mostra|Nasconde i blocchi di sezione se un cliente è stato scelto oppure o no
 * [a] Se stato = 1 significa che è stato scelto un cliente
 *   [b] Mostra i 2 bottoni adibiti all' attivazione delle modalità 'crea ordine' e 'mostra ordine'
 * <c> Altrimenti se stato = 0 significa che NON è stato scelto un cliente e quindi vengono nascosti:
 *   [d] I 2 bottoni adibiti all' attivazione delle modalità 'crea ordine' e 'mostra ordine'.
 *   [e] Se presente, il form per la creazione di un nuovo ordine da associare al cliente.
 *   [f] Se presente, La lista di tutti gli ordini associati al cliente
 * [g] Viene eliminato il nome del cliente nella prima riga della lista degli ordini
 * @param {Number} stato - 1|0
 */
const setCustomerElementEnabling = stato => {
    document.querySelector('#ordine-new').style.display = 'none'; // [e]
    if (stato === 1) {
        // [a]
        document.querySelector('#ordine-mode').style.display = 'flex'; // [d]
        document.querySelector('#ordini').style.display = 'flex'; // [f]
        return;
    }
    // <c> ...
    document.querySelector('#ordine-mode').style.display = 'none'; // [d]
    document.querySelector('#ordini').style.display = 'none'; // [f]
    document.querySelector('#ordine-title').innerHTML = 'Elenco Ordini di ...'; // [g]
};

/**
 * Alla scelta di un cliente nella lista di <option> della <select>
 * [a] Seleziona elemento <select>
 * [b] Ottiene l'indice della <option> selezionata
 * [c] Ottiene il valore della <option> selezionata
 * <x> Dalla tabella che mostra i dettagli del cliente
 *     vengono rimosse tutte le righe tranne la
 *     riga che contiene l' elemento <select>
 * [d] Seleziona il corpo della tabella che contiene le righe(<tr>) degli ordini
 * [e] Elimina tutte le righe(<tr>) di ordini presenti nel corpo della tabella
 * [f-1] Se il valore della <option> è zero equivale a nessun cliente selezionato
 *   [g] Vengono disabilitati gli elementi <input> della sezione clienti
 *   [h] Il titolo della tabella degli ordini non riporta il nome di nessun cliente
 *   [i] Nasconde il bottone per creare altri ordini
 * [f-0] Se il valore della <option> è diverso da zero equivale a un cliente selezionato
 *   [l] Vengono abilitati gli elementi <input> della sezione clienti
 *   [m] Mostra il bottone per creare altri ordini
 */
const getAllOrdiniOfCliente = (option) => {
    const optionValue = option.value;
    console.log(optionValue);

    // <x>
    const table = document.querySelector('#clienti-table');
    for (let i = table.rows.length - 1; i > 0; i--) {
        if (i == 0) { break; }
        table.deleteRow(i);
    }
    // </x>

    const ordiniList = document.querySelector('#ordini .list-tbody'); // [d]
    ordiniList.innerHTML = ''; // [e]

    if (optionValue === '0') {
        // [f-1]
        setCustomerElementEnabling(0); // [g]
        return;
    }
    // [f-0]
    const obj = { action: 'read', cliente_id: optionValue };
    const str = JSON.stringify(obj);
    const data = `data=${str}`;
    const url = 'action-on-ordini';
    request(url, data)
        .then(res => {
            setCustomerElementEnabling(1); // [l]
            const clientiTable = document.querySelector('#clienti-table>tbody');
            for (const key in res.cliente) {
                if (key === 'cliente_id') {
                    document.querySelector(`#${key}`).setAttribute(key, res.cliente[key]);
                    continue;
                }
                const tr = document.createElement('TR');
                clientiTable.appendChild(tr);
                const th = document.createElement('TH');
                th.innerText = key;
                tr.appendChild(th);
                const td = document.createElement('TD');
                td.innerText = res.cliente[key];
                tr.appendChild(td);
            }

            document.querySelector('#ordine-title').innerHTML = `Ordini di ${res.cliente.nome} ${res.cliente.cognome}`;

            if (res.ordini.length === 0) {
                ordiniList.innerHTML = `<tr id="ordini-empty"><td colspan="3" style="text-align:center"><p>Nessun Ordine da Questo Cliente</p></td></tr>`;
            } else {
                res.ordini.forEach(ordine => {
                    buildRowOrdini(ordine, -1);
                });
                clickOnOrdiniRows();
            }
        })
        .catch(err => {
            showMessage(err, 'danger');
        });
};
// </SELECT-CHANGE>


export { getAllOrdiniOfCliente }