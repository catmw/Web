$(document).ready(function () {

    const $getStatesButton = $('#getStates');
    const $getCandidatesButton = $('#getCandidates');
    const $getResults2024Button = $('#getResults');
    const $outputTextArea = $('#TextArea');

    // Get States
    $getStatesButton.on('click', function () {
        fetch('http://localhost:3000/states')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            })
    });

    // Get Candidates
    if ($getCandidatesButton.length) {
        $getCandidatesButton.on('click', function () {
            fetch('http://localhost:3000/candidates')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const formattedData = data.map(item => `${item.candidate_party}: ${item.candidate_name}`).join('\n');
                    $outputTextArea.text(formattedData);
                })
                .catch(error => {
                    console.error('Error getting candidates:', error);
                    $outputTextArea.text('Failed to get data.');
                });
        });
    }

    // Get Results 2024
    $getResults2024Button.on('click', function () {
        fetch('http://localhost:3000/results/2024')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            })
            .catch(error => {
                console.error('Error getting results:', error);
                $outputTextArea.text('Failed to get data.');
            });
    });

});