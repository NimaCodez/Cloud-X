const apps = document.querySelectorAll('.card')

apps.forEach(app => {
    app.addEventListener('click', SetActiveAppOnClick)
})

function SetActiveAppOnClick(e) {
    const element = e.target;

    const activeElement = document.querySelector('.active');
    if (activeElement) activeElement.classList.remove('active');

    if (element.classList.contains('card')) {
        element.classList.add('active');
    }

    else if (element.parentElement.classList.contains('card') ) {
        element.parentElement.classList.add('active');
    }

    else if (element.parentElement.classList.contains('app-icon')) {
        element.parentElement.parentElement.classList.add('active');
    }

}