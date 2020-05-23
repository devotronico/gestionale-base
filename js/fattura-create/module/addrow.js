import { selectList } from './loader.js'; // eslint-disable-line
import { selectAllButtonDelete } from '../app.js'; // eslint-disable-line
import { setEventToInputsProdotti, setEventToOptionIvaProdotti, setEventToSelectProdAndSEmil } from './dom-handler.js'; // eslint-disable-line


// Crea il Paragrafo e lo appende alla BOX
const addTitleToBox = (box, boxName) => {
    const paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = boxName; // [A]
    box.appendChild(paragrafo);
};

// Copia il campo input ma NON ne copia il valore, e lo appende alla BOX
const addInputToBox = (box, id, newNumProdotto) => {
    const inputNew = document.querySelector(`#${id}0`).cloneNode(false);
    inputNew.setAttribute('name', `${id}${newNumProdotto}`); // [A]
    inputNew.id = `${id}${newNumProdotto}`; // [A]
    inputNew.value = null;
    box.appendChild(inputNew);
};


const addSelectToBox = (index, id, newNumProdotto, multiple) => {
    const data = selectList[index].serialize();
    data.map(d => delete d.selected); // rimuove la option selezionata
    new Selectr(`#${id}${newNumProdotto}`, { data: data, searchable: true, width: 300, multiple: multiple }); // eslint-disable-line
};


/**
 * Da commentare
 * @param {object} newRow - elemento <tr> della tabella
 * @param {string} clsRow - frammento della classe del el. <div>, può essere: 'top' oppure 'bot'
 * @param {number} boxNum - pezzo della classe del el. <div>, è un numero progressivo, parte da '0'
 * @param {string} boxName - nome del label dentro l' el. <div>, es.: Confezione, Semi-lavorato ...
 * @param {string} selectClass - classe del el. <select>, es.: select-xhr-confezioni_b ...
 * @param {number} newNumProdotto - valore numerico per identificare la linea, viene concatenato agli attributi name e id dell elemento <select>, es.: qt1, pzu1
 * @param {number} index - indice numerico per identificare la posizione della <select> nell'array selectList
 * @param {string} id - stringa degli attributi 'name' e 'id' della <select>, es.: qt, pzu
 * @param {boolean} multiple - settato a true consente alla libreria selectr di attivare la selezione multipla delle <option>
 */
const addBoxForSelect = (
    newRow,
    clsRow,
    boxNum, boxName, selectClass, newNumProdotto, index, id, multiple,
) => {
    const td = document.createElement('TD');
    newRow.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    const box = document.createElement('DIV');
    box.classList.add('box', `riga-${clsRow}_box-${boxNum}`);

    // Entra nella condizione solo nel caso si tratta del div/box che
    // contiene le select con label: Confezione e Semi-lavorato
    if (clsRow === 'top' && (boxNum === 0 || boxNum === 1)) {
        box.classList.add('warning');
    }

    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, boxName);

    // Crea una copia della select con tutti i dati
    const newSelect = document.createElement('SELECT');
    if (id === 'ddt') {
        newSelect.setAttribute('name', `${id}${newNumProdotto}[]`);
    } else {
        newSelect.setAttribute('name', `${id}${newNumProdotto}`);
    }
    newSelect.id = `${id}${newNumProdotto}`;
    newSelect.className = selectClass;
    box.appendChild(newSelect);

    addSelectToBox(index, id, newNumProdotto, multiple);
};


const addBoxForInput = (newRow, clsRow, boxNum, boxName, id, newNumProdotto) => {
    const td = document.createElement('TD');
    newRow.appendChild(td);

    // Crea BOX che contiene il paragrafo e l'elemento INPUT
    const box = document.createElement('DIV');
    box.classList.add('box', `riga-${clsRow}_box-${boxNum}`); // [A]

    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    addTitleToBox(box, boxName);

    // Copia il campo input ma NON ne copia il valore, e lo appende alla BOX
    addInputToBox(box, id, newNumProdotto);
};


const addButtonDeleteRow = (newNodeSecondaRiga, clsRow, boxNum) => {
    const td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    const box = document.createElement('DIV');
    box.classList.add('box', `riga-${clsRow}_box-${boxNum}`);
    box.classList.add('box-delete-row');
    td.appendChild(box);

    // crea elemento BUTTON
    const newBtnDelete = document.createElement('A');
    newBtnDelete.classList.add('btn', 'btn-danger');
    newBtnDelete.innerHTML = '&#10006;';
    box.appendChild(newBtnDelete);
};


/**
 * Al click sul bottone con label "Aggiungi Documento +" e con la classe btn-success
 * aggiunge una nuova riga copiando la prima riga della quale:
 * al TD-0 copia la Select e tutto le sue option ma mette di default quella con valore 0 (value="0")
 * al TD-1
 */
