import { selectList } from './loader.js'; // eslint-disable-line
import { selectAllButtonDelete } from '../app.js'; // eslint-disable-line
import { setEventToInputsProdotti, setEventToOptionIvaProdotti } from './dom-handler.js'; // eslint-disable-line


// Crea il Paragrafo e lo appende alla BOX
const addTitleToBox = (box, text) => {
    const paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = text; // [A]
    box.appendChild(paragrafo);
};


/**
 * Al click sul bottone con label "Aggiungi Documento +" e con la classe btn-success
 * aggiunge una nuova riga copiando la prima riga della quale:
 * al TD-0 copia la Select e tutto le sue option ma mette di default quella con valore 0 (value="0")
 * al TD-1
 */
document.querySelector('.btn-success').addEventListener('click', () => {
    const tableBody = document.querySelector('.tbody-bot'); // seleziona il tbody

    // [X] ogni riga (TR) ha un numero univoco crescente assegnato all'attributo prodotto:
    const newNumProdotto = parseFloat(tableBody.lastElementChild.getAttribute('prodotto')) + 1;

    // prodotto: 0
    // riga: top
    // riga: bot
    // ---
    // prodotto: 1
    // riga: top
    // riga: bot
    // ---

    const classPrimaRiga = 'top';
    const classSecondaRiga = 'bot';

    // <RIGA-1>
    // Crea la RIGA-1
    const newNodePrimaRiga = tableBody.insertRow(-1);  // inserisce una nuova riga nel tbody
    // let classColor;
    // if ( (newNumProdotto % 2) === 0 ) {  classColor = 'bg-color-4'; }
    // else { classColor = 'bg-color-5' }
    // newNodePrimaRiga.classList.add("riga", 'riga-'+classPrimaRiga, classColor);
    newNodePrimaRiga.classList.add('riga', `riga-${classPrimaRiga}`);

    newNodePrimaRiga.setAttribute('prodotto', newNumProdotto); // [X]
    // </RIGA-1>


    // <RIGA-2>
    // Crea la RIGA-2
    const newNodeSecondaRiga = tableBody.insertRow(-1);  // inserisce una nuova riga nel tbody

    // if ( (newNumProdotto % 2) === 0 ) {  classColor = 'bg-color-5'; } else { 'bg-color-4' }
    // newNodeSecondaRiga.classList.add('riga', 'riga-'+classSecondaRiga, classColor);
    newNodeSecondaRiga.classList.add('riga', `riga-${classSecondaRiga}`); // add classe RIGA

    newNodeSecondaRiga.setAttribute('prodotto', newNumProdotto); // [X]
    // </RIGA-2>


    let td;
    let box;
    let inputToClone;
    let input;
    let newSelect;
    let inst;

    // [A] per ogni td cambiare..
    // [B] controllare quali classi passare

    // <RIGA-1>
    // <TD-0> <SELECT> <LABEL-Confezione>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-0`);
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'txt-color-1', 'Confezione');

    // Crea una copia della select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `prod${newNumProdotto}`); // [A]
    newSelect.id = `prod${newNumProdotto}`; // [A]
    box.appendChild(newSelect);
    inst = new Selectr(`#prod${newNumProdotto}`, { searchable: true, width: 300 }); // [A]
    inst.add(selectList[7].serialize()); // [A]
    // </TD-0> </SELECT> </LABEL-Confezione>


    // <TD-1> <SELECT> <LABEL-Semi-lavorato>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-1`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Semi-lavorato');


    // Crea una copia della select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `semil${newNumProdotto}`); // [A]
    newSelect.id = `semil${newNumProdotto}`; // [A]
    box.appendChild(newSelect);
    inst = new Selectr(`#semil${newNumProdotto}`, { searchable: true, width: 300 }); // [A]
    inst.add(selectList[8].serialize()); // [A]
    // </TD-1> </SELECT> </LABEL-Semi-lavorato>


    // <TD-2> <INPUT> <LABEL-Quantità>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-2`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Quantità');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#qt0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `qt${newNumProdotto}`); // [A]
    input.id = `qt${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-2> </INPUT> </LABEL-Quantità>


    // <TD-3> <INPUT> <LABEL-Pz-Unitario>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-3`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Pz-Unitario');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#pzu0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `pzu${newNumProdotto}`); // [A]
    input.id = `pzu${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-3> </INPUT> </LABEL-Pz-Unitario>


    // <TD-4> <INPUT> <LABEL-Discount>
    // <input type="number" name="disc0" id="disc0" value="0" class="input-number input-discount" required=""></input>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-4`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Discount');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#disc0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `disc${newNumProdotto}`); // [A]
    input.id = `disc${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-4> </INPUT> </LABEL-Discount>


    // <TD-5> <INPUT> <LABEL-Pz-Totale>
    // <input type="number" name="pzt0" id="pzt0" value="0" class="input-number input-prezzototale" readonly="">
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-5`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Pz Totale');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#pzt0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `pzt${newNumProdotto}`); // [A]
    input.id = `pzt${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-5> </INPUT> </LABEL-Pz-Totale>


    // <TD-6> <SELECT> <LABEL-V.A.T.>
    // <select name="aliq0" id="aliq0" class="select-10 select-xhr-vat_b">
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-6`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'V.A.T.');


    // Crea una copia della select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `aliq${newNumProdotto}`); // [A]
    newSelect.id = `aliq${newNumProdotto}`; // [A]
    newSelect.classList.add('select-xhr-vat_b', 'select-vat');
    box.appendChild(newSelect);
    inst = new Selectr(`#aliq${newNumProdotto}`, { searchable: true, width: 300 }); // [A]
    inst.add(selectList[9].serialize()); // [A]
    // </TD-6> </SELECT> </LABEL-V.A.T.>


    // <TD-7> <SELECT> <LABEL-UM>
    // <select name="um0" id="um0" class="select-11 select-xhr-unitamisura_b">
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-7`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'UM');


    // Crea una copia della select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `um${newNumProdotto}`); // [A]
    newSelect.id = `um${newNumProdotto}`; // [A]
    box.appendChild(newSelect);
    inst = new Selectr(`#um${newNumProdotto}`, { searchable: true, width: 300 }); // eslint-disable-line
    inst.add(selectList[10].serialize()); // [A]
    // </TD-7> </SELECT> </LABEL-UM>
    // </RIGA-1>


    // <RIGA-2>
    // <TD-0> <INPUT> <LABEL-Totale-Ivato>
    // <input type="number" name="tot0" id="tot0" class="input-number input-totaleivato" readonly="">
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-0`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Totale Ivato');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#tot0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `tot${newNumProdotto}`); // [A]
    input.id = `tot${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-0> </INPUT> </LABEL-Totale-Ivato>


    // <TD-1> <INPUT> <LABEL-Gross-Weight>
    // <input type="number" name="gw0" id="gw0" class="input-number input-grossweight">
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-1`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Gross Weight');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#gw0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `gw${newNumProdotto}`); // [A]
    input.id = `gw${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-1> </INPUT> </LABEL-Gross-Weight>


    // <TD-2> <INPUT> <LABEL-Net-Weight>
    // <input type="number" name="nw0" id="nw0" class="input-number input-netweight">
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-2`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Net Weight');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#nw0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `nw${newNumProdotto}`); // [A]
    input.id = `nw${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-2> </INPUT> </LABEL-Net-Weight>


    // <TD-3> <INPUT> <LABEL-CBM>
    // <input type="number" name="cbm0" id="cbm0" class="input-number input-cbm">
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-3`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'CBM');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#cbm0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `cbm${newNumProdotto}`); // [A]
    input.id = `cbm${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-3> </INPUT> </LABEL-CBM>


    // <TD-4> <INPUT> <LABEL-HS-Code>
    // <input type="text" name="tc0" id="tc0" class="input-number input-discount" required>
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-4`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'HS-Code');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#tc0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `tc${newNumProdotto}`); // [A]
    input.id = `tc${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-4> </INPUT> </LABEL-HS-Code>


    // <TD-5> <TEXTAREA> <LABEL-Note>
    // <textarea rows="2" cols="12" wrap="hard" name="lotti0" id="lotti0" class="textarea-lotti">
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-5`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'Note');


    // Copia input e lo appende alla BOX
    inputToClone = document.querySelector('#lotti0'); // [A]
    input = inputToClone.cloneNode(true);
    input.setAttribute('name', `lotti${newNumProdotto}`); // [A]
    input.id = `lotti${newNumProdotto}`; // [A]
    box.appendChild(input);
    // </TD-5> </TEXTAREA> </LABEL-Note>


    // <TD-6> <SELECT> <LABEL-DDT>
    // <select name="ddt0[]" id="ddt0" class="select-4 select-xhr-ddt_b">
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-6`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, 'DDT');


    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `ddt${newNumProdotto}[]`); // [A]
    newSelect.id = `ddt${newNumProdotto}`; // [A]
    box.appendChild(newSelect);
    new Selectr(`#ddt${newNumProdotto}`, { data: selectList[11].serialize(), searchable: true, width: 300, multiple: true }); // eslint-disable-line
    // </TD-6> </SELECT> </LABEL-DDT>


    // <TD-7> <EMPTY> <LABEL-Vuoto>
    // <input type="text" name="tc0" id="tc0" class="input-number input-discount" required>
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-7`); // [A] riga-1_box-7
    box.classList.add('box-delete-row'); // [A] riga-1_box-7
    td.appendChild(box);


    // crea elemento BUTTON
    const newBtnDelete = document.createElement('A');
    newBtnDelete.classList.add('btn', 'btn-danger');
    newBtnDelete.innerHTML = '&#10006;';
    box.appendChild(newBtnDelete);

    /*
    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Vuoto'; // [A]
    box.appendChild(paragrafo);
    */
    // </TD-7> </EMPTY> </LABEL-Vuoto>
    // </RIGA-2>

    setEventToInputsProdotti();
    setEventToOptionIvaProdotti();
    selectAllButtonDelete();
}, false);
