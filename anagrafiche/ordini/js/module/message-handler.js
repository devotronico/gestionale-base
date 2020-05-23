/**
 * Mostra messaggio di errore o di successo
 * [a] Seleziona l' elemento contenitore che mostra il messaggio
 * [b] Rimuove tutto il contenuto dall elemento contenitore
 * <c> Crea un secondo elemento contenitore
 *     con l'id (danger|success) per stilizzare con
 *     il colore (rosso|verde) in base al tipo di messaggio
 * </c>
 * @param {Object} objData - i dati che ritornano dal server
 * @param {String} errorType - tipo di messaggio success|danger
 * @param {Array} sectionsToHide - lista di sezioni da mostrare|nascondere
 */
const showMessage = (objData, errorType, sections = false) => {
  if (sections) {
    sections.toHide.forEach(section => {
      document.getElementById(section).style.display = 'none'; //
    });
  }
  const message = document.querySelector('#message'); // [a]
  message.innerHTML = ''; // [b]
  // <c>
  const messageBox = document.createElement('DIV'); // [c]
  messageBox.id = `message-${errorType}`; // [d]
  messageBox.className = 'section';
  message.appendChild(messageBox);
  // </c>

  // <TABLE>
  const table = document.createElement('TABLE');
  table.id = 'message-table';
  messageBox.appendChild(table);

  // <THEAD>
  const thead = document.createElement('THEAD');
  table.appendChild(thead);
  const thead_tr = document.createElement('TR');
  thead.appendChild(thead_tr);
  const thead_th = document.createElement('TH');
  thead_th.setAttribute('colspan', 2);
  thead_tr.appendChild(thead_th);

  // <BOX:TITLE--BTN-CLOSE>
  const messageHead = document.createElement('DIV');
  messageHead.id = 'message-head';
  thead_th.appendChild(messageHead);
  // </BOX:TITLE--BTN-CLOSE>

  // <TITLE>
  const messageTitle = document.createElement('DIV');
  messageTitle.id = 'message-title';
  messageTitle.innerText = errorType.toLocaleUpperCase();
  messageHead.appendChild(messageTitle);
  // </TITLE>

  // <BTN-CLOSE>
  const boxBtnClose = document.createElement('DIV');
  boxBtnClose.classList.add('box-btn-close');
  messageHead.appendChild(boxBtnClose);
  const btnClose = document.createElement('BUTTON');
  btnClose.classList.add('btn', 'btn-light', 'btn-close');
  btnClose.innerHTML = '&#10006';
  boxBtnClose.appendChild(btnClose);
  btnClose.addEventListener('click', () => {
    message.innerHTML = '';
    if (sections) {
      sections.toShow.forEach(section => {
        document.getElementById(section).style.display = 'flex';
      });
    }
  });
  // </BTN-CLOSE>
  // </THEAD>

  // <BODY>
  const tbody = document.createElement('TBODY');
  table.appendChild(tbody);
  for (const key in objData) {
    const tr = document.createElement('TR');
    tbody.appendChild(tr);
    const th = document.createElement('TH');
    th.innerText = key;
    tr.appendChild(th);
    const td = document.createElement('TD');
    td.innerText = objData[key];
    tr.appendChild(td);
  }
  // <BODY>
  // </TABLE>
};

export { showMessage };