document.querySelector('.btn-success').addEventListener('click', () => {


    document.querySelector('.btn-primary').disabled = true;

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
    const newNodePrimaRiga = tableBody.insertRow(-1); // inserisce una nuova riga nel tbody

    newNodePrimaRiga.classList.add('riga', `riga-${classPrimaRiga}`);

    newNodePrimaRiga.setAttribute('prodotto', newNumProdotto); // [X]
    // </RIGA-1>

    // <RIGA-2>
    // Crea la RIGA-2
    const newNodeSecondaRiga = tableBody.insertRow(-1);  // inserisce una nuova riga nel tbody

    newNodeSecondaRiga.classList.add('riga', `riga-${classSecondaRiga}`); // add classe RIGA

    newNodeSecondaRiga.setAttribute('prodotto', newNumProdotto); // [X]
    // </RIGA-2>

    // <RIGA-1>
    // <TD-0> <SELECT> <LABEL-Confezione>
    addBoxForSelect(newNodePrimaRiga, classPrimaRiga, 0, 'Confezione', 'select-xhr-confezioni_b', newNumProdotto, 7, 'prod', false);
    // </TD-0> </SELECT> </LABEL-Confezione>


    // <TD-1> <SELECT> <LABEL-Semi-lavorato>
    addBoxForSelect(newNodePrimaRiga, classPrimaRiga, 1, 'Semi-lavorato', 'select-xhr-semilavorati_b', newNumProdotto, 8, 'semil', false);
    // </TD-1> </SELECT> </LABEL-Semi-lavorato>


    // <TD-2> <INPUT> <LABEL-Quantità>
    addBoxForInput(newNodePrimaRiga, classPrimaRiga, 2, 'Quantità', 'qt', newNumProdotto);
    // </TD-2> </INPUT> </LABEL-Quantità>


    // <TD-3> <INPUT> <LABEL-Pz-Unitario>
    addBoxForInput(newNodePrimaRiga, classPrimaRiga, 3, 'Pz-Unitario', 'pzu', newNumProdotto);
    // </TD-3> </INPUT> </LABEL-Pz-Unitario>


    // <TD-4> <INPUT> <LABEL-Discount>
    // <input type="number" name="disc0" id="disc0" class="table-2_input-number input-discount" required>
    addBoxForInput(newNodePrimaRiga, classPrimaRiga, 4, 'Discount', 'disc', newNumProdotto);
    // </TD-4> </INPUT> </LABEL-Discount>


    // <TD-5> <INPUT> <LABEL-Pz-Totale>
    // <input type="number" name="pzt0" id="pzt0" value="0" class="input-number input-prezzototale" readonly="">
    addBoxForInput(newNodePrimaRiga, classPrimaRiga, 5, 'Pz Totale', 'pzt', newNumProdotto);
    // </TD-5> </INPUT> </LABEL-Pz-Totale>


    // <TD-6> <SELECT> <LABEL-V.A.T.>
    addBoxForSelect(newNodePrimaRiga, classPrimaRiga, 6, 'V.A.T.', 'select-xhr-vat_b select-vat', newNumProdotto, 9, 'aliq', false);
    // </TD-6> </SELECT> </LABEL-V.A.T.>


    // <TD-7> <SELECT> <LABEL-UM>
    addBoxForSelect(newNodePrimaRiga, classPrimaRiga, 7, 'UM', 'select-xhr-unitamisura_b', newNumProdotto, 10, 'um', false);
    // </TD-7> </SELECT> </LABEL-UM>
    // </RIGA-1>


    // <RIGA-2>
    // <TD-0> <INPUT> <LABEL-Totale-Ivato>
    // <input type="number" name="tot0" id="tot0" class="input-number input-totaleivato" readonly="">
    addBoxForInput(newNodeSecondaRiga, classSecondaRiga, 0, 'Totale Ivato', 'tot', newNumProdotto);
    // </TD-0> </INPUT> </LABEL-Totale-Ivato>


    // <TD-1> <INPUT> <LABEL-Gross-Weight>
    // <input type="number" name="gw0" id="gw0" class="input-number input-grossweight">
    addBoxForInput(newNodeSecondaRiga, classSecondaRiga, 1, 'Gross Weight', 'gw', newNumProdotto);
    // </TD-1> </INPUT> </LABEL-Gross-Weight>


    // <TD-2> <INPUT> <LABEL-Net-Weight>
    // <input type="number" name="nw0" id="nw0" class="input-number input-netweight">
    addBoxForInput(newNodeSecondaRiga, classSecondaRiga, 2, 'Net Weight', 'nw', newNumProdotto);
    // </TD-2> </INPUT> </LABEL-Net-Weight>


    // <TD-3> <INPUT> <LABEL-CBM>
    // <input type="number" name="cbm0" id="cbm0" class="input-number input-cbm">
    addBoxForInput(newNodeSecondaRiga, classSecondaRiga, 3, 'CBM', 'cbm', newNumProdotto);
    // </TD-3> </INPUT> </LABEL-CBM>


    // <TD-4> <INPUT> <LABEL-HS-Code>
    // <input type="text" name="tc0" id="tc0" class="input-number input-discount" required>
    addBoxForInput(newNodeSecondaRiga, classSecondaRiga, 4, 'HS-Code', 'tc', newNumProdotto);
    // </TD-4> </INPUT> </LABEL-HS-Code>


    // <TD-5> <TEXTAREA> <LABEL-Note>
    // <textarea rows="2" cols="12" wrap="hard" name="lotti0" id="lotti0" class="textarea-lotti">
    addBoxForInput(newNodeSecondaRiga, classSecondaRiga, 5, 'Note', 'lotti', newNumProdotto);
    // </TD-5> </TEXTAREA> </LABEL-Note>


    // <TD-6> <SELECT> <LABEL-DDT>
    addBoxForSelect(newNodeSecondaRiga, classSecondaRiga, 6, 'DDT', 'select-xhr-ddt_b', newNumProdotto, 11, 'ddt', true);
    // </TD-6> </SELECT> </LABEL-DDT>


    // <TD-7> <BUTTON-DELETE-ROW>
    addButtonDeleteRow(newNodeSecondaRiga, classSecondaRiga, 7);
    // </TD-7> </BUTTON-DELETE-ROW>
    // </RIGA-2>

    setEventToInputsProdotti();
    setEventToOptionIvaProdotti();
    setEventToSelectProdAndSEmil();
    selectAllButtonDelete();
}, false);
