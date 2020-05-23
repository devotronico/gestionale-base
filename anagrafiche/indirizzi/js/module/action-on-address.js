import { handleCardsToShowOrHide } from './cards-handler.js';
import { reqOnUserAction } from './req-on-user-action.js';
import { addRowAddress } from './add-row-address.js';
import { selectAllButton } from './add-btn-event.js';

// <ADDROW>
const addRowSql = () => {
    console.log('checkbox');

    handleCardsToShowOrHide('btn-card-add');
    const clienteId = document.querySelector('#add-cliente_id').value;

    const checkbox = document.querySelector('#add-principale');
    const principale = checkbox.checked ? 1 : 0;
    checkbox.checked = false;
    // const principale = document.querySelector('#add-principale').checked ? 1 : 0;

    const inputVia = document.querySelector('#add-via');
    let via = inputVia.value;
    inputVia.value = '';
    via = via.trim().split(' ').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');

    const inputCivico = document.querySelector('#add-civico');
    const civico = inputCivico.value;
    inputCivico.value = '';

    const inputCap = document.querySelector('#add-cap');
    const cap = inputCap.value;
    inputCap.value = '';

    const inputComune = document.querySelector('#add-comune');
    let comune = inputComune.value;
    inputComune.value = '';
    comune = comune.trim().split(' ').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');


    const inputProvincia = document.querySelector('#add-provincia');
    let provincia = inputProvincia.value;
    inputProvincia.value = '';
    provincia = provincia.toUpperCase();

    const inputNazione = document.querySelector('#add-nazione');
    let nazione = inputNazione.value ? inputNazione.value.toUpperCase() : 'IT';
    inputNazione.value = '';

    const indirizzo = `${via}, ${civico} ${cap} ${comune} ${provincia} ${nazione}`;

    const obj = { action: 'add', principale, clienteId, indirizzo, via, civico, cap, comune, provincia, nazione };

    const str = JSON.stringify(obj); // console.log(obj);
    const data = `data=${str}`;
    const url = 'action-on-address';
    reqOnUserAction(url, data)
        .then(res => {
            addRowAddress(res);
            selectAllButton();
        })
        .catch(err => console.log(err));
}
// </ADDROW>


// <MOSTRA>
/**
 * Al click sul bottone 'Mostra' della tabella della lista degli indirizzi
 * [a] chiamata alla funzione per gestire le cards, mostra la card VIEW
 * [b] Seleziona la riga <tr> dove è stato premuto il bottone
 * [c] Aggiunge alla riga selezionata un bordo colorato a sinistra
 * [d] assegna alla variabile ~via il contenuto della colonna 'via' della riga selezionata
 * [e] assegna alla variabile ~civico il contenuto della colonna 'civico' della riga selezionata
 * [f] assegna alla variabile ~cap il contenuto della colonna 'cap' della riga selezionata
 * [g] assegna alla variabile ~comune il contenuto della colonna 'comune' della riga selezionata
 * [h] assegna alla variabile ~provincia il contenuto della colonna 'provincia' della riga selezionata
 * [i] assegna alla variabile ~nazione il contenuto della colonna 'nazione' della riga selezionata
 * [l] assegna alla variabile ~indirizzo la concatenazione delle variabili:
 *     ~via ~civico ~cap ~comune ~provincia ~nazione
 * @param {element} button
 */
const viewAddress = (button) => {
    handleCardsToShowOrHide('view-row'); // [a]

    const rowAddress = button.parentNode.parentNode.parentNode; // [b]
    rowAddress.style.boxShadow = '-8px 0px 0px 0px #007BFF'; // [c]

    const via = rowAddress.children[2].children[0].innerText; // [d]
    const civico = rowAddress.children[3].children[0].innerText; // [e]
    const cap = rowAddress.children[4].children[0].innerText; // [f]
    const comune = rowAddress.children[5].children[0].innerText; // [g]
    const provincia = rowAddress.children[6].children[0].innerText; // [h]
    const nazione = rowAddress.children[7].children[0].innerText; // [i]

    const indirizzo = `${via}, ${civico}, ${cap} ${comune} ${provincia} ${nazione}`; // [l]
    document.querySelector('.view-address').innerText = indirizzo;
}

const viewMap = () => {
    const indirizzo = document.querySelector('.view-address').innerText;
    const url = `https://www.google.it/maps/place/${indirizzo}`;
    window.open(url);
    // initMap(indirizzo);
}
// </MOSTRA>


// <EDITROW>
/**
 * Al click sul bottone 'Modifica' della tabella della lista degli indirizzi
 * [a] chiamata alla funzione per gestire le cards, mostra la card VIEW
 * [b] Seleziona la riga <tr> dove è stato premuto il bottone
 * [c] Aggiunge alla riga selezionata un bordo colorato a sinistra
 * [d] Ogni valore della riga <tr> selezionata viene passato nella card 'Modifica Indirizzo'
 * @param {*} button - elemento button cliccato
 */
