document.addEventListener("DOMContentLoaded", function () {
    const fetchMarksBtn = document.getElementById("fetchMarksBtn");

    if (!fetchMarksBtn) {
        console.error("fetchMarksBtn not found!");
        return;
    }

   //console.log("Button found, adding event listener...");

    fetchMarksBtn.addEventListener("click", function () {
        //console.log("Button Clicked: Fetching student marks...");

        fetch("/studentDashboard", { method: "POST" })
            .then(response => {
               // console.log("Response received:", response);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                //console.log("Fetched Data:", data);

                if (!data || !data.subjects || data.subjects.length === 0) {
                    alert("Invalid HTNO or Year");
                    window.location.href = "/";
                    return;
                }

                // Update student information section
                document.getElementById("studentInfo").innerHTML = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>HTNO:</strong> ${data.htno}</p>
                    <p><strong>Branch:</strong> ${data.branch}</p>
                    <p><strong>Year:</strong> ${data.year}</p>
                `;

                        // Extract exam names dynamically
            let examSet = new Set();
            data.subjects.forEach(subject => {
                Object.keys(subject.marks).forEach(exam => {
                    let formattedExam = exam.replace(/_/g, " "); // Replace underscores with spaces
                    examSet.add(formattedExam);
                });
            });

            // Convert Set to an array and sort
            let examList = Array.from(examSet).sort();

            // Generate header row
            // Generate header row dynamically
            let headerRow = `<th>Subject</th>`; // Start with the "Subject" column header
            examList.forEach(exam => {
                headerRow += `<th>${exam}</th>`;
            });
            document.getElementById("examHeaders").innerHTML = headerRow;

            // Populate table body
            const marksBody = document.getElementById("marksBody");
            marksBody.innerHTML = "";
            data.subjects.forEach(subject => {
                let row = `<tr><td>${subject.subject}</td>`;
    
    // Ensure each column has the correct marks value
    examList.forEach(exam => {
        let examKey = exam.replace(/ /g, "_"); // Convert back to match keys in data
        let markValue = subject.marks[examKey] ? subject.marks[examKey] : "N/A";
        row += `<td>${markValue}</td>`;
    });

    row += "</tr>";
    marksBody.innerHTML += row;
});

// Show the marks table
document.getElementById("marksTable").style.display = "table";

            })
            .catch(error => {
                //console.error("Error fetching student marks:", error);
                alert("Error retrieving data. Please try again later.");
            });
    });
});
