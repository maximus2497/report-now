const API_URL = "http://localhost:5000/api/report"; // Update to match your server

function getLocation() 
{
    console.log("getLocation called");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("geo-output").innerText = "Geolocation is not supported by this browser.";
    }
    if (!geoOutput || !geoOutput.includes(',')) 
    {
        alert('Location is missing or invalid. Please get the location again.');
        return;
    }
    const [latLabel, longLabel] = geoOutput.split(',').map(s => s.trim());document.getElementById("issueForm").addEventListener("submit", async function (event) {
        event.preventDefault();
    
        const geoOutput = document.getElementById("geo-output").innerText || '';
        let latitude, longitude;
    
        if (geoOutput.includes(',')) {
            const [latLabel, longLabel] = geoOutput.split(',').map(s => s.trim());
            latitude = latLabel.split(' ')[1];
            longitude = longLabel.split(' ')[1];
        } else {
            alert('Location data is missing. Please get your location.');
            return;
        }
    
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
    document.getElementById("issueForm").addEventListener("submit", async function (event) {
        event.preventDefault();
    
        const geoOutput = document.getElementById("geo-output").innerText || '';
        let latitude, longitude;
    
        if (geoOutput.includes(',')) {
            const [latLabel, longLabel] = geoOutput.split(',').map(s => s.trim());
            latitude = latLabel.split(' ')[1];
            longitude = longLabel.split(' ')[1];
        } else {
            alert('Location data is missing. Please get your location.');
            return;
        }
    
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
    
    
}
