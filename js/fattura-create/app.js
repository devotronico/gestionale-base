import { selectList } from './module/loader.js'; // eslint-disable-line
import { reqOnUserAction } from './module/req-on-user-action.js'; // eslint-disable-line
import { setEventToInputsProdotti, setEventToOptionIvaProdotti, setEventToSelectProdAndSEmil } from './module/dom-handler.js'; // eslint-disable-line

setEventToInputsProdotti();
setEventToOptionIvaProdotti();
setEventToSelectProdAndSEmil();
/**
 * * Protocolli Codici
 * [A1] Seleziona il nodo del codice, Es.:<span class="code">36/19/E</span>.
 * [A2] controllo sul nodo perchè potrebbe non essere ancora caricato nel DOM.
 * [A3] Dal nodo selezionato ottiene il testo del codice/protocollo.
 * [A4] Controlla se il nodo è senza testo.
 * [A5] Divide il codice nella posizione del char '/', Es 36/19/E diventa un array ['36', '19', 'E']
 * [A6] Incrementa di 1 il primo numero dell'array, da 36 diventa 37
 * [A7] cicla l'array per appendere al numero incrementato il resto del codice
 * [A8] Il testo del codice del protocollo incrementato viene assegnato al campo input
 * @param {object} event - al click sul bottone + prima dei protocolli
 */
const clickAddProtocol = (event) => {
    const btn = event.target;
    const node = btn.nextElementSibling.children[0]; // [A1]
    if (node === undefined) { return; } // [A2]
    const text = node.innerText; // [A3]

    if (!text) { return; } // [A4]

    const numeri = text.split('/'); // [A5]
    let numeroIncrementato = Number.parseInt(numeri[0], 10) + 1;
    for (let i = 1; i < numeri.length; i++) { // [A7]
        numeroIncrementato += `/${numeri[i]}`;
    }
    document.querySelector('#input-protocollo').value = numeroIncrementato; // [A8]
};

const btnAddProtocols = document.querySelectorAll('.btn-add-protocol');
btnAddProtocols.forEach(btn => btn.addEventListener('click', clickAddProtocol, false));


// <INPUT-RADIO> <Label-Cliente-Fornitore> <NAME-soggetto> <CLASS-input-radio>
/**
 * [B1] Nasconde il Label del codice di protocollo del documento elettronico
 * [B2] Mostra tutti i Label dei codici di protocollo dei documenti non elettronici
 * [B3] Reset dei campi Input con Label: PEC, Codice destinatario, Importo pagamento
 * [B4] Reset della Select con Label: Ulteriori Condizioni pagamento
 */
const resetInputFE = () => {
    document.querySelector('.protocollo_fe-si').style.display = 'none'; // [B1]
    const prots = document.querySelectorAll('.protocollo_fe-no'); // [B2]
    prots.forEach((prot) => { prot.style.display = 'block'; }); // [B2]
    document.querySelector('#pec').value = ''; // [B3]
    document.querySelector('#codice_destinatario').value = ''; // [B3]
    document.querySelector('#importo_pagamento_fe').value = ''; // [B3]
    document.querySelector('#condizioni_pagamento_fe').selectIndex = 0; // [B4]
    document.querySelector('#condizioni_pagamento_fe').value = '0'; // [B4]
};


/**
 * * Campo CHECKBOX di controllo per attivare o disattivare documento elettronico
 * * [C1] Se l'utente mette la spunta sceglie di creare un documento elettronico:
 * [C2] resetta il campo protocollo se non è un protocollo elettronico
 * [C3] mostra solo l'ultimo protocollo elettronico nel blocco con Label 'Protocollo Numero'
 * [C4] mostra i blocchi con Label:
 * PEC - Codice destinatario - Ulteriori Condizioni pagamento - Importo pagamento
 * ---
 * * [D1] Se l'utente NON mette la spunta sceglie di creare un documento normale:
 * [D2] resetta il campo protocollo se è un protocollo elettronico
 * [D3] nasconde i blocchi con Label:
 * PEC - Codice destinatario - Ulteriori Condizioni pagamento - Importo pagamento
 * [D4] richiama la funzione resetInputFE()
 * // TODO: rimuovere/aggiungere l' attributo name dai campi input per la fattura elettronica
 */
