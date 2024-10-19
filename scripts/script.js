document.addEventListener("DOMContentLoaded", () => {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTab = e.target.getAttribute("data-tab");

            tabContents.forEach(content => {
                content.classList.add("hidden");
            });

            document.getElementById(targetTab).classList.remove("hidden");

            tabLinks.forEach(link => {
                link.classList.remove("text-green-500");
            });

            e.target.classList.add("text-green-500");
        });
    });
});