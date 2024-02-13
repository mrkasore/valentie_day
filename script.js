const inp = document.querySelector('#sign_in');
const contentDiv = document.querySelector('.content');
const loadingOverlay = document.querySelector('.loading-overlay');
inp.addEventListener('click', (e) => {
    e.preventDefault();
    if((document.querySelector('#password').value != '') && (document.querySelector('#password').value.toLowerCase() == 'iloveyou')) {
        console.log(document.querySelector('#password'));
        const url = document.querySelector('#authorization').getAttribute('action');
        showLoadingOverlay();
        loadPage(url);
    } else {
        console.log('Неверный пароль');
        document.querySelector('.wrong_password').style.visibility = 'visible';
    }
});

const showLoadingOverlay = () => {
    loadingOverlay.style.opacity = 1;
}
const hideLoadingOverlay = () => {
    loadingOverlay.style.opacity = 0;
}
const loadPage = (url) => {
    showLoadingOverlay();
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('.content').innerHTML;

            contentDiv.classList.add('fade-out');
            contentDiv.innerHTML = newContent;

            setTimeout(() => {
                contentDiv.classList.remove('fade-out');
                history.pushState({}, '', url);
                hideLoadingOverlay();
            }, 500);
        });

    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname);
    });
}

