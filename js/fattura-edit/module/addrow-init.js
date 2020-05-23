/**
 * aggiunge una nuova riga copiando la prima riga della quale:
 * al TD-0 copia la Select e tutto le sue option ma mette di default quella con valore 0 (value="0")
 * al TD-1
 * [X] ogni riga (TR) ha un numero univoco crescente assegnato all'attributo prodotto:
 */

// selectRowList =
// [
//     {
//         aliq: class,
//         ddt: class,
//         prod: class,
//         semil: class,
//         um: class,
//     },
//     {
//         aliq: class,
//         ddt: class,
//         prod: class,
//         semil: class,
//         um: class,
//         },
//         ...
// ]
let selectRowList = []; // eslint-disable-line


const createRowOnInit = (numProduct, val) => {
    const obj = {};

    const tableBody = document.querySelector('.tbody-bot'); // seleziona il tbody

    const classPrimaRiga = 'top';
    const classSecondaRiga = 'bot';

    // <RIGA-1>
    // Crea la RIGA-1
    const newNodePrimaRiga = tableBody.insertRow(-1); // inserisce una nuova riga nel tbody
    newNodePrimaRiga.classList.add('riga', `riga-${classPrimaRiga}`);
    newNodePrimaRiga.setAttribute('prodotto', numProduct); // [X]
    // </RIGA-1>


    // <RIGA-2>
    // Crea la RIGA-2
    const newNodeSecondaRiga = tableBody.insertRow(-1); // inserisce una nuova riga nel tbody
    newNodeSecondaRiga.classList.add('riga', `riga-${classSecondaRiga}`); // add classe RIGA
    newNodeSecondaRiga.setAttribute('prodotto', numProduct); // [X]
    // </RIGA-2>

    let td;
    let box;
    let paragrafo;
    let option;
    let input;
    let select;
    let inst;

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
    paragrafo.innerText = 'Confezione';
    box.appendChild(paragrafo);

    // Crea una select e la appende alla BOX
    select = document.createElement('SELECT');
    select.setAttribute('name', `prod${numProduct}`); // [A]
    select.id = `prod${numProduct}`; // [A]
    select.classList.add('select-xhr-confezioni');
    box.appendChild(select);
    inst = new Selectr(`#prod${numProduct}`, { searchable: true, width: 300 }); // eslint-disable-line
    // inst.add([{value: '1', text: 'testo di prova'}]); // [A]
    // inst.add({ value: '1', text: val.prodotto }); // [A]
    obj.prod = inst;


    // Crea una option e l'append alla select
    option = document.createElement('OPTION');
    option.value = 0;
    option.innerHTML = 'Seleziona Questo Campo';
    select.appendChild(option);
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
    select = document.createElement('SELECT');
    select.setAttribute('name', `semil${numProduct}`); // [A]
    select.id = `semil${numProduct}`; // [A]
    select.classList.add('select-xhr-semilavorati');
    box.appendChild(select);

    // Crea una option e l'append alla select
    option = document.createElement('OPTION');
    option.value = 0;
    option.innerHTML = 'Seleziona Questo Campo';
    select.appendChild(option);

    inst = new Selectr(`#semil${numProduct}`, { searchable: true, width: 300 }); // eslint-disable-line
    obj.semil = inst;
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
    paragrafo.innerText = 'Quantità';
    box.appendChild(paragrafo);

    // Crea input e lo appende alla BOX
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `qt${numProduct}`);
    input.setAttribute('step', '0.001');
    input.classList.add('table-2_input-number', 'input-quantita');
    input.id = `qt${numProduct}`;
    input.required = true;
    input.value = val.qt;
    box.appendChild(input);
    // </TD-2> </INPUT> </LABEL-Quantità>


    // <TD-3> <INPUT> <LABEL-Pz-Unitario>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-3`);
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'Pz-Unitario';
    box.appendChild(paragrafo);

    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('step', 'any');
    input.setAttribute('name', `pzu${numProduct}`);
    input.classList.add('table-2_input-number', 'input-prezzounitario');
    input.id = `pzu${numProduct}`;
    input.required = true;
    input.value = val.pzu;
    box.appendChild(input);
    // </TD-3> </INPUT> </LABEL-Pz-Unitario>


    // <TD-4> <INPUT> <LABEL-Discount>
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
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `disc${numProduct}`);
    input.classList.add('table-2_input-number', 'input-discount');
    input.id = `disc${numProduct}`;
    input.required = true;
    input.value = val.discount;
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
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('step', 'any');
    input.setAttribute('name', `pzt${numProduct}`);
    input.classList.add('table-2_input-number', 'input-prezzototale');
    input.id = `pzt${numProduct}`;
    // input.readonly = true;
    input.value = val.pzt;
    box.appendChild(input);
    // </TD-5> </INPUT> </LABEL-Pz-Totale>


    // <TD-6> <SELECT> <LABEL-V.A.T.>
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

    // Crea una copia della select con tutti i dati
    select = document.createElement('SELECT');
    select.setAttribute('name', `aliq${numProduct}`);
    select.id = `aliq${numProduct}`; // [A]
    select.classList.add('select-xhr-vat', 'select-vat');
    box.appendChild(select);

    // Crea una option e l'append alla select
    option = document.createElement('OPTION');
    option.value = 0;
    option.innerHTML = 'Seleziona Questo Campo';
    select.appendChild(option);

    inst = new Selectr(`#aliq${numProduct}`, { searchable: true, width: 300 }); // eslint-disable-line
    obj.aliq = inst;
    // </TD-6> </SELECT> </LABEL-V.A.T.>


    // <TD-7> <SELECT> <LABEL-UM>
    td = document.createElement('TD');
    newNodePrimaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classPrimaRiga}_box-7`);
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'UM'; // [A]
    box.appendChild(paragrafo);

    // Crea una copia della select
    select = document.createElement('SELECT');
    select.setAttribute('name', `um${numProduct}`); // [A]
    select.id = `um${numProduct}`; // [A]
    select.classList.add('select-xhr-unitamisura');
    box.appendChild(select);

    // Crea una option e l'append alla select
    option = document.createElement('OPTION');
    option.value = 0;
    option.innerHTML = 'Seleziona Questo Campo';
    select.appendChild(option);

    inst = new Selectr(`#um${numProduct}`, { searchable: true, width: 300 }); // eslint-disable-line
    obj.um = inst;
    // </TD-7> </SELECT> </LABEL-UM>
    // </RIGA-1>


    // <RIGA-2>
    // <TD-0> <INPUT> <LABEL-Totale-Ivato>
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
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('step', 'any');
    input.setAttribute('name', `tot${numProduct}`);
    input.classList.add('table-2_input-number', 'input-totaleivato');
    input.id = `tot${numProduct}`;
    input.readonly = true;
    input.value = val.tot;
    box.appendChild(input);
    // </TD-0> </INPUT> </LABEL-Totale-Ivato>


    // <TD-1> <INPUT> <LABEL-Gross-Weight>
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

    // Crea input e lo appende alla BOX
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `gw${numProduct}`); // [A]
    input.classList.add('table-2_input-number', 'input-grossweight');
    input.id = `gw${numProduct}`;
    input.value = val.gw;
    box.appendChild(input);
    // </TD-1> </INPUT> </LABEL-Gross-Weight>


    // <TD-2> <INPUT> <LABEL-Net-Weight>
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

    // Crea input e lo appende alla BOX
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `nw${numProduct}`);
    input.classList.add('table-2_input-number', 'input-netweight');
    input.id = `nw${numProduct}`;
    input.value = val.nw;
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
    input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', `cbm${numProduct}`);
    input.classList.add('table-2_input-number', 'input-cbm');
    input.id = `cbm${numProduct}`;
    input.value = val.cbm;
    box.appendChild(input);
    // </TD-3> </INPUT> </LABEL-CBM>


    // <TD-4> <INPUT> <LABEL-HS-Code>
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il paragrafo e la Select
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-4`);
    td.appendChild(box);

    // Crea il Paragrafo e lo appende alla BOX
    paragrafo = document.createElement('P');
    paragrafo.classList.add('txt-color-1');
    paragrafo.innerText = 'HS-Code';
    box.appendChild(paragrafo);

    // Crea input e lo appende alla BOX
    input = document.createElement('INPUT');
    input.setAttribute('type', 'text');
    input.setAttribute('name', `tc${numProduct}`);
    input.classList.add('table-2_input-text', 'input-discount');
    input.id = `tc${numProduct}`;
    input.value = val.taricCode;
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
    input = document.createElement('TEXTAREA');
    input.setAttribute('rows', 2);
    input.setAttribute('cols', 12);
    input.setAttribute('wrap', 'hard');
    input.setAttribute('name', `lotti${numProduct}`);
    input.id = `lotti${numProduct}`;
    input.value = val.lotti;
    input.classList.add('table-2_textarea', 'textarea-lotti');
    box.appendChild(input);
    // </TD-5> </TEXTAREA> </LABEL-Note>


    // <TD-6> <SELECT> <LABEL-DDT>
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

    select = document.createElement('SELECT');
    select.setAttribute('name', `ddt${numProduct}[]`); // [A]
    select.id = `ddt${numProduct}`; // [A]
    select.classList.add('select-xhr-ddt');
    box.appendChild(select);

    // Crea una option e l'append alla select
    option = document.createElement('OPTION');
    option.value = 0;
    option.innerHTML = 'Seleziona Questo Campo';
    select.appendChild(option);

    inst = new Selectr(`#ddt${numProduct}`, { searchable: true, width: 300, multiple: true }); // eslint-disable-line
    obj.ddt = inst;
    // </TD-6> </SELECT> </LABEL-DDT>


    // <TD-7> <EMPTY> <LABEL-Vuoto>
    td = document.createElement('TD');
    newNodeSecondaRiga.appendChild(td);

    // Crea BOX che contiene il bottone delete
    box = document.createElement('DIV');
    box.classList.add('box', `riga-${classSecondaRiga}_box-7`); // [A] riga-1_box-7
    box.classList.add('box-delete-row'); // [A] riga-1_box-7
    td.appendChild(box);

    // crea elemento BUTTON
    const newBtnDelete = document.createElement('A');
    newBtnDelete.classList.add('btn', 'btn-danger', 'btn-3d');
    newBtnDelete.innerHTML = '&#10006;';
    box.appendChild(newBtnDelete);

    selectRowList.push(obj);

    // setEventToInputsProdotti();
    // setEventToOptionIvaProdotti();
    // selectAllButtonDelete();
};

export { createRowOnInit, selectRowList }