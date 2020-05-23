import { viewOrdine, editOrdine, cancOrdine } from './build-panels.js';

// <TAB-CLICK>
/**
 * Al click su un bottone/tab delle card/panel
 * [a] Seleziona gli elementi con la classe '.active'
 * [b] per rimuovere a ogni elemento la classe '.active'
 * [c] all bottone/tab cliccato viene aggiunta la classe '.active'
 * [d] aggiunge al pannello corrispondente il tab/bottone la classe '.active'
 * @param {*} event
 */
const clickOnButtonTab = event => {
  const btnTab = event.target;
  const cardType = btnTab.getAttribute('type');

  if (cardType === 'close') {
    return;
  }
  const activeTabs = document.querySelectorAll('.active'); // [a]

  activeTabs.forEach(tab => {
    tab.className = tab.className.replace('active', ''); // [b]
  });

  btnTab.className += 'active'; // [c]

  document.getElementById(`panel-${cardType}`).className += 'active'; // [d]
};
// </TAB-CLICK>

/**
 * Crea i bottoni/tab della card
 * @param {HTMLElement} boxBtn - box che contiene i bottoni/tab
 * @param {Object[]} arrOfobj - ↓
 *            text: testo del bottone/tab,
 *            type: tipo di azione che fa il bottone/tab,
 *           color: classe di colore del bottoni/tab,
 *          active: stato del bottone: attivo|non attivo
 */
const createAllButtonTab = (boxBtn, arrOfobj) => {
  arrOfobj.forEach(obj => {
    const btn = document.createElement('BUTTON');
    btn.id = `btn-${obj.type}`;
    btn.className = `btn btn-${obj.color} btn-flat btn-tab ${obj.active}`;
    btn.setAttribute('type', obj.type);
    btn.innerHTML = obj.text;
    boxBtn.appendChild(btn);

    if (obj.type === 'close') {
      btn.addEventListener(
        'click',
        () => {
          document.getElementById('card-row').remove();
          // const activeRow = document.querySelector('.active-row');
          // activeRow.classList.remove('active-row');
        },
        false
      );
    }
  });
};

/**
 * Crea i pannelli della card
 * @param {*} panelBox - contenitore dei pannelli
 * @param {Object[]} arrOfobj - ↓
 *            type: tipo di pannello,
 *          active: stato del pannello (attivo|non attivo)
 */
const createPanelTab = (panelBox, arrOfobj) => {
  arrOfobj.forEach(obj => {
    const panel = document.createElement('DIV');
    panel.id = `panel-${obj.type}`;
    panel.className = `panel ${obj.active}`;
    panelBox.appendChild(panel);
  });
};

/* <CARD-HANDLER> */
/**
 * Aggiunge sotto la riga<TR> dell'ordine appena cliccato
 * un nuovo elemento <TR> che conterrà la card
 *
 * [a] Cerca a salire nella gerarchia degli elementi un elemento <TR>
 *     quando lo trova viene selezionato
 *
 * [b] Se l'elemento <TR> selezionato non ha le classi 'list-tr' e 'active-row'
 *     il codice viene interrotto
 *
 * [c] elementBelow è l' elemento che si trova sotto alla riga<TR> cliccata con classe 'list-tr'
 * Puo essere:
 * 1. una riga <TR> con classe list-tr (riga ordine)
 * 2. una riga <TR> con id card-row (card ordine)
 * 3. null
 * [d] Se elementBelow non è null
 * [e] e ha l'id card-row vuol dire che la card associata alla riga cliccata è
 *     già stata costruita e quindi non c'è bisogno di ricostruirla,
 *     di conseguenza la funzione viene interrotta.
 *
 * <f> Se una riga degli ordini è già selezionata,
 *     viene deselezionata rimuovendone la classe 'active-row'
 *
 * [g] alla riga dell' ordine cliccata viene applicata la classe 'active-row' per evidenziarla
 *
 * <h> Se una card già esiste sotto un' altra riga allora viene rimossa
 *
 * @param {event} event
 */
