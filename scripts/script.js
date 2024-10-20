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

    const countUp = (counter, target) => {
        let currentCount = 0;
        const increment = Math.ceil(target / (speed / 30)); // Calculate increment per frame

        const updateCounter = () => {
            if (currentCount < target) {
                currentCount += increment;
                if (currentCount > target) {
                    currentCount = target; // Ensure we don't exceed the target
                }
                counter.innerText = `${currentCount}+`;
                requestAnimationFrame(updateCounter); // Request next frame
            } else {
                counter.innerText = `${target}+`; // Ensure it ends at the target
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true; // Prevents re-triggering
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    countUp(counter, target); // Start counting for each counter
                });
            }
        });
    });

    observer.observe(document.querySelector('.stats')); // Observe the stats section
});