document.querySelector('#is_elettronica').addEventListener('change', (event) => {
    const prots = document.querySelectorAll('.protocollo_fe-no'); // [C3]
    const boxFEs = document.querySelectorAll('.box-fe');
    const protocol = document.querySelector('#input-protocollo').value;
    const regex = /\/E/;
    const result = regex.test(protocol);
    if (event.target.checked) { // [C1]
        if (!result) { document.querySelector('#input-protocollo').value = ''; } // [C2]
        document.querySelector('.protocollo_fe-si').style.display = 'block'; // [C3]
        prots.forEach((prot) => { prot.style.display = 'none'; }); // [C3]
        boxFEs.forEach((boxFE) => { boxFE.style.display = 'block'; }); // [C4]
    } else { // [D1]
        if (result) { document.querySelector('#input-protocollo').value = ''; } // [D2]
        boxFEs.forEach((boxFE) => {
            boxFE.style.display = 'none'; // [D3]
            // resetInputFE(); // [D4]
        });
        // const prots = document.querySelectorAll('.protocollo_fe-no'); // [B2]
        prots.forEach((prot) => { prot.style.display = 'block'; }); // [B2]
    }
});


/**
 * * NOTE: i commenti sotto si riferiscono al caso di scelta del fornitore.
 * [e1] alla select del Cliente viene assegnato il valore vuoto e
 * [e2] poi viene disabilitata
 * [e3] viene attivata la select del fornitore
 * [e4] in tutti i casi vengono resettati i campi con Label:
 *  PEC, Codice destinatario, Ulteriori Condizioni pagamento, Importo pagamento
 * @param {number} numA indice della lista delle select ( 1:Cliente, 2:Fornitore )
 * @param {number} numB indice della lista delle select ( 1:Cliente, 2:Fornitore )
 */
const chooseClienteOrFornitore = (soggettoA, soggettoB) => {
    selectList[soggettoB].setValue(''); // [e1]
    selectList[soggettoB].disable(); // [e2]
    selectList[soggettoA].enable(); // [e3]
    resetInputFE(); // [e4]
};


/**
 * [f1] In base alla seconda classe del input radio che
 * è stato cliccato/scelto: radio-cliente|radio-fornitore
 * [g1] Se è stato cliccato sul input radio del Cliente:
 * [g2] viene richiamata la funzione chooseClienteOrFornitore
 * [-] abilita/mostra la select con label Copia Da per copiare le fatture già emesse per i Clienti
 * ---
 * [h1] Se è stato cliccato sul input radio del Fornitore:
 * [h2] Viene richiamata la funzione chooseClienteOrFornitore
 * [h3] Viene nascosta/disabilitata/resettata la select con label Copia Da
 * [h4] il valore della select con label Copia Da viene settato a 0
 * [h5] il valore della select con label Pagamento viene settato a '' (resettato)
 * [h6] il test della textarea con label Note/Causale viene cancellato
 * @param {object} event - al click
 */
const clickRadio = (event) => {
    switch (event.target.classList.item(1)) { // [f1]
    case 'radio-cliente': // [g1]
        chooseClienteOrFornitore(1, 2); // [g2]
        break;
    case 'radio-fornitore': // [h1]
        chooseClienteOrFornitore(2, 1); // [h2]
        // document.querySelector('.box-dacopiare').style.display = 'none'; // [h3]
        // document.querySelector('#ddtdacopiare').selectIndex = 0; // [h4]
        // document.querySelector('#ddtdacopiare').value = '0'; // [h4]
        selectList[4].setValue(''); // [h5]
        document.querySelector('#note').value = ''; // [h6]
        break;
    default: console.log('default');
        break;
    }
};


/**
 * Seleziona i due input radio egli assegna l'evento click
 */
const radios = document.querySelectorAll("[type='radio']");
radios.forEach(radio => radio.addEventListener('click', clickRadio, false));
// </INPUT-RADIO> </Label-Cliente-Fornitore> </NAME-soggetto> </CLASS-input-radio>


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

// <SELECT-Copia-fattura> <ID-ddtdacopiare> <CLASS-select-xhr-copiada>
// class="select-1 select-xhr-copiada">
// TODO: aggiungere possibilità di copiare le fatture verso fornitore.
// In tal caso richiedere i dati al momento se non si dispongono già

/**
 * TODO: aggiungere possibilità di copiare le fatture verso fornitore.
 * In tal caso richiedere i dati al momento se non si dispongono già
 * ! [D1] controllare-indice-array
 */
