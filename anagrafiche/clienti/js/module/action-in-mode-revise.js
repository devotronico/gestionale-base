import { request } from './request.js';
import { selectClienti } from '../index.js';


// https://www.w3schools.com/js/js_validation_api.asp


/**
 * Al click sul bottone 'Modifica il Cliente'
 * [a] il bottone 'edit' viene disabilitato e i bottoni 'save' e 'del' vengono abilitati
 * ---
 * [b] Vengono selezionati tutti gli elementi del form per ciclarli
 *   [c] All' elemento <select> viene rimosso l'attributo 'disabled'
 *   [d] Agli elementi <input> vengono rimossi gli attributi 'readOnly'
 *   [e] Se viene trovato un elemento con un valore non valido
 *       viene disabilitato il bottone 'Salva Modifiche al Cliente'
 */
const editCustomer = () => {
    document.querySelector('.btn-edit').disabled = true; // [a]
    document.querySelector('.btn-revise').removeAttribute('disabled'); // [a]
    document.querySelector('.btn-canc').removeAttribute('disabled'); // [a]

    const elements = document.querySelectorAll('.r-form-element'); // [b]
    elements.forEach((element) => {
        if (element.id === 'r-genere') { // [c]
            element.removeAttribute('disabled');
        } else if (element.id !== 'r-id') { // [d]
            element.readOnly = false;
        }

        if (element.validity.valid === false) { // [e]
            document.querySelector('.btn-revise').disabled = true;
        }
    });
}


/**
 * Al click sul bottone 'Salva Modifiche al Cliente'
 * [a] Seleziona tutti gli elementi <input> e <select> del form dei clienti
 * [b] per ogni elemento trovato:
 *   [c] L' elemento <select> con id: 'genere' viene disabilitato
 *   [d] L' elemento <input> con id: diverso da 'id' vengono settati come di sola lettura
 *
 * <e> Prende tutti i valori del form del cliente per salvarli nel database
 * [f] i valori ottenuti vengono inseriti in un oggetto
 * [g] l'oggetto viene convertito in una stringa json
 * [h] Url della request
 * [i] funzione che fa una richiesta http al server per salvare i dati nel db
 * [l] dopo che i dati sono stati salvati
 *   [m] il bottone 'edit' viene abilitato e i bottoni 'save' e 'del' vengono disabilitati
 *   <n> l'elemento <option> della <select> viene aggiornato con il nome e cognome appena salvati nel db
 */
const updateCustomer = () => {
    const elements = document.querySelectorAll('.r-form-element'); // [a]
    elements.forEach((element) => { // [b]
        if (element.id === 'r-genere') { // [c]
            element.disabled = true; // [c]
        } else if (element.id !== 'r-id') { // [d]
            element.readOnly = true; // [d]
        }
    });

    // <e>
    const idCliente = document.querySelector('#r-id').value;
    const genere = document.querySelector('#r-genere').value;

    let nome = document.querySelector('#r-nome').value;
    nome = nome.trim().split(' ').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');

    let cognome = document.querySelector('#r-cognome').value;
    cognome = cognome.trim().split(' ').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');

    const c_fiscale = document.querySelector('#r-c_fiscale').value;
    const p_iva = document.querySelector('#r-p_iva').value;
    const tel = document.querySelector('#r-tel').value;
    const email = document.querySelector('#r-email').value;
    const facebook = document.querySelector('#r-facebook').value;
    // </e>
    const obj = { action: 'update', idCliente, genere, nome, cognome, c_fiscale, p_iva, tel, email, facebook }; // [f]

    const str = JSON.stringify(obj); // [g]
    const data = `data=${str}`; // [g]
    const url = 'action-on-customer'; // [h]
    request(url, data) // [i]
        .then(res => {
            document.querySelector('.btn-edit').removeAttribute('disabled'); // [m]
            document.querySelector('.btn-revise').disabled = true; // [m]
            document.querySelector('.btn-canc').disabled = true; // [m]

            // <n>
            const arrayOfObjects = selectClienti.serialize();
            arrayOfObjects.forEach(obj => {
                if (obj.value == idCliente) {
                    obj.text = `${nome} - ${cognome}`;
                }
            });
            selectClienti.removeAll();
            selectClienti.add(arrayOfObjects);
            // </n>
        })
        .catch(err => console.log(err));
}


const deleteCustomer = () => {
    console.log('deleteCustomer');
};


export { editCustomer, updateCustomer, deleteCustomer };