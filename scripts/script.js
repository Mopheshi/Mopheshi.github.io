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
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const count = parseInt(counter.innerText, 10);

            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(countUp, 30);
            } else {
                counter.innerText = target;
            }
        };

        countUp();
    });
});