document.querySelector('#ddtdacopiare').addEventListener('change', (event) => {
    const selectNode = event.target;
    const selectIndex = selectNode.selectedIndex;
    const optionValue = selectNode.options[selectIndex].value;
    if (optionValue === '0') {
        selectList[1].setValue('');
        selectList[4].setValue(0); // [D1]
        document.querySelector('#note').value = '';
        return;
    }
    const obj = { action: 'ddtdacopiare', id: optionValue };
    const str = JSON.stringify(obj);
    const data = `data=${str}`;
    reqOnUserAction(data)
        .then((res) => {
            selectList[1].setValue(res.cliente);
            selectList[4].setValue(res.fondo); // [D1]
            document.querySelector('#note').value = res.note;
        })
        .catch((err => console.log(err)));
});

// </SELECT-Copia-fattura> </ID-ddtdacopiare> </CLASS-select-xhr-copiada>


// <SELECT-Cliente-Fornitore-AltriIndirizzi>
let altriIndirizziSelect; // [B]
/**
 * [x1] Se il cliente non è TESCO STORES Ltd non carica gli indirizzi.
 * [x1] Commentare questo blocco di codice Per abilitare completamente la gestione degli indirizzi
 * [A] Se l'oggetto data ha lunghezza 1 e come proprietà text è uguale a 0
 * vuol dire che il soggetto non ha altri indirizzi da mostrare
 * quindi la select verrà nascosta all' utente.
 * [C1] Se non è stata ancora inizializzata la select viene inizializzata un unica volta
 * Il controllo evita di riinizializzare la select
 * [C2] Il methodo removeAll: rimuove tutte le option inserite precedentemente
 * [D] Il metodo add: in questa prima fase inserisce una option con valore 0 per
 * consentire all' utente di poter annullare la scelta di un altro indirizzo e
 * quindi non verrà salvato nella fattura.
 * [E] Il metodo add: in questa seconda fase inserisce nelle option gli
 * indirizzi trovati nel campo altriIndirizzi della tabella (clienti|fornitori)
 * [G] Viene mostrata la select Altri Indirizzi che di default è nascosta al refresh della pagina
 * @param {object} data - valore e testo che viene aggiunto alle option
 */
const indirizziHandler = (data) => {
    // <x1>
    const selectNode = document.querySelector('#clienti');
    const selectIndex = selectNode.selectedIndex;
    const soggettoText = selectNode.options[selectIndex].text;
    if (soggettoText !== 'TESCO STORES Ltd') { return; }
    // </x1>


    if (data.length === 1 && data[0].text === '0') { // [A]
        document.querySelector('.box-altriindirizzi').style.display = 'none';
        return;
    }

    if (altriIndirizziSelect === undefined) { // [C1]
        altriIndirizziSelect = new Selectr('.select-xhr-altriindirizzi', { searchable: true, width: 300, placeholder: 'Seleziona un altro Indirizzo' });
    }

    altriIndirizziSelect.removeAll(); // [C2]
    altriIndirizziSelect.add({ value: 0, text: 'Seleziona un Campo' }); // [D]
    altriIndirizziSelect.add(data); // [E]
    document.querySelector('.box-altriindirizzi').style.display = 'block'; // [G]
};


const codiciFEHandler = (data) => {
    document.querySelector('#pec').value = data.pec;
    document.querySelector('#codice_destinatario').value = data.codice_identificativo;
};


/**
 * [S1] Quando si seleziona un cliente/fornitore tra le option dalle select dei clienti o fornitori
 * [S2] Se il cliente non è TESCO STORES Ltd non carica gli indirizzi.
 * [S3] Ottiene l'id della select che equivale a 'clienti' oppure 'fornitori', questo valore viene
 * utilizzato per eseguire la query sulla tabella `clienti` oppure `fornitori`
 * * [S4] se alla proprietà action viene passata la stringa 'indirizzi-new'
 * * viene popolata la select con gli indirizzi presenti nella nuova tabella `indirizzi`
 * ! Con la table nuova `indirizzi` non carica l'indirizzo primario con
 * ! la query settata con ORDER BY DESC
 * ! Carica l'indirizzo primario solo se con ORDER BY ASC ma
 * ! lo mette nella ultima option della select
 * [S5] Vengono eseguite 2 request per ottenere i dati
 * [S6] Se i dati sono stati ottenuti vengono gestiti con la funzione indirizziHandler
 * @param {object} event -
 */
