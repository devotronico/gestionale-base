/**
 * Mostra il contenuto della pagina dopo il caricamento di tutti i dati
 */
const showPageAfterloading = () => {
    document.querySelector('.loader').classList.add('hidden'); // nasconde la schermata di caricamento
    document.body.style.overflow = 'visible'; // attiva lo scroll per la pagina 
};


const handlerProtocols = (data) => {
    const labels = ['Ultima T: ', 'Ultima B: ', 'Ultima numerata: ', 'Ultima elettronica: '];
    data.forEach((protocol, index) => {
        protocol = protocol === null ? '' : protocol;
        document.querySelector(`.protocollo-${index}`).innerHTML = `${labels[index]}<span class="code">${protocol}</span>`;
    });
};


/**
 * Questa funzione viene richiamata ogni volta che viene premuto un tasto su un campo input
 * presente nelle righe dei prodotti/servizi
 * Ogni volta che viene richiamata fa la somma di tutti i valori numerici presenti nello stesso tipo
 * di campo input e scrive la somma in un determinato campo input presente nella tabella superiore
 * @param {string} param1 - id dei campi input da selezionare delle righe prodotti/servizi
 * @param {string} param2 - unico id del campo dove va inserita la somma
 */
const totale = (param1, param2) => {
    const grossW = document.querySelectorAll(param1);
    let totaleGW = 0;
    for (let i = 0; i < grossW.length; i++) {
        const number = Number.parseInt(grossW[i].value, 10);
        if (number > 0) {
            totaleGW += number;
        }
    }
    if (totaleGW > 0) {
        document.getElementById(param2).value = totaleGW; return;
    }
    document.getElementById(param2).value = '';
};


const capienzaDichiarazione = () => {
    const imponibile = +document.getElementById('imponibile').value; // Label: Totale Imponibile
    const residuo = +document.getElementById('residuo').value; // Label: Residuo Dic.

    if (residuo !== 0) {
        if (imponibile > residuo) {
            const conferma = confirm('Non cè più capienza nella dichiarazione di intento selezionata. Continuare lo stesso?'); // eslint-disable-line

            if (conferma === false) {
                document.getElementById('imponibile').style.backgroundColor = 'red';
                document.getElementById('carica').style.display = 'none';
            }
        } else {
            document.getElementById('imponibile').style.backgroundColor = 'white';
            document.getElementById('carica').style.display = 'inline-block';
        }
    }
};


const convertitore = () => {
    const imponibile = document.getElementById('imponibile').value;
    const cambio = document.getElementById('cambio').value;
    const imponibileEuro = imponibile * cambio;
    document.getElementById('imponibile-euro').value = imponibileEuro.toFixed(2);
};


const sommarighe = () => {
    const totali = document.querySelectorAll('input[id^="tot"]');
    let totaleIvato = 0;
    for (let i = 0; i < totali.length; i++) {
        totaleIvato += parseFloat(totali[i].value);
    }

    document.getElementById('ivato').value = totaleIvato; // Totale Documento //

    // disattivato momentaneamente
    // document.getElementById('importo_pagamento_fe').value = totaleIvato; // [!]

    const pzt = document.querySelectorAll('input[id*="pzt"]');
    let totaleImponibile = 0;
    for (let i = 0; i < pzt.length; i++) {
        totaleImponibile += parseFloat(pzt[i].value);
    }

    // assegna il valore al campo input con Label: Totale Imponibile
    document.getElementById('imponibile').value = totaleImponibile.toFixed(2);
    const totaleIva = totaleIvato - totaleImponibile;
    document.getElementById('iva').value = totaleIva.toFixed(2);
    return convertitore(), capienzaDichiarazione(); // eslint-disable-line
};


// <INPUT-Pz-Unitario>
/**
 * Seleziona i campi con i seguenti id:
 * qt   [RIGA-TOP] [Label: Quantità]     [Class: input-quantita]
 * pzu  [RIGA-TOP] [Label: Pz Unitario]  [Class: input-prezzounitario]
 * disc [RIGA-TOP] [Label: Discount]     [Class: input-discount]
 * pzt  [RIGA-TOP] [Label: Pz Totale]    [Class: input-prezzototale]
 * aliq [RIGA-TOP] [Label: V.A.T.]       [Class: select-xhr-vat]
 * tot  [RIGA-BOT] [Label: Totale Ivato] [Class: input-totaleivato]
 *
 * [IVA] I valori dell'iva sono all'interno del' elemento select con:
 * Label V.A.T., e attributi: name="aliq0" id="aliq0" class="select-xhr-vat select-vat"
 * [I1] La select dell' iva la selezioniamo utilizzando l'id aliq + numero della riga/prodotto
 * [I2] Per catturare il valore dell'iva dalla option scelta bisogna estrarla dal testo. Es.:
 * nella option che mostra come testo 20% si deve eliminare il simbolo della percentuale,
 * [I3] per fare ciò si utilizza una espressione regolare che se trova il simbolo %
 * [I4] lo rimuove e lascia solo il numero
 * [I5] altrimenti se non trova il simbolo % il valore della percentuale rimane 0
 * @param {*} numProdotto
 */
