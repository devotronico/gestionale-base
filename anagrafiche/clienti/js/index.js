import { selectAllButton } from './module/add-btn-event.js';
import { request } from './module/request.js';

const selectClienti = new Selectr('#select-clienti', { searchable: true, width: 'auto' });

selectAllButton();

/**
 * In revise mode, alla scelta di una <option> nell' elemento <select>
 * [a] Seleziona tutti gli elementi del form (<select> e <input>)
 * [b] Per ogni elemento trovato
 *   [c] Se è stato selezionata una <option> con valore '(stato === 1)'
 *   agli elementi <input> viene rimosso l' attributo 'disabled' e viene aggiunto l' attributo 'readOnly'
 *   [d] Se è stato selezionata la <option> senza valore
 *   a tutti gli elementi <input> viene aggiunto l' attributo 'disabled' e viene resettato il testo
 * @param {int} stato - 1: <option> con value diverso da 0 | 0: <option> con value uguale a 0
 */
const handleElementEnablingOnChooseOption = (stato) => {
    const elements = document.querySelectorAll('.r-form-element'); // [a]
    elements.forEach((element) => { // [b]
        if (stato === 1) { // [c]
            if (element.id !== 'r-genere') {
                element.removeAttribute('disabled');
                element.readOnly = true;
            }
        } else { // [d]
            element.disabled = true;
            element.value = null;
        }
    });
};

document.querySelector('#select-clienti').addEventListener('change', (event) => {
    const selectNode = event.target;
    const selectIndex = selectNode.selectedIndex;
    const optionValue = selectNode.options[selectIndex].value !== undefined ? selectNode.options[selectIndex].value : '';

    if (optionValue === '') {
        handleElementEnablingOnChooseOption(0);
        document.querySelector('.btn-edit').disabled = true;
        document.querySelector('.btn-revise').disabled = true;
        document.querySelector('.btn-canc').disabled = true;
        return;
    }

    handleElementEnablingOnChooseOption(1);

    document.querySelector('.btn-edit').removeAttribute('disabled');
    document.querySelector('.btn-revise').disabled = true;
    document.querySelector('.btn-canc').disabled = true; // ?

    const obj = { query: 'clienti', id: optionValue };
    const str = JSON.stringify(obj);
    const data = `data=${str}`; // console.log(data);
    const url = 'action-on-select-change';
    request(url, data)
        .then((res) => {
            document.querySelector('#r-id').value = res.id;
            const optionValue = res.genere;
            document.querySelector('#r-genere').value = optionValue;
            document.querySelector('#r-nome').value = res.nome;
            document.querySelector('#r-cognome').value = res.cognome;
            document.querySelector('#r-c_fiscale').value = res.c_fiscale;
            document.querySelector('#r-p_iva').value = res.p_iva;
            document.querySelector('#r-tel').value = res.tel;
            document.querySelector('#r-email').value = res.email;
            document.querySelector('#r-facebook').value = res.facebook;
        })
        .catch((err => console.log(err)));
});


// <INPUT-EVENT>
/**
 * Controlla se per ogni campo input è presente o meno l'attributo 'invalid'
 * se presente vuol dire che i valori che l'utente ha inserito nei campi input
 * non rispondono ai requisiti di validità assegnati ai campi input tramite l'attributo 'pattern'
 * [a] Seleziona tutti i campi con l'attributo :invalid
 * [b] Se c'è almeno un valore NON valido il bottone di quei campi viene nascosto
 * [c] Se invece tutti i valori sono validi allora il bottone di quei campi viene mostrato
 */
const handleButtonOnInputValidity = (mode) => {
    const listInvalidInput = document.querySelectorAll(`.input-${mode}:invalid`); // [a]

    if (listInvalidInput.length !== 0) { // [b]
        document.querySelector(`.btn-${mode}`).disabled = true; // [b]
    } else { // [c]
        document.querySelector(`.btn-${mode}`).removeAttribute('disabled'); // [c]
    }
}


/**
 * Seleziona tutti i campi input del form del cliente e ci appende un evento
 * che si attiva al scriverci dentro attivando la fn handleButtonOnInputValidity
 */
const selectAllCustomerInputs = (mode) => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.removeEventListener('input', handleButtonOnInputValidity, false);
    });

    const inputMode = document.querySelectorAll(`.input-${mode}`);
    inputMode.forEach((input) => {
        input.addEventListener('input', () => {
            handleButtonOnInputValidity(mode);
        });
    }, false);
};
selectAllCustomerInputs('create');
// </INPUT-EVENT>


export { selectClienti, handleElementEnablingOnChooseOption, selectAllCustomerInputs };