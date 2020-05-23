import { request } from './request.js';
import { DateManager } from './Date.js';

const dateManager = new DateManager();

// <VIEW_ORDINE>
/**
 * Al click sul bottone 'Mostra Ordini Rows' del Pannello Visualizza Ordine
 */
const viewOrdineRows = () => {
  const selectedRow = document.querySelector('.active-row');
  const clienteid = selectedRow.getAttribute('clienteid');
  const ordineid = selectedRow.getAttribute('ordineid');

  console.log('clienteid', clienteid);
  console.log('ordineid', ordineid);
};
// </VIEW_ORDINE>

// <UPDATE_ORDINE>
/**
 * Al click sul bottone 'Aggiorna' del Pannello Modifica Ordine
 */
const updateOrdine = () => {
  const selectedRow = document.querySelector('.active-row');
  const ordine_id = selectedRow.getAttribute('ordine_id');

  const cliente_id = document.querySelector('#cliente_id').getAttribute('cliente_id');

  const data_ordine = document.querySelector('#edit-date-ordine').value;
  const data_ritiro = document.querySelector('#edit-date-ritiro').value;

  const stato_ordine = document.querySelector('#edit-stato-ordine').value;

  const obj = { action: 'update', ordine_id, cliente_id, data_ordine, data_ritiro, stato_ordine };

  const str = JSON.stringify(obj); // console.log(obj);
  const data = `data=${str}`;
  const url = 'action-on-ordini';
  request(url, data)
    .then(res => {
      const dataOrdineShort = dateManager.formatDataInNumericShort(res.data_ordine);

      const dataRitiroShort = dateManager.formatDataInNumericShort(res.data_ritiro);
      selectedRow.children[0].children[0].setAttribute('data-short', dataOrdineShort);
      selectedRow.children[1].children[0].setAttribute('data-short', dataRitiroShort);
      selectedRow.children[0].children[0].innerText = DateManager.formatDataInItalyShort(dataOrdineShort);
      selectedRow.children[1].children[0].innerText = DateManager.formatDataInItalyShort(dataRitiroShort);
      selectedRow.children[2].children[0].innerText = res.stato_ordine;
    })
    .catch(err => console.log(err));
};
// </UPDATE_ORDINE>

export { updateOrdine };
