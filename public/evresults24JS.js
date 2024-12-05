$(document).ready(function () {
    async function loadElectionResults() {
        try {
            // Fetch data from the backend
            const response = await fetch('http://localhost:3000/evresults/2024');
            const results = await response.json();
            const $tbody = $('#vote-details tbody');

            // Clear the table body before appending rows
            $tbody.empty();

            console.log('Backend Results:', results); // Debug: Inspect the response

            // Add each state's winner to the table
            results.forEach(winner => {
                const $row = $('<tr>');
                $row.html(`
                    <td>${winner.state_name}</td>
                    <td>${winner.ev}</td>
                    <td>${winner.candidate_name}</td>
                `);

                // Apply color-coding for the winning candidate
                if (winner.candidate_name === 'Donald Trump') {
                    $row.css('background-color', '#FF9999'); // Red shade for Republican
                } else if (winner.candidate_name === 'Kamala Harris') {
                    $row.css('background-color', '#9999FF'); // Blue shade for Democrat
                }

                $tbody.append($row);
            });
        } catch (error) {
            console.error('Error loading election results:', error);
        }
    }

    loadElectionResults();
});