document.addEventListener('DOMContentLoaded', function () {
    AOS.init();

    const scrollDown = document.querySelector('.scroll-down');
    scrollDown.addEventListener('click', function () {
        window.scrollTo({
            top: document.querySelector('.about-me').offsetTop,
            behavior: 'smooth'
        });
    });

    const counters = document.querySelectorAll('.stats h3');
    const speed = 200;

    counters.forEach(counter => {
        const countUp = () => {
            const target = +counter.getAttribute('data-target');
            const currentCount = +counter.innerText.replace(/\D/g, '');

            const increment = target / speed;

            if (currentCount < target) {
                counter.innerText = `${Math.ceil(currentCount + increment)}+`;
                setTimeout(countUp, 30);
            } else {
                counter.innerText = `${target}+`;
            }
        };

        countUp();
    });
});
