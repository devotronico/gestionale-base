document.querySelector('.btn-menu').addEventListener('click', () => {
    console.log(123456);
    document.querySelector('.content').classList.toggle('isOpen');
});


/**
 * al click sul menu a scomparsa
 *
 * [c1] title: <p class="title-accordion txt-color-0">Documenti</p>
 * [c2] parent: <li class="menu-item btn-accordion">...</li>
 * [c3] content: <div class="accordion-content bg-color-2">...</div>
 *
 * <c4> questo blocco di codice si occupa di chiudere tutti i menu a tendina
 * precedentemente aperti e di assegnare il simbolo +.
 * [c4.1] cicla tutti gli elementi:  <li class="menu-item btn-accordion">...</li>.
 * [c4.2] Se uno di questi elementi è quello che è stato cliccato viene saltato.
 * [c4.3] Altrimenti agli altri elementi viene rimossa la classe 'is-open' (gli mette il char +).
 * [c4.4] e gli viene assegnato l'attributo style.maxHeight = null (chiude la tendina).
 *
 * [c5] Se il bottone che è stato premuto ha la classe 'is-open'
 * la si rimuove altrimenti la si aggiunge
 * In questo modo viene gestito il cambio di icona al bottone (+|-)
 *
 * [c6] content è il contenuto del menu a tendina
 * se come stile maxHeight ha un valore e quindi è aperto
 * allora viene settato maxHeight a null in questo modo viene chiuso
 * altrimenti se maxHeight non ha un valore gli viene settato come altezza
 * il valore di scroll del suo contenuto e quindi la sua altezza ottimale in base al suo contenuto
 * @param {*} event - evento click
 */
const accordionsHandler = (event, accordions) => {
    const title = event.target; // [c1]

    // <c4>
    accordions.forEach((acc) => { // [c4.1]
        if (acc.children[0] === title) { return; } // [c4.2]
        acc.children[0].classList.remove('is-open'); // [c4.2]
        acc.children[1].style.maxHeight = null; // [c4.3]
    });
    // </c4>

    title.classList.toggle('is-open'); // [c5]

    const parent = title.parentNode; // [c2]

    const content = parent.children[1]; // [c3]

    if (content.style.maxHeight) { // [c6]
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
    }
};


const accordions = document.querySelectorAll('.btn-accordion');
accordions.forEach((accordion) => {
    accordion.addEventListener('click', (e) => {
        accordionsHandler(e, accordions);
    });
});


/**
 * Torna alla pagina precedente
 */
function goBack() {
    window.history.go(-1);
}