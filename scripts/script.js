document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("exiting");
        } else {
          entry.target.classList.remove("visible");
          entry.target.classList.add("exiting");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