const chooseSoggetto = (event) => {
    const soggetti = event.target.id;
    const selectNode = event.target;
    const selectIndex = selectNode.selectedIndex;

    // const soggettoText = selectNode.options[selectIndex].text; // [S2]
    // if (soggettoText !== 'TESCO STORES Ltd') { return; } // [S2]

    const soggettoId = selectNode.options[selectIndex].value;
    if (soggettoId === '') { return; }

    const objIndirizzi = { action: 'indirizzi', soggetto: soggetti, id: soggettoId }; // [S3] [S4]
    const strIndirizzi = JSON.stringify(objIndirizzi);
    const dataIndirizzi = `data=${strIndirizzi}`;
    const objFE = {
        action: 'elettronica',
        soggetto: soggetti,
        id: soggettoId,
    };
    const strFE = JSON.stringify(objFE);
    const dataFE = `data=${strFE}`;

    reqOnUserAction(dataIndirizzi) // [S5]
        .then((res) => {
            indirizziHandler(res); // [S6]
            return reqOnUserAction(dataFE);
        })
        .then((res) => {
            codiciFEHandler(res); // [H]
        })
        .catch((err) => { console.log(err); });
};

const soggettiSelects = document.querySelectorAll('.soggetti'); // [S1]
soggettiSelects.forEach(soggettiSelect => soggettiSelect.addEventListener('change', chooseSoggetto, false)); // [S1]
// </SELECT-Cliente-Fornitore-AltriIndirizzi>


// <SELECT> <Label-Dichiarazione-di-intento> <ID-dicIntenti> <NAME-dicIntenti> <CLS-xhr-intenti>
/**
 * Quando si seleziona una option dalla select con Label: Dichiarazione-di-intento
 * con una espressione regolare viene estrapolato dal testo della option
 * solo il valore in euro della dichiarazione di intenti viene passato al campo input con id residuo
 * Es.:
 * 1. [Y1] Se il testo della option mostra il seguente testo:
 * 233493.41€ - CENTRO ESPORTAZIONI CONSERVATI SRL - 45
 * verrà catturato solo il valore dell' importo in euro che sarebbe: 233493.41€
 * poi viene eliminato il simbolo dell' euro: 233493.41
 * [Y2] e viene assegnato al campo input di tipo numerico con id residuo
 * 2. [Y3] Se invece il testo della option non contiene nessun importo
 * allora al campo input di tipo numerico con id residuo viene eliminato testo
 */
document.querySelector('#dicIntenti').addEventListener('change', (event) => {
    const selectNode = event.target;
    const selectIndex = selectNode.selectedIndex;
    const optionText = selectNode.options[selectIndex].text;

    const result = optionText.match(/-?[0-9]{1,}\.?[0-9]{1,}€/);
    if (result != null) { // [Y1]
        document.getElementById('residuo').value = +result[0].slice(0, -1); // [Y2]
        return;
    }
    document.getElementById('residuo').value = ''; // [Y3]
});
// </SELECT></Label-Dichiarazione-di-intento></ID-dicIntenti></NAME-dicIntenti></CLS-xhr-intenti>


// <SELECT><Label-Valuta><ID-valuta><NAME-valuta><CLS-select-static>
/**
 * [t1] Se la valuta scelta dalla select delle valute è EUR - euro
 * il valore del cambio è uguale a 1 e viene passato al campo input con id '#cambio'
 * [t1] Se la valuta scelta dalla select delle valute è DIVERSA da EUR - euro
 * il valore del cambio è ottenuto dal parametro della fn e passato al campo input con id '#cambio'
 * [t2] Viene preso il valore totale dell' imponibile dal campo input con id '#imponibile'
 * [t3] Per ottenere il valore dell'imponibile in euro moltiplica il cambio per il totale imponibile
 * [t4] Passa il valore dell'imponibile in euro al campo input con id '#imponibile-euro'
 * @param {number} cambio - valore del cambio
 */
const convertitore = (cambio = 1) => {
    document.getElementById('cambio').value = cambio; // [t1]
    const imponibile = document.getElementById('imponibile').value; // [t2]
    const imponibileEuro = imponibile * cambio; // [t3]
    document.getElementById('imponibile-euro').value = imponibileEuro.toFixed(2); // [t4]
};


