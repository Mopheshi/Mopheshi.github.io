document.addEventListener('DOMContentLoaded', function () {
    AOS.init();

    const scrollDown = document.querySelector('.scroll-down');
    scrollDown.addEventListener('click', function () {
        window.scrollTo({
            top: document.querySelector('.about-me').offsetTop,
            behavior: 'smooth'
        });
    });

    // Counting effect
    const counters = document.querySelectorAll('.stats h3');
    const speed = 200;

    const countUp = (counter) => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const count = parseInt(counter.innerText, 10);
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});

    counters.forEach(counter => {
        counter.setAttribute('data-target', counter.innerText.replace(/\D/g, ''));
        counter.innerText = '0';
        observer.observe(counter);
    });
});