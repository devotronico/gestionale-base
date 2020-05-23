import { createRowOnInit, selectRowList } from './addrow-init.js';  // eslint-disable-line
import { getDataInit } from './req-init.js';  // eslint-disable-line
import { getData } from './req-data.js';  // eslint-disable-line
import { showPageAfterloading, setEventToInputsProdotti, setEventToOptionIvaProdotti, selectAllButtonDelete } from './dom-handler.js';  // eslint-disable-line

console.time('tempo');
const urlString = window.location.href;
const url = new URL(urlString);
const idDocumento = url.searchParams.has('id') ? url.searchParams.get('id') : '0';
// idDocumento = 105;

document.querySelector('#idFattura').value = idDocumento;

let objCampi = {};

let loaded;
let soggettoPrimario; // soggetto al quale è stata fatta la fattura
let soggettoSecondario; // soggetto che non ha ricevuto la fattura
let soggettoId;

const selectBodyList = {
    ordine: new Selectr('.select-xhr-ordine', { data: { value: 0, text: 'Seleziona un DDT' }, searchable: true, width: 900, multiple: true }), // searchable: true, width: 300, multiple: true
    clienti: new Selectr('.select-xhr-clienti', { searchable: true, width: 300, defaultSelected: true }),
    fornitori: new Selectr('.select-xhr-fornitori', { searchable: true, width: 300, defaultSelected: true }),
    indirizzo: new Selectr('.select-xhr-altriindirizzi', { searchable: true, width: 300, defaultSelected: true }),
    valuta: new Selectr('.select-xhr-valuta', { searchable: true, width: 300, defaultSelected: true }),
    pagamento: new Selectr('.select-xhr-pagamento', { searchable: true, width: 300, defaultSelected: true }),
    fondo: new Selectr('.select-xhr-fondo', { searchable: true, width: 300, defaultSelected: true }),
    intenti: new Selectr('.select-xhr-intenti', { searchable: true, width: 300, defaultSelected: true }),
};