/**
 * ? Nel campo `valuta` della tabella `ftout`:
 * ? viene registrato il nome della valuta Es.: euro - dollaro - sterlina
 * ? Non sarebbe meglio registrare il codice della valuta? Es.: EUR - USD - GBP
 * [V1] Quando si sceglie una valuta tra le Option della Select con Label 'Valuta'
 * [V2] estrae dal testo della Option selezionata il codice della valuta
 * il codice è formato sempre da 3 lettere in maiuscolo. Es.: per il dollaro è USD
 * [V3] Se il codice è uguale a EUR setta uguale a 1 il campo Input con Label 'Cambio'
 * [V4] Se il codice è diverso da EUR ottiene il valore di cambio dal webservice di fixer.io
 * l'unico parametro da passare all'endpoint è il codice della valuta
 * [V5] Quando si ottengono i dati dal webservice vengono convertiti in formato oggetto javascript
 * [V6] dai dati ricevuti si estrapola solo il valore di cambio e viene alla funzione convertitore
 */
document.querySelector('#valuta').addEventListener('change', (event) => { // [V1]
    const selectNode = event.target;
    const selectIndex = selectNode.selectedIndex;
    const optionText = selectNode.options[selectIndex].text;
    const codiceValuta = optionText.match(/[A-Z]{3}/)[0]; // [V2]
    if (codiceValuta === 'EUR') { // [V3]
        document.querySelector('#cambio').value = 1;
        // document.querySelector('#cambio-link').classList.remove('cambio-clickable');
        convertitore();
        return;
    }
    // document.querySelector('#cambio-link').classList.add('cambio-clickable');
    const BaseURL = 'http://data.fixer.io/api/latest';
    const APIKey = '?access_key=1675012151bac4aae76c5f06d85baf4c';
    const base = '&base=EUR';
    const symbol = `&symbols=${codiceValuta}`; // [V4]
    const urlComplete = `${BaseURL}${APIKey}${base}${symbol}`; // [V4]

    fetch(urlComplete)
        .then((response) => {
            return response.json(); // [V5]
        })
        .then((data) => {
            const cambio = data.rates[codiceValuta];
            convertitore(cambio); // [V6]
        })
        .catch(err => console.log(err));
});

/**
 * Dal campo Input con Label 'Cambio'
 * l'utente può modificare il valore di cambio manualmente
 * inserendo valori numerici da tastiera
 * Ogni valore numerico inserito viene passato come parametro alla funzione convertitore
 */
document.querySelector('#cambio').addEventListener('input', (event) => {
    const cambio = event.target.value;
    convertitore(cambio);
});

/**
 * * Al click sul testo cambio
 * [V1] Non succede niente se:
 * 1. Non è stata scelta una option nel select delle valute.
 * 2. See la option scelta ha come testo 'EUR'.
 * [V2] Altrimenti prende il valore nel campo input: type="number" id="cambio" name="cambio"
 * [V3] Sostituisce il punto con la virgola
 * [V4] Con la divisa scelta delle valute dell' option
 * e con il valore preso dal campo input
 * compone un link per aprire una pagina nel browser per mostrare il cambio attuale
 */
document.querySelector('#cambio-link').addEventListener('click', (event) => {
    const selectNode = document.querySelector('#valuta');
    const selectIndex = selectNode.selectedIndex;
    if (selectIndex === -1) { return; } // [V1]
    const optionText = selectNode.options[selectIndex].text;
    const valuta = optionText.match(/[A-Z]{3}/)[0];
    // if (valuta === 'EUR') { return; } // [V1]

    let cambioValue = event.target.nextElementSibling.value; // [V2]

    const regex = /\./;
    const replaceText = ',';
    cambioValue = cambioValue.replace(regex, replaceText); // [V3]

    // const url = `https://www.xe.com/it/currencyconverter/convert/?Amount=${cambioValue}&From=EUR&To=${valuta}`; // [V4]
    const url = 'https://it.finance.yahoo.com/valute'; // [V4]

    window.open(url); // [V4]
});
// </SELECT></Label-Valuta></ID-valuta></NAME-valuta></CLS-select-static>

// document.querySelector('.btn-primary').addEventListener('click', (e) => { console.log('CLICK BUTTON');
//     e.preventDefault();
// });


export { selectAllButtonDelete };
