const request = (url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = () => {
      switch (xhr.readyState) {
        case 0:
          /* console.log("readyState 0: "+xhttp.readyState); */ break;
        case 1:
          /* console.log("readyState 1: "+xhttp.readyState); */ break;
        case 2:
          /* console.log("readyState 2: "+xhttp.readyState); */ break;
        case 3:
          /* console.log("readyState 3: "+xhttp.readyState); */ break;
        case 4: // console.log("readyState 4: "+xhr.readyState);
          if (xhr.status < 400) {
            const str = xhr.responseText;
            const obj = JSON.parse(str); // console.log(obj);
            const hasErrorProperty = Object.prototype.hasOwnProperty.call(obj, 'error');
            if (hasErrorProperty) {
              return reject(obj);
            }
            return resolve(obj);
          }
          reject(xhr.reject);
          break;
        default:
          reject(xhr.reject);
          break;
      }
    };
    xhr.open('POST', `src/${url}.php`, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  });
};

export { request };
