document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const certificateID = urlParams.get("certificateID");

  const details = document.getElementById("details");
  const loader = document.getElementById("loader"); // Reference to the loader element
  const profileContainer = document.getElementById("profile-container"); // Profile container

  // Function to convert Google Drive link to a direct image link
  const getDriveImageLink = (driveLink) => {
    const fileId = driveLink.match(/[-\w]{25,}/); // Extract the file ID from the link
    return fileId ? `https://drive.google.com/uc?id=${fileId}` : driveLink;
  };

  if (certificateID) {
    // Show loader while fetching data
    loader.style.display = "block";
    profileContainer.style.display = "none"; // Hide profile container initially

    fetch(
      `https://script.google.com/macros/s/AKfycbyPyKUutbDtuHO8tOuea_ajgso4naj-vegI-_6RwzaC-sqxL7bIKR2NWOFeYoguFI4w/exec?certificateID=${certificateID}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Hide loader once data is fetched
        loader.style.display = "none";

        if (data["CERTIFICATE ID"]) {
          // Show the profile picture and user info
          const profileImgLink = getDriveImageLink(data["PICTURE"]); // Convert Google Drive link
          document.getElementById("profile-img").src = profileImgLink;
          document.getElementById(
            "full-name"
          ).innerText = `${data["FIRST NAME"]} ${data["LAST NAME"]}`;
          document.getElementById("role").innerText = data["ROLE"];

          profileContainer.style.display = "flex"; // Show profile container once data is available

          details.innerHTML += `
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
