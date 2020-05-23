// import { request } from './request.js';

// <VIEW_ORDINE>
/**
 * Al click sul bottone 'Mostra Ordini Rows' del Pannello Visualizza Ordine
 */
const readOrdineRows = () => {
  const selectedRow = document.querySelector('.active-row');
  const clienteid = selectedRow.getAttribute('clienteid');
  const ordineid = selectedRow.getAttribute('ordineid');

  console.log('clienteid', clienteid);
  console.log('ordineid', ordineid);
};
// </VIEW_ORDINE>


export { readOrdineRows };
