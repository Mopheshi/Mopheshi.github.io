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
    let hasAnimated = false; // To prevent multiple triggers

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const currentCount = +counter.innerText.replace(/\D/g, '');

            const increment = Math.ceil(target / speed); // Increment value

            if (currentCount < target) {
                counter.innerText = `${Math.min(currentCount + increment, target)}+`;
                setTimeout(countUp, 30);
            } else {
                counter.innerText = `${target}+`;
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true; // Prevents re-triggering
                countUp();
            }
        });
    });

    observer.observe(document.querySelector('.stats')); // Observe the stats section
});