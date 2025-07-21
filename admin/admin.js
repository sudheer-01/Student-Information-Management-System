document.addEventListener("DOMContentLoaded", function () {
    const statusFilter = document.getElementById("statusFilter");
    const hodRequestsBody = document.getElementById("hodRequestsBody");

    // Fetch HOD Requests
    function fetchHodRequests(status = "All") {
        fetch("/getHodRequests")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Data:", data);

                hodRequestsBody.innerHTML = ""; // Clear table before inserting new data

                data.forEach(hod => {
                    if (status !== "All" && hod.status !== status) return;

                    let row = `<tr>
                        <td>${hod.hod_id}</td>
                        <td>${hod.name}</td>
                        <td>${hod.email}</td>
                        <td>${hod.year}</td>
                        <td>${hod.branch}</td>
                        <td>${hod.status}</td>
                        <td>
                            ${hod.status === "Pending" ? `
                                <button class="action-btn approve" onclick="updateStatus('${hod.hod_id}', 'Approved')">Approve</button>
                                <button class="action-btn reject" onclick="updateStatus('${hod.hod_id}', 'Rejected')">Reject</button>
                            ` : "No Action"}
                        </td>
                    </tr>`;
                    hodRequestsBody.innerHTML += row;
                });
            })
            .catch(error => console.error("Error fetching HOD requests:", error));
    }

    // Update Status (Approve/Reject)
    window.updateStatus = function (hod_id, newStatus) {
        fetch("/updateHodStatus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hod_id, newStatus })
        })
        .then(response => response.json())
        .then(result => {
            console.log("Update Response:", result);
            alert(result.message);
            fetchHodRequests(statusFilter.value); // Refresh table after update
        })
        .catch(error => console.error("Error updating status:", error));
    };

   

    // Status Filter Event
    statusFilter.addEventListener("change", () => fetchHodRequests(statusFilter.value));
});
