const menuButton = document.getElementById('open-button');
const menuContainer = document.querySelector('.menu-content');
const closeButton = document.getElementById('close-button');
const contentContainer = document.querySelector('.content-container');
const navBody = document.querySelector('main');


menuButton.addEventListener('click', () => {
    menuContainer.classList.toggle('active');
    contentContainer.classList.toggle('active');
    navBody.classList.toggle('blurred-background');
});

closeButton.addEventListener('click', () => {
    menuContainer.classList.remove('active');
    contentContainer.classList.remove('active');
    navBody.classList.remove('blurred-background');
});