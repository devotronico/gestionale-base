document.addEventListener('DOMContentLoaded', () => {
    const error = document.createElement('script');
    error.setAttribute('type', 'module');
    error.setAttribute('src', '../../js/fattura-edit/module/error-handler.js');

    const reqInit = document.createElement('script');
    reqInit.setAttribute('type', 'module');
    reqInit.setAttribute('src', '../../js/fattura-edit/module/req-init.js');


    const protocols = document.createElement('script');
    protocols.setAttribute('type', 'module');
    protocols.setAttribute('src', '../../js/fattura-edit/module/dom-handler.js');

    const loader = document.createElement('script');
    loader.setAttribute('type', 'module');
    loader.setAttribute('src', '../../js/fattura-edit/module/loader.js');

    const reqOnUserAction = document.createElement('script');
    reqOnUserAction.setAttribute('type', 'module');
    reqOnUserAction.setAttribute('src', '../../js/fattura-edit/module/req-on-user-action.js');

    const addRowInit = document.createElement('script');
    addRowInit.setAttribute('type', 'module');
    addRowInit.setAttribute('src', '../../js/fattura-edit/module/addrow-init.js');

    const addRowFromUser = document.createElement('script');
    addRowFromUser.setAttribute('type', 'module');
    addRowFromUser.setAttribute('src', '../../js/fattura-edit/module/addrow-from-user.js');

    const app = document.createElement('script');
    app.setAttribute('type', 'module');
    app.setAttribute('src', '../../js/fattura-edit/app.js');

    const menu = document.createElement('script');
    menu.setAttribute('src', '../../js/menu.js');

    document.body.appendChild(reqInit);
    document.body.appendChild(error);
    document.body.appendChild(protocols);
    document.body.appendChild(loader);
    document.body.appendChild(reqOnUserAction);
    document.body.appendChild(addRowInit);
    document.body.appendChild(addRowFromUser);
    document.body.appendChild(app);
    document.body.appendChild(menu);
});
