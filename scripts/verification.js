document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const certificateID = urlParams.get("certificateID");

  const details = document.getElementById("details");
  const loader = document.getElementById("loader"); // Reference to the loader element

  if (certificateID) {
    // Show loader while fetching data
    loader.style.display = "block";

    fetch(
      `https://script.google.com/macros/s/AKfycbyPyKUutbDtuHO8tOuea_ajgso4naj-vegI-_6RwzaC-sqxL7bIKR2NWOFeYoguFI4w/exec?certificateID=${certificateID}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Hide loader once data is fetched
        loader.style.display = "none";

        if (data["CERTIFICATE ID"]) {
          details.innerHTML = `
            <p><strong>First Name:</strong> ${data["FIRST NAME"]}</p>
            <p><strong>Middle Name:</strong> ${data["MIDDLE NAME"]}</p>
            <p><strong>Last Name:</strong> ${data["LAST NAME"]}</p>
            <p><strong>Course:</strong> ${data["COURSE"]}</p>
            <p><strong>Certificate ID:</strong> ${data["CERTIFICATE ID"]}</p>
            <p><strong>Status:</strong> ${data["STATUS"]}</p>
            <p><strong>Date of Completion:</strong> ${new Date(
              data["DATE OF COMPLETION"]
            ).toLocaleDateString()}</p>
          `;
        } else {
          details.innerHTML = "<p>Certificate not found.</p>";
        }
      })
      .catch((error) => {
        // Hide loader and show error message
        loader.style.display = "none";
        console.error("Error fetching certificate details:", error);
        details.innerHTML =
          "<p>There was an error retrieving the certificate details.</p>";
      });
  } else {
    // Hide loader if no certificate ID is provided
    loader.style.display = "none";
    details.innerHTML = "<p>No certificate ID provided.</p>";
  }
});
