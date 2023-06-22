const apps = document.querySelectorAll('.card')
const locs = document.querySelectorAll('.loc-card')

apps.forEach(app => {
    app.addEventListener('click', SetActiveAppOnClick)
})

locs.forEach(loc => {
    loc.addEventListener('click', SetActiveLocOnClick)
})

function SetActiveAppOnClick(e) {
    const element = e.target;

    const activeElement = document.querySelector('.active');
    if (activeElement) activeElement.classList.remove('active');

    if (element.classList.contains('card')) {
        element.classList.add('active');
    }

    else if (element.parentElement.classList.contains('card')) {
        element.parentElement.classList.add('active');
    }

    else if (element.parentElement.classList.contains('app-icon')) {
        element.parentElement.parentElement.classList.add('active');
    }

}

function SetActiveLocOnClick(e) {
    const element = e.target;

    const activeElement = document.querySelector('.active-loc');
    if (activeElement) activeElement.classList.remove('active-loc');

    if (element.classList.contains('loc-card')) {
        element.classList.add('active-loc');
    }

    else if (element.parentElement.classList.contains('loc-card') ) {
        element.parentElement.classList.add('active-loc');
    }

    else if (element.parentElement.classList.contains('loc-icon')) {
        element.parentElement.parentElement.classList.add('active-loc');
    }

}