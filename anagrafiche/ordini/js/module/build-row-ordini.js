import { DateManager } from './Date.js';


/**
 * Questa funzione è richiamata dalle funzioni:
 * readOrdini() nel file action-read-ordini.js
 * createOrdine() nel file action-create-ordine.js
 * [a] Seleziona il corpo della tabella dove appendere una riga <tr> per ogni ordine associato al cliente.
 * [b] Se la tabella della lista degli ordini ha una sola riga <tr>, l'unica riga presente viene selezionata
 *   [c] Se l'unica riga presente ha la proprietà id: ordini-empty, questa riga viene rimossa
 *       Altrimenti l'unica riga presente riporta un ordine quindi non va rimossa ma:
 * <f> Vengono ciclate tutte le righe degli ordini della tabella
 *     Se l' ordine di cui bisogna ancora costruire la riga nella tabella è principale(valore = 1)
 *     allora tutte le righe vengono riportare a valore 0 nella colonna principale
 *
 * [g] Crea e inserisce un nuova riga TR nel corpo della tabella
 *
 * [i] Aggiunge alla riga una classe e come id l' id dell' ordine preso dalla tabella `ordini`
 *
 * <l> Viene ciclato l oggetto ordine
 *   [m] Il valore delle proprietà ordine_id e cliente_id vengono
 *       aggiunti come attributi alla nuova riga <tr>
 *   [n] I restanti valori delle proprietà vengono utilizzate per creare e
 *       valorizzare le colonne <td> della nuova riga (es: <td><p>valore</p></td>)
 * </l>
 * <g> crea bottoni
 * @param {Object} ordine - oggetto con le key {ordine_id, cliente_id, dataOrdine, dataRitiro, statoOrdine}
 */
const buildRowOrdini = (obj, position, rowClass = 'list-tr') => {
  // const cliente_id = obj.cliente_id
  const ordine = (({ ordine_id, data_ordine, data_ritiro, stato_ordine }) => ({ ordine_id, data_ordine, data_ritiro, stato_ordine }))(obj);

  const ordiniTable = document.querySelector('#ordini .list-tbody'); // [a]

  if (ordiniTable.childElementCount === 1) {
    const UniqueRow = ordiniTable.children[0]; // [b]

    if (UniqueRow.id === 'ordini-empty') {
      UniqueRow.remove(); // [c]
    }
  }
  const newNodeRow = ordiniTable.insertRow(position); // [g]
  // const newNodeRow = ordiniTable.insertRow(-1); // [g]
  newNodeRow.className = rowClass; // [i]
  // newNodeRow.id = `tr-${ordine.ordine_id}`; // [i]


  // <l>
  for (const key in ordine) {
    if (key === 'ordine_id') {
      // [m]
      newNodeRow.setAttribute(key, ordine[key]);
      continue;
    }

    const td = document.createElement('TD'); // [n] 7
    td.classList.add('list-td');
    newNodeRow.appendChild(td);
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('list-text', key);
    // paragrafo.classList.add(key);
    td.appendChild(paragrafo);

    if (key === 'data_ordine' || key === 'data_ritiro') {
      paragrafo.textContent = DateManager.formatDataInItalyShort(ordine[key]);
      paragrafo.setAttribute('data-short', ordine[key]);
      continue;
    }
    paragrafo.innerText = ordine[key];
    td.appendChild(paragrafo);
  }
  // </l>
};

export { buildRowOrdini };
