import { messageError } from './error-handler.js'; // eslint-disable-line

const reqOnUserAction = (data) => { // eslint-disable-line
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
                    return resolve(obj);
                }
                reject(xhr.reject);
                break;
            default: reject(xhr.reject);
                break;
            }
        };
        xhr.open('POST', 'async/fattura-create/query-on-user-action.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    });
};

export { reqOnUserAction }; // eslint-disable-line
