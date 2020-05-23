import { messageError } from './error-handler.js'; // eslint-disable-line

const reqOnUserAction = (url, data) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
        const xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
        xhr.onreadystatechange = () => { // eslint-disable-line
            switch (xhr.readyState) {
                case 0: /* console.log("readyState 0: "+xhttp.readyState); */ break;
                case 1: /* console.log("readyState 1: "+xhttp.readyState); */ break;
                case 2: /* console.log("readyState 2: "+xhttp.readyState); */ break;
                case 3: /* console.log("readyState 3: "+xhttp.readyState); */ break;
                case 4: // console.log("readyState 4: "+xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const str = xhr.responseText;
                        const obj = JSON.parse(str); console.log(obj);
                        const hasErrorProperty = Object.prototype.hasOwnProperty.call(obj, 'error');
                        if (hasErrorProperty) { // [A]
                            return messageError(obj);
                        }
                        resolve(obj);
                    }
                    reject(xhr.reject);
                    break;
                default: reject(xhr.reject);
                    break;
            }
        };
        xhr.open('POST', `src/${url}.php`, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    });
};

export { reqOnUserAction }; // eslint-disable-line




    // RICHIESTA FILE DI JSON --------------------------------------------------
/**
 *
 * @param {string} file - file php al quale fare la request
 * @param {string} data - stringa json da far processare lato backend
 *
 * readyState values:
 * 0: request not initialized (.onerror)
 * 1: server connection established
 * 2: request received
 * 3: processing request (.onprogress)
 * 4: request finished and response is ready (.onload)
 *
 * HTTP Status
 * 200: 'OK'
 * 403: 'Forbidden'
 * 404: 'Not Found'
 */
/*
function request(data = null) {

    return new Promise((resolve, reject) => {

        const xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        xhr.onreadystatechange = function () {  //console.log('readyState: '+xhr.readyState);

            switch (this.readyState) {
                case 0: console.log('readyState 0: ' + xhr.readyState); break;
                case 1: console.log('readyState 1: ' + xhr.readyState); break;
                case 2: console.log('readyState 2: ' + xhr.readyState); break;
                case 3: console.log('readyState 3: ' + xhr.readyState); break;
                case 4: console.log('readyState 4: ' + xhr.readyState);

                    if (this.status >= 200 && this.status < 300) {
                        let str = xhr.responseText; // console.log(str);
                        let obj = JSON.parse(str);
                        console.log('TCL: xhr.onreadystatechange -> obj', obj)
                        resolve(obj);
                    } else {
                        reject('Errore codice :' + this.status);
                    }
                    break;
            }
        };
        xhr.open('POST', './src/action.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    });
}
*/