const editAddress = (button) => {
    handleCardsToShowOrHide('edit-row'); // [a]

    const rowAddress = button.parentNode.parentNode.parentNode; // [b]
    rowAddress.style.boxShadow = '-8px 0px 0px 0px #FFC107'; // [c]

    let text = '';

    // ID CLiente [d]
    text = rowAddress.children[0].children[0].innerText;
    document.querySelector('#edit-indirizzo_id').value = text;

    // Principale [d]
    text = rowAddress.children[1].children[0].innerText;
    if (text === '1') {
        document.getElementById('edit-principale').checked = true;
        document.getElementById('edit-principale').value = 1;
    } else {
        document.getElementById('edit-principale').checked = false;
        document.getElementById('edit-principale').value = 0;
    }

    // Indirizzo [d]
    text = rowAddress.children[2].children[0].innerText;
    document.querySelector('#edit-via').value = text;

    // Civico [d]
    text = rowAddress.children[3].children[0].innerText;
    document.querySelector('#edit-civico').value = text;

    // Cap [d]
    text = rowAddress.children[4].children[0].innerText;
    document.querySelector('#edit-cap').value = text;

    // Comune [d]
    text = rowAddress.children[5].children[0].innerText;
    document.querySelector('#edit-comune').value = text;

    // Provincia [d]
    text = rowAddress.children[6].children[0].innerText;
    document.querySelector('#edit-provincia').value = text;

    // Nazione [d]
    text = rowAddress.children[7].children[0].innerText;
    document.querySelector('#edit-nazione').value = text;
}
// </EDITROW>

// <UPDATEROW>
const updateRowHtml = (obj) => {
    const addressList = document.querySelector('.list-tbody');
    for (const tr of addressList.children) {
        if (obj.principale === '0') { continue; }
        tr.children[1].children[0].innerText = '0';
        //if (tr.children[1].children[0].innerText === '1') { tr.children[1].children[0].innerText = '0'; }
    }

    let row;
    let i = 0;
    for (const key in obj) {
        // console.log(obj[key]);
        if (obj.hasOwnProperty(key)) {
            if (i === 0) {
                row = document.querySelector('#tr-' + obj.indirizzoId);
            } else {
                row.children[i].children[0].innerText = obj[key]; // console.log(obj[key]);
            }
            i++;
        }
    }
}


const updateRowSql = () => {
    handleCardsToShowOrHide('btn-card-update');
    const indirizzoId = document.querySelector('#edit-indirizzo_id').value;

    const principale = document.querySelector('#edit-principale').checked ? 1 : 0;

    let via = document.querySelector('#edit-via').value;
    via = via.trim().split(' ').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');

    const civico = document.querySelector('#edit-civico').value;
    const cap = document.querySelector('#edit-cap').value;

    let comune = document.querySelector('#edit-comune').value;
    via = via.trim().split(' ').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');

    let provincia = document.querySelector('#edit-provincia').value;
    provincia = provincia.toUpperCase();

    const inputNazione = document.querySelector('#edit-nazione');
    let nazione = inputNazione.value ? inputNazione.value.toUpperCase() : 'IT';
    inputNazione.value = '';

    const indirizzo = `${via} ${civico}, ${cap} ${comune} ${provincia} ${nazione}`;

    const obj = { action: 'update', indirizzoId: indirizzoId, principale: principale, indirizzo: indirizzo, via: via, civico: civico, cap: cap, comune: comune, provincia: provincia, nazione: nazione };

    const str = JSON.stringify(obj);
    const data = `data=${str}`;
    const url = 'action-on-address';
    reqOnUserAction(url, data)
        .then(res => {
            updateRowHtml(res);
        })
        .catch(err => console.log(err));
}
// </UPDATEROW>


// <DELETEROW>
const deleteRowHtml = (button) => {
    handleCardsToShowOrHide('delete-row');
    const rowAddress = button.parentNode.parentNode.parentNode;
    const addressList = rowAddress.parentNode;


    if (addressList.childElementCount === 1) {
        rowAddress.innerHTML = `<td colspan="9" style="text-align:center"><p>Nessun Indirizzo Associato a Questo Cliente</p></td>`;
        rowAddress.id = 'address-empty';
        return;
    }

    // if (rowAddress.nextElementSibling === null) {
    //     rowAddress.innerHTML = `<td colspan="9" style="text-align:center"><p>Nessun Indirizzo Associato a Questo Cliente</p></td>`;
    //     rowAddress.id = 'address-empty';
    //     return;
    // }

    rowAddress.remove();
};


const deleteRowSql = (button) => {
    console.log(1);
    // const rowAddress = button.parentNode.parentNode.parentNode; // [b]
    const idAddress = button.parentNode.getAttribute('num'); console.log(idAddress);
    const obj = { action: 'delete', idAddress };
    const str = JSON.stringify(obj);
    const data = `data=${str}`; console.log(data);
    const url = 'action-on-address';
    reqOnUserAction(url, data)
        .then(res => {
            deleteRowHtml(button);
        })
        .catch(err => console.log(err));
}
// </DELETEROW>

export { addRowSql, viewAddress, viewMap, editAddress, updateRowSql, deleteRowSql };