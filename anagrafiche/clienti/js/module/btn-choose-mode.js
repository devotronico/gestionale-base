import { selectClienti, handleElementEnablingOnChooseOption, selectAllCustomerInputs } from '../index.js';


/**
 * Attiva modalità 'Crea un Cliente'
 * Al click sul bottone 'Crea un Cliente':
 *
 * Elementi della modalità 'Crea un Cliente'
 * [a] Viene disabilitato il bottone 'Crea un Cliente'.
 * [b] Mostra il form per la creazione di un cliente.
 *
 * Elementi della modalità 'Modifica i Clienti'
 * [c] Viene abilitato il bottone 'Modifica i Clienti'.
 * [d] Nasconde il form per la modifica di un cliente.
 * [e] Setta il valore di default nella <select> della lista clienti
 * [f] resetta il valore di tutti gli elemeneti <input> e <select>
 */
const setModeCreate = () => {
    // Elementi della modalità 'Crea un Cliente'
    document.querySelector('.btn-mode-create').disabled = true; // [a]
    document.querySelector('#clienti-create').style.display = 'block'; // [b]

    // Elementi della modalità 'Modifica i Clienti'
    document.querySelector('.btn-mode-revise').removeAttribute('disabled'); // [c]
    document.querySelector('#clienti-revise').style.display = 'none'; // [d]

    selectClienti.setValue('');
    handleElementEnablingOnChooseOption(0);
    selectAllCustomerInputs('create');
};


/**
 * Attiva modalità 'Modifica i Clienti'
 * Al click sul bottone 'Modifica i Clienti':
 *
 * Elementi della modalità 'Modifica i Clienti'
 * [a] Viene disabilitato il bottone 'Modifica i Clienti'.
 * [b] Mostra il form per la modifica di un cliente.
 *
 * Elementi della modalità 'Crea un Cliente'
 * [c] Viene abilitato il bottone 'Crea un Cliente'.
 * [d] Nasconde il form per la creazione di un cliente.
 */
const setModeRevise = () => {
    // Elementi della modalità 'Modifica i Clienti'
    document.querySelector('.btn-mode-revise').disabled = true; // [a]
    document.querySelector('#clienti-revise').style.display = 'block'; // [b]

    // Elementi della modalità 'Crea un Cliente'
    document.querySelector('.btn-mode-create').removeAttribute('disabled'); // [c]
    document.querySelector('#clienti-create').style.display = 'none'; // [d]


    const elements = document.querySelectorAll('.c-form-element'); // [a]
    elements.forEach((element) => { // [b]
        // element.disabled = true;  // [d]
        element.value = '';  // [d]
        // element.value = null;  // [d]
    });



    selectAllCustomerInputs('revise');
};


export { setModeCreate, setModeRevise };