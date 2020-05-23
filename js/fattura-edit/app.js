import { selectBodyList, loaded } from './module/loader.js';
import { reqOnUserAction } from './module/req-on-user-action.js';


// <INPUT-RADIO> <Label-Cliente-Fornitore> <NAME-soggetto> <CLASS-input-radio>
/**
 * * NOTE: i commenti sotto si riferiscono al caso di scelta del fornitore invece del cliente.
 * [a2] Viene abilitata la select dei fornitori
 * [a2] Alla select del Cliente viene assegnato il valore 0 (nessun cliente selezionato)
 * [a3] La select del Cliente viene disabilitata
 * [a4] Viene mostrata la select dei fornitori
 * [a5] La select del Cliente viene nascosta
 * @param {int} numA indice della lista delle select ( 1:Cliente, 2:Fornitore )
 * @param {int} numB indice della lista delle select ( 1:Cliente, 2:Fornitore )
 */
const chooseClienteOrFornitore = (soggettoA, soggettoB) => { console.log('FUNCTION chooseClienteOrFornitore');
    selectBodyList[soggettoB].setValue(''); // [a2]
    selectBodyList[soggettoB].disable(); // [a3]
    selectBodyList[soggettoA].enable(); // [a1]
    // document.querySelector(`.box-${soggettoA}`).style.display = 'block'; // [a4]
    // document.querySelector(`.box-${soggettoB}`).style.display = 'none'; // [a5]
};

/**
 * Se è stato cliccato un campo input radio del Cliente o del Fornitore:
 * [b1] Vengono rimosse tutte le option degli indirizzi dalla select 'Altri indirizzi'
 * [b2] In base alla seconda classe del input radio cliccato: (radio-cliente|radio-fornitore)
 * viene richiamata la funzione chooseClienteOrFornitore con parametri diversi invertiti
 * @param {event} event - al click
 */
const clickRadio = (event) => { console.log('FUNCTION clickRadio');
    selectBodyList.indirizzo.removeAll(); // [b1]
    switch (event.target.classList.item(1)) { // [b2]
    case 'radio-cliente': // [Q1]
    console.log('CLIENTE');
        //chooseClienteOrFornitore(1, 2); // [g2]
        chooseClienteOrFornitore('clienti', 'fornitori'); // [b3]
        break;
    case 'radio-fornitore': // [R1]
    console.log('FORNITORE');
        // chooseClienteOrFornitore(2, 1); // [h2]
        chooseClienteOrFornitore('fornitori', 'clienti'); // [b3]
        break;
    default: console.log('default');
        break;
    }
};

/**
* Seleziona gl unici due input radio e gli assegna l'evento click
*/
const radios = document.querySelectorAll("[type='radio']");
radios.forEach(radio => radio.addEventListener('click', clickRadio, false));
// </INPUT-RADIO> </Label-Cliente-Fornitore> </NAME-soggetto> </CLASS-input-radio>


// <SELECT-Cliente-Fornitore-AltriIndirizzi>
/**
 * [x1] Se il cliente non è TESCO STORES Ltd non carica gli indirizzi.
 * [x1] Commentare questo blocco di codice Per abilitare completamente la gestione degli indirizzi
 * ! [d0] Se l'oggetto data ha lunghezza 1 e come proprietà text è uguale a 0
 * ! vuol dire che il soggetto ha solo un indirizzo e non ha altri indirizzi da mostrare
 * ! quindi la select verrà nascosta all' utente. FARE TEST
 * ! [d1] FARE TEST per verificare se sono necessari controlli e di che tipo sugli indirizzi
 * [d2] Il methodo removeAll: rimuove tutte le option inserite precedentemente
 * [d3] Alla lista di indirizzi viene inserita l'oggetto { value: 0, text: 'Seleziona un Campo'}
 * per popolare la select che ha come prima option una con il testo 'Seleziona un Campo'.
 * Questa option se viene selezionata consente all' utente di poter annullare la scelta
 * di un altro indirizzo ma nella tabella `ftout` verrà comunque salvato
 * l'indirizzo primario/di default del soggetto.
 * [d4] Il metodo add: popola la select degli indirizzi con tutti gli indirizzi trovati nel campo
 * `indirizzo` e `altriIndirizzi` della tabella (clienti|fornitori) del soggetto selezionato
 * @param {object} data - valore e testo che viene aggiunto alle option
 */
const indirizziHandler = (data) => {
    // <x1>
    const selectNode = document.querySelector('#clienti');
    const selectIndex = selectNode.selectedIndex;
    const soggettoText = selectNode.options[selectIndex].text;
    if (soggettoText !== 'TESCO STORES Ltd') { return; }
    // </x1>

    console.log('FUNCTION indirizziHandler');
    if (data.length === 1 && data[0].text === '0') { console.log('LENGHT:1 && TEXT:0'); } // [d0]
    if (data[0].text === null) { // [d1]
        console.log('NULL');
        return;
    }
    selectBodyList.indirizzo.removeAll(); // [d2]
    data.unshift({ value: 0, text: 'Seleziona un Campo' }); // [d3]
    selectBodyList.indirizzo.add(data); // [d4]
};


