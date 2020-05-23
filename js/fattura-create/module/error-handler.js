const disableSubmitBtn = () => {
    const submit = document.querySelector('input[type="submit"]');
    submit.disabled = true;
    submit.style.backgroundColor = 'red';
};


const messageError = (obj) => {
    disableSubmitBtn();
    const message = document.querySelector('.message');
    message.style.display = 'block';
    message.children[1].innerHTML = `status: ${obj.status}`;
    message.children[1].innerHTML += `<br>file: ${obj.file}`;
    message.children[1].innerHTML += `<br>linea: ${obj.line}`;
    message.children[1].innerHTML += `<br>section: ${obj.section}`;
    message.children[1].innerHTML += `<br>filter: ${obj.filter}`;
    message.children[1].innerHTML += `<br>error: ${obj.error}`;
    message.children[1].innerHTML += `<br>message: ${obj.mess}`;
};

export {messageError};