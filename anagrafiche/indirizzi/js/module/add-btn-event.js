// import { editCustomer, updateCustomer } from './btn-action-customer.js';
import { addRowSql, viewAddress, viewMap, editAddress, updateRowSql, deleteRowSql } from './action-on-address.js';
import { handleCardsToShowOrHide } from './cards-handler.js';

// <BUTTONS>
const clickButton = (event) => {
    const button = event.target;
    const buttonClass = button.classList.item(1);
    switch (buttonClass) {
        case 'btn-new':
            button.style.display = 'none';
            document.querySelector('.indirizzi-add').style.display = 'block';
            break;
        case 'btn-view':
            viewAddress(button);
            break;
        case 'btn-edit':
            editAddress(button);
            break;
        case 'btn-canc': console.log(0);
            deleteRowSql(button);
            break;
        case 'btn-card-add':
            addRowSql();
            break;
        case 'btn-card-update':
            updateRowSql();
            break;
        case 'btn-card-map':
            viewMap();
            break;
        case 'btn-close':
            handleCardsToShowOrHide(button.classList.item(2));
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


export { selectAllButton }