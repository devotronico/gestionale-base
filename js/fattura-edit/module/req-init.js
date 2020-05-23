import { messageError } from './error-handler.js';  // eslint-disable-line

const getDataInit = (data) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
        const xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
        xhr.onreadystatechange = function() { // eslint-disable-line
            switch (xhr.readyState) {
            case 0: // console.log("readyState 0: "+xhr.readyState);
                break;
            case 1: // console.log("readyState 1: "+xhr.readyState);
                break;
            case 2: // console.log("readyState 2: "+xhr.readyState);
                break;
            case 3: // console.log("readyState 3: "+xhr.readyState);
                break;
            case 4: // console.log("readyState 4: "+xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300) {
                    const str = xhr.responseText;
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
        xhr.open('POST', '../../xxedit/xxdettaglio/async/fattura-out-edit/query-init.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    });
};

export { getDataInit };