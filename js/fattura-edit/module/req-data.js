import { messageError } from './error-handler.js';  // eslint-disable-line

const getData = (data, file) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
        const xhttp = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line

        xhttp.onreadystatechange = function() { // eslint-disable-line
            switch (xhttp.readyState) {
            case 0: // console.log("readyState 0: "+xhttp.readyState);
                break;
            case 1: // console.log("readyState 1: "+xhttp.readyState);
                break;
            case 2: // console.log("readyState 2: "+xhttp.readyState);
                break;
            case 3: // console.log("readyState 3: "+xhttp.readyState);
                break;
            case 4: // console.log("readyState 4: "+xhttp.readyState);

                if (xhttp.status >= 200 && xhttp.status < 300) {
                    const str = xhttp.responseText; // contenuto ricevuto dal server

                    const obj = JSON.parse(str); // console.log(obj);

                    if (obj.hasOwnProperty('error')) { // eslint-disable-line
                        return messageError(obj);
                    }
                    resolve(obj);
                } else {
                    reject(new Error('something bad happened'));
                }
                break;
            default: break;
            }
        };
        xhttp.open('POST', `../../xxedit/xxdettaglio/async/fattura-out-edit/query-${file}.php`, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(data);
    });
};


export { getData }