const addCardRowAfterSelectedRow = event => {
  let selectedRow = event.target;
  while (selectedRow.tagName !== 'TR') {
    // [a]
    selectedRow = selectedRow.parentNode; // [a]
  }

  // const regex = /list-tr(\sactive-row)?/;
  // const classFounded = regex.test(selectedRow.className);
  // if (!classFounded) { return; }

  // if (selectedRow.className !== 'list-tr') {return;}

  if (!selectedRow.classList.contains('list-tr') && !selectedRow.classList.contains('active-row')) {
    // [b]
    return; // [b]
  }

  const elementBelow = selectedRow.nextElementSibling; // [c]
  if (elementBelow) {
    // [d]
    if (elementBelow.id === 'card-row') {
      // [e]
      console.log('card-row gia presente sotto questa riga');
      return;
    }
  }

  // <f>
  const activeRow = document.querySelector('.active-row');
  if (activeRow) {
    activeRow.classList.remove('active-row');
  }

  selectedRow.classList.add('active-row'); // [g]

  // <h>
  const oldCardRow = document.getElementById('card-row');
  if (oldCardRow) {
    oldCardRow.remove();
  }
  // </h>

  const newRow = document.createElement('TR');
  newRow.id = 'card-row';
  selectedRow.insertAdjacentElement('afterend', newRow);

  const td = document.createElement('TD');
  td.setAttribute('colspan', 3);
  td.id = 'td-card-container';

  newRow.appendChild(td);

  const boxContainer = document.createElement('DIV');
  boxContainer.id = 'card-container';
  // boxContainer.classList.add('card-container');
  td.appendChild(boxContainer);

  const cardWrapper = document.createElement('DIV');
  cardWrapper.id = 'card-wrapper';
  boxContainer.appendChild(cardWrapper);

  // Crea DIV/BOX che contiene i bottoni
  const boxBtn = document.createElement('DIV');
  boxBtn.id = 'box-btn-tab';
  boxBtn.classList.add('box-btn');
  // boxBtn.classList.add('box-btn', 'box-btn-center');
  cardWrapper.appendChild(boxBtn);

  // Crea Buttoni Mostra Modifica Cancella Chiudi
  createAllButtonTab(boxBtn, [
    { text: 'Mostra', type: 'view', color: 'primary', active: 'active' },
    { text: 'Modifica', type: 'edit', color: 'warning', active: '' },
    { text: 'Cancella', type: 'canc', color: 'danger', active: '' },
    { text: '&#10006;', type: 'close', color: 'light', active: '' }
  ]);

  // Box che contiene tutti i tipi di pannelli
  const cardsBox = document.createElement('DIV');
  cardsBox.id = 'cards';
  cardWrapper.appendChild(cardsBox);

  // Crea tutti i Pannelli
  createPanelTab(cardsBox, [
    { type: 'view', active: 'active' },
    { type: 'edit', active: '' },
    { type: 'canc', active: '' }
  ]);

  const obj = {
    ordine: selectedRow.children[0].children[0].getAttribute('data-short'),
    ritiro: selectedRow.children[1].children[0].getAttribute('data-short'),
    stato: selectedRow.children[2].children[0].innerText
  };
  const copia = Object.assign({}, obj);

  viewOrdine(obj);
  editOrdine(copia);
  cancOrdine();

  const boxBtnCard = document.getElementById('box-btn-tab');
  boxBtnCard.addEventListener('click', clickOnButtonTab, false);
};

/**
 * Alla tabella della lista degli ordini viene assegnato un evento di tipo click.
 * Allo scatenarsi dell' evento viene richiamata la funzione 'addCardRowAfterSelectedRow'
 * che identifica la riga degli ordini della tabella che è stata cliccata
 */
const clickOnOrdiniRows = () => {
  const ordiniTable = document.querySelector('.list-tbody');
  ordiniTable.addEventListener('click', addCardRowAfterSelectedRow, false);
};
/* </CARD-HANDLER> */

export { clickOnOrdiniRows };