// QUERY SU TABELLA `ftout`
const dataQuery = `data=${JSON.stringify({ query: 'ftout', filter: idDocumento })}`;
getDataInit(dataQuery)
    .then((res) => {
        objCampi = res;
        document.querySelector('#input-protocollo').value = objCampi.codice;
        document.querySelector('#dtemiss').value = objCampi.dataEmissione;
        document.querySelector('#incoterms').value = objCampi.incoterms;
        document.querySelector('#grwTOT').value = objCampi.gw;
        document.querySelector('#ntwTOT').value = objCampi.nw;
        document.querySelector('#volTOT').value = objCampi.cbm;
        if (objCampi.dataScadenza === '0000-00-00') {
            document.querySelector('#dtsca').value = '';
        } else {
            document.querySelector('#dtsca').value = objCampi.dataScadenza;
        }

        document.querySelector('#note').value = objCampi.note;
        document.querySelector('#imponibile').value = objCampi.imponibile;
        document.querySelector('#iva').value = objCampi.importoIva;
        document.querySelector('#ivato').value = objCampi.totaleFattura;
        document.querySelector('#imponibile-euro').value = Number.parseInt(objCampi.imponibileEuro, 10).toFixed(2);

        const data = `data=${JSON.stringify({ query: 'ordine', filter: objCampi.ordine })}`;
        return getData(data, 'body');
    })
    .then((res) => {  // eslint-disable-line
        // popola html select ORDINE
        selectBodyList.ordine.add(res);


        // prepara query SOGGETTO Cliente/Fornitore
        // se la fattura è stata fatta a un cliente
        if (objCampi.cliente > 0) {
            soggettoId = objCampi.cliente;
            soggettoPrimario = 'clienti';
            selectBodyList.clienti.enable(); // test
            selectBodyList.fornitori.disable(); // test
            // document.querySelector('.box-fornitori').style.display = 'none';
        } else { // se la fattura è stata fatta a un fornitore
            soggettoId = objCampi.fornitore;
            soggettoPrimario = 'fornitori';
            selectBodyList.clienti.disable(); // test
            selectBodyList.fornitori.enable(); // test
            // document.querySelector('.box-clienti').style.display = 'none';
        }

        const data = `data=${JSON.stringify({ query: soggettoPrimario, filter: soggettoId })}`;
        return getData(data, 'body');
    })
    .then((res) => {
        if (soggettoPrimario === 'clienti') {
            selectBodyList.clienti.add(res);
            soggettoSecondario = 'fornitori';
        } else {
            selectBodyList.fornitori.add(res);
            soggettoSecondario = 'clienti';
        }

        const data = `data=${JSON.stringify({ query: soggettoSecondario, filter: 0 })}`;
        return getData(data, 'body');
    })
    .then((res) => {
        if (soggettoSecondario === 'clienti') {
            selectBodyList.clienti.add(res);
        } else {
            selectBodyList.fornitori.add(res);
        }

        // prepara query INDIRIZZI
        const data = `data=${JSON.stringify({ query: 'indirizzi', soggetto: soggettoPrimario, filter: soggettoId })}`;
        return getData(data, 'body');
    })
    .then((res) => {
        // popola html select INDIRIZZI
        /**
         * [i1] unshift inserisce il valore dell'indirizzo presente nella fattura
         * come option gia selezionata nella select
         */
        res.unshift({ value: objCampi.indirizzo, text: objCampi.indirizzo, selected: true });
        selectBodyList.indirizzo.add(res);

        // prepara query VALUTA
        const data = `data=${JSON.stringify({ query: 'valuta', filter: objCampi.valuta })}`;
        return getData(data, 'body');
    })
    .then((res) => {
        // valuta - inizializza la select
        selectBodyList.valuta.add(res);

        const data = `data=${JSON.stringify({ query: 'pagamento', filter: objCampi.pagamento })}`;
        return getData(data, 'body');
    })
    .then((res) => {
        // pagamento - inizializza la select
        selectBodyList.pagamento.add(res);

        const data = `data=${JSON.stringify({ query: 'fondo', filter: objCampi.fondo })}`;
        return getData(data, 'body');
    })
    .then((res) => {
        // fondo - inizializza la select
        selectBodyList.fondo.add(res);

        const data = `data=${JSON.stringify({ query: 'intenti', filter: objCampi.dicIntenti })}`;
        return getData(data, 'body');
    })
    .then((res) => {
        // intenti - inizializza la select
        selectBodyList.intenti.add(res);
        showPageAfterloading();

        // QUERY SU TABELLA `ftout_row`
        const data = `data=${JSON.stringify({ query: 'ftout_row', filter: idDocumento })}`;
        return getDataInit(data);
    })
    .then((res) => {
        let promises = []; // eslint-disable-line

        for (let i = 0; i < res.length; i++) {
            createRowOnInit(i, res[i]);
            promises.push(getData(`data=${JSON.stringify({
                filterProdotto: res[i].prodotto,
                filterImballaggio: res[i].imballaggio,
                filterVat: res[i].vat,
                filterUm: res[i].um,
                filterDdt: res[i].ddt,
            })}`, 'rows'));
        }
        return Promise.all(promises);
    })
    .then((res) => {
        for (let i = 0; i < res.length; i++) {
            selectRowList[i].prod.add(res[i].confezioni);
            selectRowList[i].semil.add(res[i].semilavorati);
            selectRowList[i].aliq.add(res[i].vat);
            selectRowList[i].um.add(res[i].unitamisura);
            selectRowList[i].ddt.add(res[i].ddt);
        }
        // console.log(selectRowList);
        setEventToInputsProdotti();
        setEventToOptionIvaProdotti();
        selectAllButtonDelete();
        // showPageAfterloading();
        loaded = true;
        console.timeEnd('tempo');
    })
    .catch((err => console.log(err)));

export { selectBodyList, loaded };
