import { DateManager } from './Date.js';
import { updateOrdine } from './action-update-ordine.js';
import { readOrdineRows } from './action-read-ordine-rows.js';
import { deleteOrdine } from './action-delete-ordine.js';

const dateManager = new DateManager();

/**
 * Crea i bottoni/tab della card
 * @param {HTMLElement} boxBtn - pannello che contiene i bottoni
 * @param {Object} obj - ↓
 *            text: testo del bottone/tab,
 *              id: id del bottone - non ha nessuna utilità al momento
 *              fn: funzione specifica applicata a ogni bottone
 */
const buildButtonPanel = (boxBtn, obj) => {
  const btn = document.createElement('BUTTON');
  btn.id = `btn_panel-${obj.id}`;
  btn.className = `btn btn-light btn-flat btn-panel`;
  btn.innerHTML = obj.text;
  boxBtn.appendChild(btn);
  btn.addEventListener('click', obj.fn);
};


// <VIEW_ROW>
/**
 * Costruisce il Pannello di Visualizza Ordine
 * @param {Object} obj -
 */
const viewOrdine = obj => {
  obj.ordine = dateManager.formatDataInItalyLong(obj.ordine);
  obj.ritiro = dateManager.formatDataInItalyLong(obj.ritiro);

  const panel = document.querySelector('#panel-view');
  const table = document.createElement('TABLE');
  table.id = 'panel_table-view';
  table.classList.add('panel_table');
  panel.appendChild(table);

  // <THEAD>
  const thead = document.createElement('THEAD');
  table.appendChild(thead);
  const tr = document.createElement('TR');
  thead.appendChild(tr);

  const thList = ['', 'week', 'day', 'month', 'year', 'hour'];
  thList.forEach(item => {
    const th = document.createElement('TH');
    th.innerText = item;
    tr.appendChild(th);
  });
  // </THEAD>

  const tbody = document.createElement('TBODY');
  table.appendChild(tbody);
  for (const key in obj) {
    const tr = document.createElement('TR');
    tr.classList.add('panel_row');
    tbody.appendChild(tr);
    const th = document.createElement('TH');
    th.innerText = key;
    tr.appendChild(th);
    if (key === 'stato') {
      const td = document.createElement('TD');
      td.innerText = obj[key];
      tr.appendChild(td);

      for (let i = 0; i < 4; i++) {
        const td = document.createElement('TD');
        tr.appendChild(td);
      }
      continue;
    }
    for (const item in obj[key]) {
      const td = document.createElement('TD');
      td.innerText = obj[key][item];
      tr.appendChild(td);
    }
  }

  buildButtonPanel(panel, {
    text: 'Mostra ordini rows',
    id: 'view',
    fn: function () {
      readOrdineRows();
    }
  }
  );
};
// </VIEW_ROW>

// <EDIT_ROW>
/**
 * Costruisce il Pannello di Modifica Ordine
 * @param {Object} obj
 */
const editOrdine = obj => {
  obj.ordine = dateManager.formatDataForHtmlInput(obj.ordine);
  obj.ritiro = dateManager.formatDataForHtmlInput(obj.ritiro);

  const panel = document.querySelector('#panel-edit');

  const table = document.createElement('TABLE');
  table.id = 'panel_table-edit';
  table.classList.add('panel_table');
  panel.appendChild(table);
  const tbody = document.createElement('TBODY');
  table.appendChild(tbody);

  // Crea le righe del <tbody>
  for (const key in obj) {
    const tr = document.createElement('TR');
    tr.classList.add('panel_row');
    tbody.appendChild(tr);
    const th = document.createElement('TH');
    th.innerText = key;
    tr.appendChild(th);
    const td = document.createElement('TD');
    tr.appendChild(td);

    if (key === 'stato') {
      const select = document.createElement('SELECT');
      select.id = 'edit-stato-ordine';
      select.size = 6;
      td.appendChild(select);
      const ordineList = ['sospeso', 'produzione', 'completato', 'deposito', 'fatturato', 'spedito'];
      for (let i = 0; i < ordineList.length; i++) {
        const option = document.createElement('OPTION');
        option.value = ordineList[i];
        option.text = ordineList[i];
        select.appendChild(option);
      }
      select.value = obj[key];
      continue;
    }
    const input = document.createElement('INPUT');
    input.type = 'datetime-local';
    input.value = obj[key];

    // input.classList.add(`edit-date-${key}`); // set the CSS class
    input.id = `edit-date-${key}`; // set the CSS class
    td.appendChild(input); // put it into the DOM
  }

  buildButtonPanel(panel, {
    text: 'Aggiorna',
    id: 'update',
    fn: function () {
      updateOrdine();
    }
  }
  );


};
// </EDIT_ROW>

// <CANC_ROW>
const cancOrdine = () => {
  const panel = document.querySelector('#panel-canc');

  const paragrafo = document.createElement('P');
  paragrafo.innerHTML = 'Cancellare questo Ordine?';
  panel.appendChild(paragrafo);

  buildButtonPanel(panel, {
    text: 'SI',
    id: 'delete',
    fn: function () {
      deleteOrdine();
    }
  }
  );
};
// </CANC_ROW>


export { viewOrdine, editOrdine, cancOrdine };
