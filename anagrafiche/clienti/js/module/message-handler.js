import { clickButton } from './add-btn-event.js';

const showMessage = (obj, errorType) => {
    const message = document.querySelector('#message');

    const messageBox = document.createElement('DIV');
    messageBox.className = `message-${errorType}`;
    message.appendChild(messageBox);

    const btnBox = document.createElement('DIV');
    btnBox.classList.add('btn-box');
    messageBox.appendChild(btnBox);

    const btn = document.createElement('BUTTON');
    btn.classList.add('btn', 'btn-close');
    btn.addEventListener('click', clickButton, false);
    btn.innerHTML = '&#10006';
    btnBox.appendChild(btn);

    const table = document.createElement('TABLE');
    // table.classList.add('message-table');
    table.className = 'message-table';
    messageBox.appendChild(table);
    const tbody = document.createElement('TBODY');
    table.appendChild(tbody);
    for (const key in obj) {
        const tr = document.createElement('TR');
        tbody.appendChild(tr);
        const th = document.createElement('TH');
        th.innerText = key;
        tr.appendChild(th);
        const td = document.createElement('TD');
        td.innerText = obj[key];
        tr.appendChild(td);
    }
}



// const showMessageError = () => {
//     console.log('test');
// }


export { showMessage };
// export { showMessageSuccess, showMessageError };