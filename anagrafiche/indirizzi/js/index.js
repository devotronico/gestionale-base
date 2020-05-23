import { reqOnUserAction } from './module/req-on-user-action.js';
import { addRowAddress } from './module/add-row-address.js';
import { selectAllButton } from './module/add-btn-event.js';
// document.addEventListener('DOMContentLoaded', () => {

const selectClienti = new Selectr('#select-clienti', { searchable: true, width: 300 });


const setCustomerElementEnabling = (stato) => {
    const elements = document.querySelectorAll('.cliente-form-element');
    elements.forEach((element) => {
        if (stato === 1) {
            if (element.id !== 'genere') {
                element.removeAttribute('disabled');
                element.readOnly = true;
            }
        } else {
            element.disabled = true;
            element.value = null;
        }
    });
};


document.querySelector('#select-clienti').addEventListener('change', (event) => {
    const selectNode = event.target;
    const selectIndex = selectNode.selectedIndex;
    const optionValue = selectNode.options[selectIndex].value;

    const addressList = document.querySelector('#indirizzi .list-tbody'); // [a]
    addressList.innerHTML = '';

    document.querySelector('.indirizzi-add').style.display = 'none';
    document.querySelector('.indirizzi-view').style.display = 'none';
    document.querySelector('.indirizzi-edit').style.display = 'none';

    if (optionValue === '0') {
        setCustomerElementEnabling(0);

        document.querySelector('#address-title').innerHTML = 'Elenco Indirizzi di ...';
        document.querySelector('.btn-new').style.display = 'none';
        return;
    }

    setCustomerElementEnabling(1);

    document.querySelector('.btn-new').style.display = 'block';
    const obj = { query: 'clienti', id: optionValue };
    const str = JSON.stringify(obj);
    const data = `data=${str}`; // console.log(data);
    const url = 'action-on-select-change';
    reqOnUserAction(url, data)
        .then((res) => {
            document.querySelector('#id').value = res.cliente.id;
            const optionValue = res.cliente.genere;
            document.querySelector('#genere').value = optionValue;
            document.querySelector('#nome').value = res.cliente.nome;
            document.querySelector('#cognome').value = res.cliente.cognome;
            document.querySelector('#c_fiscale').value = res.cliente.c_fiscale;
            document.querySelector('#p_iva').value = res.cliente.p_iva;
            document.querySelector('#tel').value = res.cliente.tel;
            document.querySelector('#email').value = res.cliente.email;
            document.querySelector('#add-cliente_id').value = res.cliente.id;

            document.querySelector('#address-title').innerHTML = `Elenco Indirizzi di ${res.cliente.nome} ${res.cliente.cognome}`;

            if (res.indirizzi.length === 0) {
                addressList.innerHTML = `<tr id="address-empty"><td colspan="9" style="text-align:center"><p>Nessun Indirizzo Associato a Questo Cliente</p></td></tr>`;
            } else {
                res.indirizzi.forEach(indirizzo => {
                    addRowAddress(indirizzo);  // console.log(indirizzo);
                });
                // selectAllRows();
            }
            selectAllButton();
        })
        .catch((err => console.log(err)));
});


// <INPUT-EVENT>
/**
 * controlla se per ogni campo input è presente o meno l'attributo 'invalid'
 * se presente vuol dire che i valori che l'utente ha inserito nei campi input
 * non rispondono ai requisiti di validità assegnati ai campi input tramite l'attributo 'pattern'
 * [a] Seleziona tutti i campi con l'attributo :invalid
 * [b] Se c'è almeno un valore NON valido il bottone di quei campi viene nascosto
 * [c] Se invece tutti i valori sono validi allora il bottone di quei campi viene mostrato
 */
const inputHandler = () => {
    // Aggiungi Indirizzo
    let invalidInputAdd = document.querySelectorAll('.card-input-add:invalid'); // [a]

    if (invalidInputAdd.length !== 0) { // [b]
        document.querySelector('.btn-card-add').disabled = true; // [b]
    } else { // [c]
        document.querySelector('.btn-card-add').removeAttribute('disabled'); // [c]
    }

    // Modifica Indirizzo
    let invalidInputUpdate = document.querySelectorAll('.card-input-edit:invalid'); // [a]

    if (invalidInputUpdate.length !== 0) { // [b]
        document.querySelector('.btn-card-update').disabled = true; // [b]
    } else {  // [c]
        document.querySelector('.btn-card-update').removeAttribute('disabled'); // [c]
    }
}


/**
 * Seleziona tutti i campi input e ci appende un evento che si
 * attiva al scriverci dentro attivanfo la fn inputHandler
 */
const selectAllAddInputs = () => {
    const inputs = document.querySelectorAll('INPUT');
    inputs.forEach((input) => {
        input.addEventListener('input', inputHandler, false);
    });
};
selectAllAddInputs();
// </INPUT-EVENT>



/* <TEST> */
/**
 * Aggiunge una nuovo elemento <TR> sotto quello appena cliccato
 * @param {event} e 
 */
/*
const addNewRowAfterSelectedRow = (e) => {
    let selectedRow = e.target;
    while (selectedRow.tagName !== 'TR') {
        selectedRow = selectedRow.parentNode;
    }
    const newRow = document.createElement('TR');
    selectedRow.insertAdjacentElement('afterend', newRow);
    const td = document.createElement('TD');
    td.innerText = 'test';
    newRow.appendChild(td);
}
*/

/**
 * Seleziona tutti gli elementi <tr> della tabella degli indirizzi
 */
/*
const selectAllRows = () => {
    const addressList = document.querySelectorAll('.list-tr');
    addressList.forEach((addressRow) => {
        addressRow.addEventListener('click', addNewRowAfterSelectedRow, true);
    });
};
*/
/* </TEST> */






// }); // CHIUDE DOMCONTENTLOADED


export { selectClienti };