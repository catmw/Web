$(document).ready(function () {
    async function loadElectionResults() {
        try {
            // Fetch data from the backend
            const response = await fetch('http://localhost:3000/results/2024');
            const results = await response.json();
            const $tbody = $('.table tbody');

            // Group results by state
            const stateResults = {};
            results.forEach(result => {
                if (!stateResults[result.state_name]) {
                    stateResults[result.state_name] = [];
                }
                stateResults[result.state_name].push(result);
            });

            // Process each state
            Object.keys(stateResults).forEach(state => {
                const stateData = stateResults[state];

                // Determine the winner by comparing votes
                const winner = stateData.reduce((prev, curr) =>
                    prev.votes > curr.votes ? prev : curr
                );
                const runnerUp = stateData.find(candidate => candidate !== winner);

                // Set the party color for the winner
                const statePartyColor =
                    winner.candidate_party === 'Republican' ? 'red' : 'blue';

                // Create the table row
                const $row = $('<tr>');
                $row.html(`
                    <td class="state-cell ${statePartyColor}">
                        (${winner.candidate_party.charAt(0)}) ${winner.state_name} (${winner.state_abbr})
                    </td>
                    <td>${winner.candidate_name}</td>
                    <td>${winner.votes.toLocaleString()}</td>
                    <td>${((winner.votes / (winner.votes + runnerUp.votes)) * 100).toFixed(0)}%</td>
                    <td>${((runnerUp.votes / (winner.votes + runnerUp.votes)) * 100).toFixed(0)}%</td>
                    <td>${runnerUp.votes.toLocaleString()}</td>
                    <td>${runnerUp.candidate_name}</td>
                `);
                $tbody.append($row);
            });
        } catch (error) {
            console.error('Error loading election results:', error);
        }
    }

    loadElectionResults();
});