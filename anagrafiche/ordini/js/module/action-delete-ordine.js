import { request } from './request.js';
import { DateManager } from './Date.js';
import { showMessage } from './message-handler.js';


const dateManager = new DateManager();

// <DELETE_ORDINE>
/**
 * Al click sul bottone 'Mostra Ordini Rows' del Pannello Visualizza Ordine
 */
const deleteOrdine = () => {
  const selectedRow = document.querySelector('.active-row');

  const cliente_id = document.querySelector('#cliente_id').getAttribute('cliente_id');

  const ordine_id = selectedRow.getAttribute('ordine_id');

  let data_ordine_short = selectedRow.children[0].children[0].getAttribute('data-short');
  let data_ritiro_short = selectedRow.children[1].children[0].getAttribute('data-short');

  const obj_data_ordine = dateManager.formatDataInItalyLong(data_ordine_short);

  const obj_data_ritiro = dateManager.formatDataInItalyLong(data_ritiro_short);

  let data_ordine = '';
  for (const key in obj_data_ordine) {
    data_ordine += obj_data_ordine[key] + ' ';
  }
  data_ordine = data_ordine.trim();

  let data_ritiro = '';
  for (const key in obj_data_ritiro) {
    data_ritiro += obj_data_ritiro[key] + ' ';
  }
  data_ritiro = data_ritiro.trim();

  console.log(data_ordine);
  console.log(data_ritiro);

  const stato_ordine = document.querySelector('#edit-stato-ordine').value;

  // const obj = { action: 'delete', ordine_id, cliente_id };
  const obj = { action: 'delete', ordine_id, cliente_id, data_ordine, data_ritiro, stato_ordine };
  console.log(obj);
  const str = JSON.stringify(obj);
  const data = `data=${str}`;
  const url = 'action-on-ordini';
  request(url, data)
    .then(res => {
      console.log(res);
      selectedRow.remove();
      const oldCardRow = document.getElementById('card-row');
      if (oldCardRow) {
        oldCardRow.remove();
      }
      showMessage(res, 'success', { toHide: ['ordine-mode', 'ordine-new'], toShow: ['ordine-mode', 'ordini'] });

    })
    .catch(err => console.log(err));
};
// </DELETE_ORDINE>


export { deleteOrdine };
