// <SHOW-HIDE-ELEMENT>
/**
 * Al click su un bottone gestisce quali elementi mostrare o nascondere
 * @param {string} type - il tipo di azione al click di un bottone
 */
const handleCardsToShowOrHide = (type) => {
    for (const tr of document.querySelector('.list-tbody').children) {
        tr.style.boxShadow = 'none';
    }
    switch (type) {
        case 'btn-card-add':
            document.querySelector('.btn-card-add').disabled = true;
            document.querySelector('.indirizzi-add').style.display = 'none';
            document.querySelector('.btn-new').style.display = 'block';
            break;
        case 'btn-card-update':
            document.querySelector('.btn-card-update').disabled = true;
            document.querySelector('.indirizzi-edit').style.display = 'none';
            document.querySelector('.btn-new').style.display = 'block';
            break;
        case 'view-row':
            document.querySelector('.btn-new').style.display = 'none';
            document.querySelector('.indirizzi-add').style.display = 'none';
            document.querySelector('.indirizzi-edit').style.display = 'none';
            document.querySelector('.indirizzi-view').style.display = 'block';
            break;
        case 'edit-row':
            document.querySelector('.btn-new').style.display = 'none';
            document.querySelector('.indirizzi-add').style.display = 'none';
            document.querySelector('.indirizzi-view').style.display = 'none';
            document.querySelector('.indirizzi-edit').style.display = 'block';
            break;
        case 'delete-row':
            document.querySelector('.indirizzi-add').style.display = 'none';
            document.querySelector('.indirizzi-view').style.display = 'none';
            document.querySelector('.indirizzi-edit').style.display = 'none';
            document.querySelector('.btn-new').style.display = 'block';
            break;
        case 'btn-close-add':
            document.querySelector('.indirizzi-add').style.display = 'none';
            document.querySelector('.btn-new').style.display = 'inline-block';
            break;
        case 'btn-close-view':
            document.querySelector('.indirizzi-view').style.display = 'none';
            document.querySelector('.btn-new').style.display = 'inline-block';
            break;
        case 'btn-close-edit':
            document.querySelector('.indirizzi-edit').style.display = 'none';
            document.querySelector('.btn-new').style.display = 'inline-block';
            break;
        default:
            break;
    }
};
// </CLOSE-FOR>


export { handleCardsToShowOrHide }