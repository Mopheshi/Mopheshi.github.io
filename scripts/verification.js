document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const certificateID = urlParams.get("certificateID");
  
    if (certificateID) {
      fetch(`https://script.google.com/macros/s/AKfycbyPyKUutbDtuHO8tOuea_ajgso4naj-vegI-_6RwzaC-sqxL7bIKR2NWOFeYoguFI4w/exec?certificateID=${certificateID}`)
        .then(response => response.json())
        .then(data => {
          const details = document.getElementById('details');
          if (data["CERTIFICATE ID"]) {
            details.innerHTML = `
              <p><strong>First Name:</strong> ${data["FIRST NAME"]}</p>
              <p><strong>Middle Name:</strong> ${data["MIDDLE NAME"]}</p>
              <p><strong>Last Name:</strong> ${data["LAST NAME"]}</p>
              <p><strong>Course:</strong> ${data["COURSE"]}</p>
              <p><strong>Certificate ID:</strong> ${data["CERTIFICATE ID"]}</p>
              <p><strong>Status:</strong> ${data["STATUS"]}</p>
              <p><strong>Date of Completion:</strong> ${new Date(data["DATE OF COMPLETION"]).toLocaleDateString()}</p>
            `;
          } else {
            details.innerHTML = '<p>Certificate not found.</p>';
          }
        })
        .catch(error => {
          console.error("Error fetching certificate details:", error);
          document.getElementById('details').innerHTML = '<p>There was an error retrieving the certificate details.</p>';
        });
    } else {
      document.getElementById('details').innerHTML = '<p>No certificate ID provided.</p>';
    }
  });
  