import { messageError } from './error-handler.js';

const reqOnUserAction = (data) => {
    return new Promise((resolve, reject) => {
        const xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = () => {
            switch (xhr.readyState) {
            case 0: /* console.log("readyState 0: "+xhr.readyState); */ break;
            case 1: /* console.log("readyState 1: "+xhr.readyState); */ break;
            case 2: /* console.log("readyState 2: "+xhr.readyState); */ break;
            case 3: /* console.log("readyState 3: "+xhr.readyState); */ break;
            case 4: // console.log("readyState 4: "+xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300) {
                    const str = xhr.responseText;
                    const obj = JSON.parse(str); // console.log(obj);
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
        xhr.open('POST', '../../xxedit/xxdettaglio/async/fattura-out-edit/query-on-user-action.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    });
};

export { reqOnUserAction };
