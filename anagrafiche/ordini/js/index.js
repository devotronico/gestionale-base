import { request } from './module/request.js';
import { getAllOrdiniOfCliente } from './module/action-read-clienti-ordini.js';
import { showMessage } from './module/message-handler.js';
import { activeModeAddNewOrdine, activeModeShowListOrdini } from './module/handle-ordine-mode.js';


// <SECTION_CLIENTI>
/* https://github.com/Mobius1/Selectr/issues/72 */

/**
 * La libreria su dispositivi mobile va in crash
 * Soluzione: https://github.com/Mobius1/Selectr/issues/72
 * Il codice della soluzione è qui sotto ↓
 */
Object.defineProperty(Selectr.prototype, 'mobileDevice', {
  get() {
    return false;
  },
  set() { },
  enumerable: true,
  configurable: true
});


const initSelectClienti = (selector) => {
  const obj = { action: 'read_clienti' };
  const str = JSON.stringify(obj);
  const data = `data=${str}`;
  const url = 'action-on-ordini';
  request(url, data)
    .then(res => {
      selector.add(res);
      // selector.add([{ value: "some-value-1", text: "Some Text 1" }]);
      selector.on('selectr.change', function (option) {
        getAllOrdiniOfCliente(option);
      });
    })
    .catch(err => {
      showMessage(err, 'danger', { toHide: [], toShow: [] });
    });
};


(function () {
  const selector = new Selectr('#clienti-select-lib', { searchable: true, width: 150 });
  selector.on("selectr.init", function () {
    initSelectClienti(selector);
  });
})()
// </SECTION_CLIENTI>

// <SECTION_MODE>
/**
 * eventi di tipo click per la gestione delle 2 modalita:
 * [a] Aggiungi Nuovo Ordine
 * [b] Mostra Lista Ordini
 */
document.querySelector('#btn-mode-add').addEventListener('click', activeModeAddNewOrdine); // [a]
document.querySelector('#btn-mode-list').addEventListener('click', activeModeShowListOrdini); // [b]
// </SECTION_MODE>

