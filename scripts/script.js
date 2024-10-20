document.addEventListener('DOMContentLoaded', function () {
    AOS.init();

    const scrollDown = document.querySelector('.scroll-down');
    scrollDown.addEventListener('click', function () {
        window.scrollTo({
            top: document.querySelector('.about-me').offsetTop,
            behavior: 'smooth'
        });
    });
});