/**
 * [c1] Controllo che blocca la funzione se tutti i dati non sono stati caricati nella pagina
 * [c2] Ottiene l'id della select che equivale a 'clienti' oppure 'fornitori', questo valore viene
 * utilizzato per eseguire la query sulla tabella `clienti` oppure `fornitori`
 * [c3] Ottiene l'indice della option selezionata
 * [c4] Ottiene il valore dell'attributo value della option selezionata che corrisponde
 * al valore del campo `id` della del fornitore/cliente delle tabelle `clienti`/`fornitori`
 * [c5] Se il valore dell'attributo value della option è vuoto blocca la funzione
 * [c6] Prepara i dati per fare la query e ottenere gli indirizzi dalla table `clienti`|`fornitori`
 * * se alla proprietà query viene passata la stringa 'indirizzi-new'
 * * viene popolata la select con gli indirizzi presenti nella nuova tabella `indirizzi`
 * [c7] chiamata asyncrona con risposta gestita dalla Promise
 * [c8] Es.: res = [{value: "via ...", text: "via ..."},{value: "via ...", text: "via ..."}]
 * [c9] Se i dati array di oggetti sono stati ottenuti vengono gestiti con la fn indirizziHandler
 * [c10] Nel caso i dati non sono stati ottenuti...
 * ! Se si utilizza la tabella nuova `indirizzi`
 * ! non carica l'indirizzo primario con la query settata con ORDER BY DESC
 * ! Carica l'indirizzo primario solo se con ORDER BY ASC ma
 * ! lo mette nella ultima option della select
 */
const chooseSoggetto = (event) => {
    if (loaded === undefined) { return; } // [c1]
    console.log('FUNCTION chooseSoggetto');
    const selectNode = event.target;
    const soggetti = selectNode.id; // [c2]
    const selectIndex = selectNode.selectedIndex; // [c3]
    const soggettoId = selectNode.options[selectIndex].value; // [c4]
    if (soggettoId === '') { return; } // [c5]
    const data = `data=${JSON.stringify({ query: 'indirizzi', soggetto: soggetti, id: soggettoId })}`; // [c6]
    reqOnUserAction(data) // [c7]
        .then((res) => { // [c8]
            indirizziHandler(res); // [c9]
        })
        .catch(err => console.log(err)); // [c10]
};

/**
 * Quando si seleziona un cliente/fornitore tra le option dalle select dei clienti o fornitori
 */
const soggettiSelects = document.querySelectorAll('.soggetti');
soggettiSelects.forEach(soggettiSelect => soggettiSelect.addEventListener('change', chooseSoggetto, false));
// </SELECT-Cliente-Fornitore-AltriIndirizzi>


// <SELECT> <Label-Dichiarazione-di-intento> <ID-dicIntenti> <NAME-dicIntenti> <CLS-xhr-intenti>
/* utilizzando la libreria selectr
selectBodyList[5].on('selectr.select', function(option) {
  const result = option_text.match(/[0-9]{1,}\.?[0-9]{1,}\€/);
  if (result != null) {
    return  document.getElementById("residuo").value = +result[0].slice(0, -1);
  }
  document.getElementById("residuo").value = '';
});
*/


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
    if (loaded === undefined) { return; }
    console.log('EVENT change dicIntenti');
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
    console.log('EVENT input cambio');
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
    console.log('EVENT click cambio-link');
    const selectNode = document.querySelector('#valuta');
    const selectIndex = selectNode.selectedIndex;
    if (selectIndex === -1) { return; } // [V1]
    const optionText = selectNode.options[selectIndex].text;
    const valuta = optionText.match(/[A-Z]{3}/)[0];
    if (valuta === 'EUR') { return; } // [V1]

    let cambioValue = event.target.nextElementSibling.value; // [V2]

    const regex = /\./;
    const replaceText = ',';
    cambioValue = cambioValue.replace(regex, replaceText); // [V3]

    // const url = `https://www.xe.com/it/currencyconverter/convert/?Amount=${cambioValue}&From=EUR&To=${valuta}`; // [V4]
    const url = 'https://it.finance.yahoo.com/valute'; // [V4]
    window.open(url); // [V4]
});


/**
 * ogni volta che si sceglie/clicca una valuta tra le varie option
 */
/*
const selectValuta = document.querySelector('#valuta');
selectValuta.addEventListener('change', () => {
    const optionIndex = selectValuta.selectedIndex;
    const valuta = document.getElementById('valuta').options[optionIndex].value;

    if (valuta === 'euro') {
        document.getElementById('cambio').value = 1;
        return;
    }

    const gg = document.getElementById('dtemiss').value;

    reqValuta(valuta, gg)
        .then((data) => {
            const cambio = parseFloat(data.cambio);
            if (cambio > 0) {
                document.getElementById('cambio').value = cambio;
            }

            // if(parseFloat(this.responseText) > 0){
            // var cambio = parseFloat(this.responseText);
            // document.getElementById("cambio").value = cambio;
            // }

        })
        .catch((err => console.log(err)));
});


const mostraCambio = () => {
    const idvaluta = document.getElementById('valuta').selectedIndex;
    let valuta = document.getElementById('valuta').options[idvaluta].value;
    document.getElementById('cambio').removeAttribute('required'); // [!] da capire

    if (valuta !== 'euro') {
        document.getElementById('rigaCambio').hidden = false; // non la uso
        document.getElementById('cambio').setAttribute('required', ''); // [!]
        if (valuta === 'dollaro|sterlina') {}
    } else {
        document.getElementById('rigaCambio').hidden = true;
        document.getElementById('rigaCambio').value = '';
    }
    const valute = document.getElementById('valuta').selectedIndex;
    valuta = document.getElementById('valuta').options[valute].value;
    document.getElementById('cambio').value = valuta;
};
*/
// </SELECT></Label-Valuta></ID-valuta></NAME-valuta></CLS-select-static>


// export { selectAllButtonDelete };


/*
-
```javascript
var things = document.querySelectorAll('button, [type='checkbox'], [type='radio'], select, [href]');

for (var i = 0; i < things.length; i++) {
   things[i].addEventListener('click', function () {
       // STUFF
   });
}
```
*/