const calcolariga = (numProdotto) => {
    const idQt = `qt${numProdotto}`;
    const idPzu = `pzu${numProdotto}`;
    const idDisc = `disc${numProdotto}`;
    const idPzt = `pzt${numProdotto}`;
    const totLabel = `tot${numProdotto}`;

    const valQt = document.getElementById(idQt).value || 0;
    const valPzu = document.getElementById(idPzu).value || 0;
    const valDisc = document.getElementById(idDisc).value || 0;

    // <IVA>
    const idVat = `aliq${numProdotto}`; // [I1]
    const vat = document.getElementById(idVat).selectedIndex; // [I1]
    const vatText = document.getElementById(idVat)[vat].text; // [I2]
    let valVat = 0; // [I5]
    const regex = /[0-9]{1,2}%/; // [I3]
    const result = vatText.match(regex); // [I3]
    if (result != null) { // [I3]
        valVat = +result[0].slice(0, -1); // [I4]
    }
    // </IVA>

    const totImp = valQt * valPzu * (1 - valDisc / 100);

    document.getElementById(idPzt).value = totImp.toString();
    // document.getElementById(idPzt).value = totImp.toFixed(4);

    const totIvato = totImp * valVat / 100 + totImp;

    document.getElementById(totLabel).value = totIvato.toFixed(2);
    // document.getElementById('importo_pagamento_fe').value = totIvato.toFixed(2);

    return sommarighe();
};
// </INPUT-Pz-Unitario>


/**
 * [Z] rigaProdotto: il numero della riga-prodotto della tabella dei prodotti e servizi
 * al refresh della pagina abbiamo un solo riga-prodotto
 * ogni riga-prodotto contiene due righe.
 * la riga top contiene i seguenti campi con label:
 * Confezione - Semi-lavorato - Quantità - Pz Unitario - Discount - Pz Totale - V.A.T. - UM
 * la riga bottom contiene i seguenti campi con label:
 * Totale Ivato - Gross Weight - Net Weight - CBM - HS Code - Note - DDT
 * @param {*} event
 */
const inputProdotti = (event) => {
    const node = event.target;

    // se il node è un elemento input
    let numRigaProdotto = node.parentNode.parentNode.parentNode.getAttribute('prodotto'); // [Z]

    // se il node è una elemento select
    // a causa della libreria il parent che ha l'attributo 'prodotto'
    // si trova a un livello ancor più superiore
    if (numRigaProdotto === null) {
        numRigaProdotto = node.parentNode.parentNode.parentNode.parentNode.getAttribute('prodotto');
    }

    switch (node.classList.item(1)) {
    case 'input-quantita':
    case 'input-prezzounitario':
    case 'input-discount':
    case 'select-vat':
        calcolariga(numRigaProdotto);
        break;
    case 'input-grossweight': totale('input[id^="gw"]', 'grwTOT');
        break;
    case 'input-netweight': totale('input[id^="nw"]', 'ntwTOT');
        break;
    case 'input-cbm': totale('input[id^="cbm"]', 'volTOT');
        break;
    default:
        break;
    }
};


const setEventToInputsProdotti = () => {
    const inputs = document.querySelectorAll('.table-2_input-number');
    inputs.forEach(input => input.addEventListener('input', inputProdotti));
};


const setEventToOptionIvaProdotti = () => {
    const ivas = document.querySelectorAll('.select-xhr-vat');
    ivas.forEach(iva => iva.addEventListener('change', inputProdotti));
};


// <DELETE-ROW>
const deleteRow = (event) => {
    const rowBottom = event.target.parentNode.parentNode.parentNode;
    rowBottom.previousSibling.remove();
    rowBottom.remove();
};

// seleziona tutti i bottoni delete
const selectAllButtonDelete = () => {
    const buttons = document.querySelectorAll('.btn-danger');
    buttons.forEach((button) => {
        button.addEventListener('click', deleteRow, false);
    });
};
selectAllButtonDelete();
// </DELETE-ROW>


export { showPageAfterloading, handlerProtocols, setEventToInputsProdotti, setEventToOptionIvaProdotti, selectAllButtonDelete };
