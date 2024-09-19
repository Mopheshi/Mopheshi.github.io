document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const certificateID = urlParams.get("certificateID");
  const details = document.getElementById("details");
  const loader = document.getElementById("loader");
  const profileContainer = document.getElementById("profile-container");
  const defaultAvatar = "pictures/avatar.png";

  if (certificateID) {
    loader.style.display = "block";
    profileContainer.style.display = "none";

    fetch(
      `https://script.google.com/macros/s/AKfycbyPyKUutbDtuHO8tOuea_ajgso4naj-vegI-_6RwzaC-sqxL7bIKR2NWOFeYoguFI4w/exec?certificateID=${certificateID}`
    )
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none";
        if (data["CERTIFICATE ID"]) {
          const profileImgLink = data["PICTURE"] || defaultAvatar; // Use default if no link
          const profileImg = document.getElementById("profile-img");
          profileContainer.style.display = "flex";

          // Set the profile image source
          profileImg.src = profileImgLink;

          // Handle image loading error
          profileImg.onerror = () => {
            profileImg.src = defaultAvatar; // Fallback to default avatar
          };

          document.getElementById(
            "full-name"
          ).innerText = `${data["FIRST NAME"]} ${data["LAST NAME"]}`;
          document.getElementById("role").innerText = data["ROLE"];
          details.innerHTML += `
                      <p><strong>Course:</strong> ${data["COURSE"]}</p>
                      <p><strong>Certificate ID:</strong> ${data["CERTIFICATE ID"]}</p>
                      <p><strong>Status:</strong> ${data["STATUS"]}</p>
                      <p><strong>Date of Completion:</strong> ${data["DATE OF COMPLETION"]}</p>
                  `;
        } else {
          details.innerHTML = "<p>Certificate not found.</p>";
        }
      })
      .catch((error) => {
        loader.style.display = "none";
        details.innerHTML =
          "<p>There was an error retrieving the certificate details.</p>";
        console.error("Error fetching certificate details:", error);
      });
  } else {
    loader.style.display = "none";
    details.innerHTML = "<p>No certificate ID provided.</p>";
  }
});
