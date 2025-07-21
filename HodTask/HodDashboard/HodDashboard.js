document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/getHodDetails");
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            window.location.href = "/"; // Redirect to login if details are missing
            return;
        }

        // Update HOD's name
        document.querySelector("h1").innerText = `Welcome, ${data.hodName}!`;

        // Update branch and years
        document.getElementById("hodBranch").innerText = `Branch: ${data.hodBranch}`;
        document.getElementById("hodYears").innerText = `Available Years: ${data.hodYears.join(", ")}`;

    } catch (error) {
        console.error("Error fetching HOD details:", error);
        alert("Failed to load HOD details. Try again later.");
    }
});
