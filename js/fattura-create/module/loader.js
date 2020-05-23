import { messageError } from './error-handler.js';  // eslint-disable-line
import { showPageAfterloading, handlerProtocols } from './dom-handler.js';  // eslint-disable-line

console.time('tempo');
const urlString = window.location.href;
const url = new URL(urlString);
let tipologia = url.searchParams.has('tipologia') ? url.searchParams.get('tipologia') : 'bianco';
if (tipologia !== 'ordine' && tipologia !== 'bianco') { tipologia = 'bianco'; }
// let tipologia = 'bianco';


// const test = window.location.href;
const base = location.href.replace(/[^/]*$/, '');
console.log(base);
// Sviluppo: http://localhost/workspace/gestionale-mini/xxdati/
// Produzione: http://www.goielli.it/xxdati/


const getData = (tipologia, element) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
        const xhttp = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
        xhttp.onreadystatechange = function () { // eslint-disable-line
            switch (xhttp.readyState) {
                case 0: /* console.log("readyState 0: "+xhttp.readyState); */ break;
                case 1: /* console.log("readyState 1: "+xhttp.readyState); */ break;
                case 2: /* console.log("readyState 2: "+xhttp.readyState); */ break;
                case 3: /* console.log("readyState 3: "+xhttp.readyState); */ break;
                case 4: // console.log("readyState 4: "+xhttp.readyState);
                    if (xhttp.status >= 200 && xhttp.status < 300) {
                        const str = xhttp.responseText; // contenuto ricevuto dal server
                        const obj = JSON.parse(str); console.log(obj);
                        if (obj.hasOwnProperty('error')) { // eslint-disable-line
                            return messageError(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(new Error('something bad happened'));
                    }
                    break;
                default: break;
            }
        };
        xhttp.open('POST', `${base}async/fattura-create/query-${tipologia}.php`, true); // S-SI, P-NO
        // xhttp.open('POST', `http://www.goielli.it/xxdati/async/fattura-create/query-${tipologia}.php`, true); // S-SI, P-NO
        // xhttp.open('POST', `./async/fattura-create/query-${tipologia}.php`, true); // S-SI, P-NO
        // xhttp.open('POST', `./xxdati/async/fattura-create/query-${tipologia}.php`, true); // S-NO, P-NO
        // xhttp.open('POST', `./async/fattura-create/query-${tipologia}.php`, true); // S-NO, P-NO
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(`query=${element}`);
    });
};


const queryListBianco = [
    'copiada',
    'cliente',
    'fornitore',
    'valuta',
    'pagamento',
    'fondo',
    'intenti',
    'confezioni_b',
    'semilavorati_b',
    'vat_b',
    'unitamisura_b',
    'ddt_b',
];


const selectProp = [
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: false },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: true, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: false },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: false },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: false, multiple: false, defaultSelected: true },
    { searchable: true, width: 300, disabled: false, multiple: true, defaultSelected: false },
];

let promises = []; // eslint-disable-line
let selectList = []; // eslint-disable-line


// TODO: aggiungere nuove proprietà
for (let i = 0; i < queryListBianco.length; i++) {
    selectList.push(new Selectr(`.select-xhr-${queryListBianco[i]}`, {
        searchable: selectProp[i].searchable,
        width: selectProp[i].width,
        disabled: selectProp[i].disabled,
        multiple: selectProp[i].multiple,
        defaultSelected: selectProp[i].defaultSelected,
    }));
    promises.push(getData(tipologia, queryListBianco[i]));
}


getData(tipologia, 'protocols')
    .then((data) => {
        handlerProtocols(data);
        return Promise.all(promises);
    })
    .then((data) => {
        selectList.forEach((select, index) => select.add(data[index]));
        showPageAfterloading();
        console.timeEnd('tempo');
    })
    .catch((err) => {
        console.log(err);
    });

export { selectList }; // eslint-disable-line
