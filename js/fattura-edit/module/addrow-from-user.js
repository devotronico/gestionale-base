import { loaded } from './loader.js';
import { setEventToInputsProdotti, setEventToOptionIvaProdotti, selectAllButtonDelete } from './dom-handler.js';
import { reqOnUserAction } from './req-on-user-action.js';
/**
 * Al click sul bottone con label "Aggiungi Documento +" e con la classe btn-success
 * aggiunge una nuova riga con dati
 * * [z] IMPORTANTE controllare se il campo con id ddt deve essere un array
 * // TODO: scrollare in fondo alla pagina https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
 */
document.querySelector('.btn-success').addEventListener('click', () => {
    if (loaded === undefined) { return; }
    console.log('addrow EVENT click btn-success');
    const tableBody = document.querySelector('.tbody-bot'); // seleziona il tbody

    // [X] ogni riga (TR) ha un numero univoco crescente assegnato all'attributo prodotto:
    const newNumProdotto = parseFloat(tableBody.lastElementChild.getAttribute('prodotto')) + 1;

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
    const newNodeSecondaRiga = tableBody.insertRow(-1); // inserisce una nuova riga nel tbody
    newNodeSecondaRiga.classList.add('riga', `riga-${classSecondaRiga}`); // add classe RIGA
    newNodeSecondaRiga.setAttribute('prodotto', newNumProdotto); // [X]
    // </RIGA-2>

    let td;
    let box;
    let paragrafo;
    let input;
    let newSelect;
    let data;

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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Confezione'; // [A]
    box.appendChild(paragrafo);

    // Crea una copia della select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `prod${newNumProdotto}`); // [A]
    newSelect.id = `prod${newNumProdotto}`; // [A]
    box.appendChild(newSelect);

    data = `data=${JSON.stringify({ query: 'confezioni' })}`;
    reqOnUserAction(data)
        .then((res) => {
            res.unshift({ value: 0, text: 'Seleziona questo campo' });
            new Selectr(`#prod${newNumProdotto}`, { data: res, searchable: true, width: 300 });
        })
        .catch((err) => {
            console.log(err);
        });
    // inst.add(selectBodyList[7].serialize()); // [A]
    // </TD-0> </SELECT> </LABEL-Confezione>


    // <TD-1> <SELECT> <LABEL-Semi-lavorato>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-1`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Semi-lavorato'; // [A]
    box.appendChild(paragrafo);


    // Crea una copia della select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `semil${newNumProdotto}`); // [A]
    newSelect.id = `semil${newNumProdotto}`; // [A]
    box.appendChild(newSelect);
    // inst = new Selectr(`#semil${newNumProdotto}`, { searchable: true, width: 300 }); // [A]
    data = `data=${JSON.stringify({ query: 'semilavorati' })}`;
    reqOnUserAction(data)
        .then((res) => {
            res.unshift({ value: 0, text: 'Seleziona questo campo' });
            new Selectr(`#semil${newNumProdotto}`, { data: res, searchable: true, width: 300 });
        })
        .catch((err) => {
            console.log(err);
        });
    // </TD-1> </SELECT> </LABEL-Semi-lavorato>

    // <TD-2> <INPUT> <LABEL-Quantità>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-2`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Quantità'; // [A]
    box.appendChild(paragrafo);


    // Crea input e lo appende alla BOX
    // inputToClone = document.querySelector('#qt0'); // [A]
    // input = inputToClone.cloneNode(true);


    // <p class="txt-color-1">Quantità</p>
    // <input class="table-2_input-number input-quantita" required></input>

    input = document.createElement('INPUT');
    input.setAttribute('type', 'number'); // [A]
    input.setAttribute('name', `qt${newNumProdotto}`); // [A]
    input.setAttribute('step', '0.001'); // [A]
    input.id = `qt${newNumProdotto}`; // [A]
    input.classList.add('table-2_input-number', 'input-quantita');
    input.required = true;
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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Pz-Unitario'; // [A]
    box.appendChild(paragrafo);


    // Crea input e lo appende alla BOX
    // inputToClone = document.querySelector('#pzu0'); // [A]
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `pzu${newNumProdotto}`);
    input.id = `pzu${newNumProdotto}`;
    input.classList.add('table-2_input-number', 'input-prezzounitario');
    input.required = true;

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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Discount'; // [A]
    box.appendChild(paragrafo);


    // Crea input e lo appende alla BOX
    // inputToClone = document.querySelector('#disc0'); // [A]
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `disc${newNumProdotto}`);
    input.id = `disc${newNumProdotto}`;
    input.classList.add('table-2_input-number', 'input-discount');
    input.value = 0;
    input.required = true;
    box.appendChild(input);
    // </TD-4> </INPUT> </LABEL-Discount>


    // <TD-5> <INPUT> <LABEL-Pz-Totale>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-5`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Pz Totale'; // [A]
    box.appendChild(paragrafo);


    // Crea input e lo appende alla BOX
    // inputToClone = document.querySelector('#pzt0');
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `pzt${newNumProdotto}`);
    input.id = `pzt${newNumProdotto}`;
    input.classList.add('table-2_input-number', 'input-prezzototale');
    input.value = 0;
    input.required = true;
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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'V.A.T.'; // [A]
    box.appendChild(paragrafo);

    // Crea una select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `aliq${newNumProdotto}`); // [A]
    newSelect.id = `aliq${newNumProdotto}`; // [A]
    newSelect.classList.add('select-xhr-vat', 'select-vat');
    box.appendChild(newSelect);
    // inst = new Selectr(`#aliq${newNumProdotto}`, { searchable: true, width: 300 }); // [A]
    data = `data=${JSON.stringify({ query: 'vat' })}`;
    reqOnUserAction(data)
        .then((res) => {
            res.unshift({ value: 0, text: 'Seleziona questo campo' });
            new Selectr(`#aliq${newNumProdotto}`, { data: res, searchable: true, width: 300 });
        })
        .catch((err) => {
            console.log(err);
        });
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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'UM'; // [A]
    box.appendChild(paragrafo);


    // Crea una copia della select con tutti i dati
    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `um${newNumProdotto}`); // [A]
    newSelect.id = `um${newNumProdotto}`; // [A]
    box.appendChild(newSelect);
    // inst = new Selectr(`#um${newNumProdotto}`, { searchable: true, width: 300 }); // [A]
    // inst.add(selectBodyList[10].serialize()); // [A]
    data = `data=${JSON.stringify({ query: 'unitamisura' })}`;
    reqOnUserAction(data)
        .then((res) => {
            res.unshift({ value: 0, text: 'Seleziona questo campo' });
            new Selectr(`#um${newNumProdotto}`, { data: res, searchable: true, width: 300 });
        })
        .catch((err) => {
            console.log(err);
        });
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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Totale Ivato'; // [A]
    box.appendChild(paragrafo);


    // Crea input e lo appende alla BOX
    // inputToClone = document.querySelector('#tot0'); // [A]
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `tot${newNumProdotto}`);
    input.id = `tot${newNumProdotto}`; // [A]
    input.classList.add('table-2_input-number', 'input-totaleivato');
    input.readonly = true;
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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Gross Weight'; // [A]
    box.appendChild(paragrafo);


    // Copia input e lo appende alla BOX
    // inputToClone = document.querySelector('#gw0'); // [A]
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `gw${newNumProdotto}`); // [A]
    input.id = `gw${newNumProdotto}`; // [A]
    input.classList.add('table-2_input-number', 'input-grossweight');
    input.readonly = true;
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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Net Weight'; // [A]
    box.appendChild(paragrafo);


    // Copia input e lo appende alla BOX
    // inputToClone = document.querySelector('#nw0');
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `nw${newNumProdotto}`);
    input.id = `nw${newNumProdotto}`;
    input.classList.add('table-2_input-number', 'input-netweight');
    box.appendChild(input);
    // </TD-2> </INPUT> </LABEL-Net-Weight>


    // <TD-3> <INPUT> <LABEL-CBM>
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-3`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'CBM'; // [A]
    box.appendChild(paragrafo);


    // Crea input e lo appende alla BOX
    // inputToClone = document.querySelector('#cbm0');
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `cbm${newNumProdotto}`);
    input.id = `cbm${newNumProdotto}`;
    input.classList.add('table-2_input-number', 'input-cbm');
    box.appendChild(input);
    // </TD-3> </INPUT> </LABEL-CBM>


    // <TD-4> <INPUT> <LABEL-HS-Code>
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-4`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'HS-Code'; // [A]
    box.appendChild(paragrafo);


    // Crea input e lo appende alla BOX
    // inputToClone = document.querySelector('#tc0'); // [A]
    // input = inputToClone.cloneNode(true);
    input = document.createElement('INPUT');
    input.setAttribute('type', 'text');
    input.setAttribute('name', `tc${newNumProdotto}`);
    input.id = `tc${newNumProdotto}`;
    input.classList.add('table-2_input-text', 'input-hscode');
    box.appendChild(input);
    // </TD-4> </INPUT> </LABEL-HS-Code>


    // <TD-5> <TEXTAREA> <LABEL-Note>
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-5`); // [A]
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Note'; // [A]
    box.appendChild(paragrafo);


    // Crea textarea e lo appende alla BOX
    // inputToClone = document.querySelector('#lotti0');
    // input = inputToClone.cloneNode(true);
    input = document.createElement('TEXTAREA');
    input.setAttribute('rows', 2);
    input.setAttribute('cols', 12);
    input.setAttribute('wrap', 'hard');
    input.setAttribute('name', `lotti${newNumProdotto}`);
    input.id = `lotti${newNumProdotto}`;
    input.classList.add('table-2_textarea', 'textarea-lotti');
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
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'DDT'; // [A]
    box.appendChild(paragrafo);


    newSelect = document.createElement('SELECT');
    newSelect.setAttribute('name', `ddt${newNumProdotto}[]`); // 
   // newSelect.setAttribute('name', `ddt${newNumProdotto}[]`); // [z]

    newSelect.id = `ddt${newNumProdotto}`; // [A]
    box.appendChild(newSelect);
    // inst = new Selectr(`#ddt${newNumProdotto}`, { searchable: true, width: 300 }); // [A]
    // inst.add(selectBodyList[11].serialize()); // [A]
    data = `data=${JSON.stringify({ query: 'ddt' })}`;
    reqOnUserAction(data)
        .then((res) => {
            res.unshift({ value: 0, text: 'Seleziona questo campo' });
            new Selectr(`#ddt${newNumProdotto}`, { data: res, searchable: true, width: 300, multiple: true });
        })
        .catch((err) => {
            console.log(err);
        });
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
    // </TD-7> </EMPTY> </LABEL-Vuoto>
    // </RIGA-2>


    setEventToInputsProdotti();
    setEventToOptionIvaProdotti();
    selectAllButtonDelete();
}, false);
