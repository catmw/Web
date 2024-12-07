$(document).ready(function () {
    async function loadElectionResults() {
        try {
            const response = await fetch('http://localhost:3000/evresults/2024');
            const results = await response.json();
            const $tbody = $('#vote-details tbody');

            $tbody.empty();

            console.log('check', results);

            results.forEach(winner => {
                const $row = $('<tr>');
                $row.html(`
                    <td>${winner.state_name}(${winner.state_abbr})</td>
                    <td>${winner.ev}</td>
                    <td>${winner.candidate_name}</td>
                `);


                if (winner.candidate_name === 'Donald Trump') {
                    //pretty red
                    $row.css('background-color', '#FF9999'); 
                } else if (winner.candidate_name === 'Kamala Harris') {
                    //pretty blue
                    $row.css('background-color', '#9999FF'); 
                }

                $tbody.append($row);
            });
        } catch (error) {
            console.error('Error loading election results:', error);
        }
    }

    loadElectionResults();
});