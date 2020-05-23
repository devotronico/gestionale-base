import { createOrdine } from './action-create-ordine.js';
import { DateManager } from './Date.js';


/**
 * <a> Ogni volta che nella sezione 'Aggiungi nuovo Ordine' viene cambiato
 * 1. la data di ritiro ordine oppure
 * 2. lo stato dell'ordine
 * il bottone 'Crea Ordine' viene abilitato se
 * tutti i moduli <input> e <select> sono validi
 * il bottone 'Crea Ordine' viene disabilitato se
 * almeno uno solo dei moduli sono NON validi
 *
 * <b>
 * Se il bottone 'Crea Ordine' ha superato il primo controllo nel blocco <a>
 * allora è stato abilitato e viene eseguito un altro controllo sulle date
 * se la data di ritiro ordine NON precede la data attuale(data inizio ordine)
 * Il bottone 'Crea Ordine' rimane abilitato e gli viene assegnato un evento al click
 * altrimenti Il bottone 'Crea Ordine' viene disabilitato
 */
const enablingButtonNewOrdine = () => {
  // <a>
  const elements = document.querySelectorAll('.module-ordine-new');
  const btnAddOrdine = document.querySelector('#btn-add-ordine');
  btnAddOrdine.disabled = false;
  elements.forEach(element => {
    if (element.validity.valid === false) {
      btnAddOrdine.disabled = true;
    }
  });
  // </a>



  // <b>
  if (btnAddOrdine.disabled === false) {
    const dateFirstInput = document.querySelector('#ordine-new_data').getAttribute('datetime-local');
    const dateSecondInput = document.querySelector('#ordine-new_ritiro').value;
    if (DateManager.checkWhichDateIsGreater(dateFirstInput, dateSecondInput)) {
      btnAddOrdine.addEventListener('click', createOrdine);
    } else {
      btnAddOrdine.disabled = true;
    }
  } else {
    btnAddOrdine.removeEventListener('click', createOrdine);
  }
  // </b>
};

const dateManager = new DateManager();
//<MODE_ORDINE-ADD>
/**
 * Al click sul bottone 'Aggiungi nuovo ordine'
 * [a] se è già aperta la card per la creazione dell'ordine non succede niente
 * se NON è già aperta la card per la creazione dell'ordine:
 * [b] Mostra la card per la creazione di un nuovo ordine
 * [c] Nasconde la lista di ordini
 * [d] Avvia l'orologio della card per la creazione di un nuovo ordine
 * [e] Se presente la card dalla lista di ordini
 *   [f] la card degli ordini viene rimossa e
 *   [g] viene deselezionata la riga della lista degli ordini rimuovendone la classe active-row
 */
const activeModeAddNewOrdine = () => {
  const ordineNewSection = document.querySelector('#ordine-new');
  if (ordineNewSection.style.display === 'flex') { // [a]
    return;
  }
  ordineNewSection.style.display = 'flex'; // [b]
  ordineNewSection.addEventListener('change', enablingButtonNewOrdine);
  document.querySelector('#ordini').style.display = 'none'; // [c]
  dateManager.playCurrentDatetime('#ordine-new_data'); // [d]
  const cardOrdini = document.getElementById('card-row');
  if (cardOrdini) { // [e]
    cardOrdini.remove(); // [f]
    document.querySelector('.active-row').classList.remove('active-row'); // [g]
  }
};
//</MODE_ORDINE-ADD>

//<MODE_ORDINE-LIST>
const activeModeShowListOrdini = () => {
  if (document.querySelector('#ordini').style.display === 'flex') {
    return;
  }
  document.querySelector('#ordini').style.display = 'flex';
  document.querySelector('#ordine-new').style.display = 'none';
  dateManager.stopCurrentDatetime();
};
//</MODE_ORDINE-LIST>

export { activeModeAddNewOrdine, activeModeShowListOrdini, dateManager };
