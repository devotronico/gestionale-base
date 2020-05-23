import { dateManager } from './handle-ordine-mode.js';
import { request } from './request.js';
import { buildRowOrdini } from './build-row-ordini.js';
import { showMessage } from './message-handler.js';


/**
 * Al click sul bottone 'Crea Ordine' del Pannello 'Aggiungi nuovo Ordine'
 * Viene creato e salvato nel database il nuovo ordine associato al
 * cliente associato nel pannello 'Clienti'
 * @param {Event} event
 */
const createOrdine = event => {
  dateManager.stopCurrentDatetime();
  document.querySelector('#btn-add-ordine').disabled = true;

  const cliente_id = document.querySelector('#cliente_id').getAttribute('cliente_id');
  // const cliente_id = event.target.getAttribute('cliente-id');
  const data_ordine = document.querySelector('#ordine-new_data').getAttribute('datetime-local');

  const input_data_ritiro = document.querySelector('#ordine-new_ritiro');
  const data_ritiro = input_data_ritiro.value;
  input_data_ritiro.value = null;

  const input_stato_ordine = document.querySelector('#ordine-new_stato');
  const stato_ordine = input_stato_ordine.value;
  input_stato_ordine.selectedIndex = null;
  // console.log('stato_ordine', stato_ordine);
  const obj = { action: 'create', cliente_id, data_ordine, data_ritiro, stato_ordine };
  const str = JSON.stringify(obj);
  const data = `data=${str}`;
  const url = 'action-on-ordini';
  request(url, data)
    .then(res => {
      console.log(res);
      showMessage(res, 'success', { toHide: ['ordine-mode', 'ordine-new'], toShow: ['ordine-mode', 'ordini'] });
      const activeRow = document.querySelector('.active-row');
      if (activeRow) { activeRow.remove('active-row'); }
      buildRowOrdini(res, 0, 'list-tr active-row');
    })
    .catch(err => {
      console.log(err);
      showMessage(err, 'danger', { toHide: ['ordine-mode', 'ordine-new'], toShow: ['ordine-mode', 'ordini'] });
    });
};
export { createOrdine };
