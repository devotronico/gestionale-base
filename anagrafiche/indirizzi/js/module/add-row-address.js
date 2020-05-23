/**
 * [a] Seleziona il corpo della tabella dove appendere una riga <tr> per ogni indirizzo associato al cliente.
 * [p] Se la tabella della lista degli indirizzi ha una sola riga <tr>
 *   [q] Se l'unica riga presente ha la proprietà id: address-empty, questa riga viene rimossa
 *   [r] Altrimenti l'unica riga presente riporta un indirizzo quindi non va rimossa ma:
 *   [s] gli viene rimosso lo stile boxShadow e
 *   [t] riportato a zero il valore della colonna principale se la nuova riga che viene
 *       costruita contiene un indirizzo con la colonna principale a 1.
 * <b> Vengono ciclate tutte le righe degli indirizzi della tabella
 *     Se l' indirizzo di cui bisogna ancora costruire la riga nella tabella è principale(valore = 1)
 *     allora tutte le righe vengono riportare a valore 0 nella colonna principale
 *
 * [c] Crea e inserisce un nuova riga TR nel corpo della tabella
 * // [d] Aggiunge alla riga un bordo colorato per far capire all' utente che questa riga è stata appena aggiunta
 * [e] Aggiunge alla riga una classe e come id l' id dell' indirizzo preso dalla tabella `indirizzi`
 *
 * <f> Per ogni proprietà presente nell' oggetto indirizzo viene creato un nodo <td><p>valore</p></td>
 *     che viene appeso al nodo <tr>
 *
 * <g> crea bottoni
 * [h] aggiunge a ogni nuovo bottone creato una funzione evento
 * @param {*} indirizzo
 */
const addRowAddress = (indirizzo) => { // console.log(indirizzo);
    const addressList = document.querySelector('#indirizzi .list-tbody'); // [a]

    const principaleTD = 1;

    if (addressList.childElementCount === 1) { // [p]
        const UniqueRow = addressList.children[0];

        if (UniqueRow.id === 'address-empty') { // [q]
            UniqueRow.remove();
        } else { // [r]
            UniqueRow.style.boxShadow = 'none'; // [s]
            if (indirizzo.principale === '1') { // [t]
                UniqueRow.children[principaleTD].children[0].innerText = '0';
            }
        }
    } else { // <b>
        for (const tr of addressList.children) {
            tr.style.boxShadow = 'none';
            if (indirizzo.principale === '0') { continue; }
            tr.children[principaleTD].children[0].innerText = '0';
        }
    }
    // </b>

    const newNodeRow = addressList.insertRow(-1); // [c]
    // newNodeRow.style.boxShadow = '-8px 0px green'; // [d]
    newNodeRow.classList.add('list-tr'); // [e]
    newNodeRow.id = `tr-${indirizzo.indirizzoId}`; // [e]

    // <f>
    for (let key in indirizzo) {
        const td = document.createElement('TD');
        td.classList.add('list-td', 'bg-color-2');
        newNodeRow.appendChild(td);
        const paragrafo = document.createElement('P');
        paragrafo.classList.add(key, 'txt-color-2');
        // paragrafo.classList.add('txt-color-2');
        paragrafo.innerText = indirizzo[key];
        td.appendChild(paragrafo);
    }
    // </f>

    // <g>
    // Crea TD che contiene il DIV/BOX dei bottoni
    const td = document.createElement('TD');
    td.classList.add('list-td', 'bg-color-2');
    newNodeRow.appendChild(td);

    // Crea DIV/BOX che contiene i bottoni
    const box = document.createElement('DIV');
    box.classList.add('box-btn', 'box-btn-center', 'box-btn-list');
    box.setAttribute('num', indirizzo.indirizzoId);
    td.appendChild(box);

    // crea Buttone Mostra
    const newBtnView = document.createElement('BUTTON');
    newBtnView.classList.add('btn', 'btn-view', 'btn-primary', 'btn-flat');
    newBtnView.innerHTML = 'View';
    box.appendChild(newBtnView);

    // crea Buttone Modifica
    const newBtnEdit = document.createElement('BUTTON');
    newBtnEdit.classList.add('btn', 'btn-edit', 'btn-warning', 'btn-flat');
    newBtnEdit.innerHTML = 'Edit';
    box.appendChild(newBtnEdit);

    // crea Buttone Cancella
    const newBtnDelete = document.createElement('BUTTON');
    newBtnDelete.classList.add('btn', 'btn-canc', 'btn-danger', 'btn-flat');
    newBtnDelete.innerHTML = 'Canc';
    box.appendChild(newBtnDelete);
    // </g>

    // selectAllButton(); // [h]
};

export { addRowAddress }