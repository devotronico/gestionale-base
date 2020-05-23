import { setModeCreate, setModeRevise } from './btn-choose-mode.js';
import { createCustomer } from './action-in-mode-create.js';
import { editCustomer, updateCustomer, deleteCustomer } from './action-in-mode-revise.js';

// <BUTTONS>

const clickButton = (event) => {
    const button = event.target;
    const buttonClass = button.classList.item(1);
    switch (buttonClass) {
        case 'btn-mode-create':
            setModeCreate();
            break;
        case 'btn-mode-revise':
            setModeRevise();
            document.querySelector('#message').innerHTML = '';
            break;
        case 'btn-create':
            createCustomer();
            break;
        case 'btn-edit': console.log('btn-edit');
            editCustomer();
            break;
        case 'btn-revise':
            updateCustomer();
            break;
        case 'btn-canc':
            deleteCustomer();
            break;
        case 'btn-close':
            document.querySelector('#message').innerHTML = '';
            break;
        default: console.log('Errore: Bottone non trovato');
            break;
    }
}


/**
 * Seleziona tutti i bottoni che attivano la funzione 'clickButton'
 * al verificarsi dell evento 'click'.
 * A tutti i bottoni è stata assegnata la classe btn
 */
const selectAllButton = () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
        button.addEventListener('click', clickButton, false);
    });
};
// </BUTTONS>


export { clickButton, selectAllButton }