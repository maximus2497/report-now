const API_URL = "http://localhost:5000/api/report"; // Update to match your server

function getLocation() {
    console.log("getLocation called");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("geo-output").innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const { latitude, longitude } = position.coords;
    document.getElementById("geo-output").innerText = `Lat: ${latitude}, Long: ${longitude}`;
}

function showError(error) {
    let errorMessage = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        default:
            errorMessage = "An unknown error occurred.";
            break;
    }
    document.getElementById("geo-output").innerText = errorMessage;
}

document.getElementById("issueForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const geoOutput = document.getElementById("geo-output").innerText;
    const [latLabel, longLabel] = geoOutput.split(',').map(s => s.trim());
    const latitude = latLabel.split(' ')[1];
    const longitude = longLabel.split(' ')[1];

    const description = document.getElementById("description").value;
    const imageFile = document.getElementById("image").files[0];

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("description", description);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        alert(result.message || result.error);
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
    }
});
