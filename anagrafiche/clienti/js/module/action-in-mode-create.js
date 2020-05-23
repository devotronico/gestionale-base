import { request } from './request.js';
import { showMessage } from './message-handler.js'; // eslint-disable-line

const createCustomer = () => {
    const nome = document.querySelector('#c-nome').value;
    const cognome = document.querySelector('#c-cognome').value;
    const genere = document.querySelector('#c-genere').value;
    const c_fiscale = document.querySelector('#c-c_fiscale').value;
    const p_iva = document.querySelector('#c-p_iva').value;
    const tel = document.querySelector('#c-tel').value;
    const email = document.querySelector('#c-email').value;
    const facebook = document.querySelector('#c-facebook').value;
    const obj = { action: 'create', genere, nome, cognome, c_fiscale, p_iva, tel, email, facebook };
    const str = JSON.stringify(obj);
    const data = `data=${str}`; console.log(data);
    const url = 'action-on-customer';
    request(url, data)
        .then((obj) => {
            document.querySelector('.btn-create').disabled = true;

            document.querySelector('#c-id').value = obj.idCliente;

            document.querySelector('#c-nome').value = null;
            document.querySelector('#c-cognome').value = null;
            document.querySelector('#c-genere').selectedIndex = null;
            document.querySelector('#c-c_fiscale').value = null;
            document.querySelector('#c-p_iva').value = null;
            document.querySelector('#c-tel').value = null;
            document.querySelector('#c-email').value = null;
            document.querySelector('#c-facebook').value = null;

            showMessage(obj, 'success');
        })
        .catch((err => console.log(err)));

};


export { createCustomer };