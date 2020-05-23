// xxdati/nfatoutdati.php
document.addEventListener('DOMContentLoaded', () => {
    const addrow = document.createElement('script');
    addrow.setAttribute('type', 'module');
    addrow.setAttribute('src', '../js/fattura-create/module/addrow.js');

    const app = document.createElement('script');
    app.setAttribute('type', 'module');
    app.setAttribute('src', '../js/fattura-create/app.js');

    const menu = document.createElement('script');
    menu.setAttribute('src', '../js/menu.js');

    document.body.appendChild(app);
    document.body.appendChild(addrow);
    document.body.appendChild(menu);
});
