$(document).ready(function () {

    const $getStatesButton = $('#getStates');
    const $getCandidatesButton = $('#getCandidates');
    const $getResults2024Button = $('#getResults');
    const $outputTextArea = $('#TextArea');

    // Get States
    $getStatesButton.on('click', function () {
        $.ajax({
            url: 'http://localhost:3000/states',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            },
            error: function (xhr, status, error) {
                console.error('Error fetching states:', error);
                $outputTextArea.text('Failed to fetch data.');
            }
        });
    });

    // Get Candidates
    if ($getCandidatesButton.length) {
        $getCandidatesButton.on('click', function () {
            $.ajax({
                url: 'http://localhost:3000/candidates', // Adjust URL as needed
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    const formattedData = data.map(item => `${item.candidate_party}: ${item.candidate_name}`).join('\n');
                    $outputTextArea.text(formattedData);
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching parties and candidates:', error);
                    $outputTextArea.text('Failed to fetch data.');
                }
            });
        });
    }

    // Get Results 2024
    $getResults2024Button.on('click', function () {
        $.ajax({
            url: 'http://localhost:3000/results/2024',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            },
            error: function (xhr, status, error) {
                console.error('Error fetching results:', error);
                $outputTextArea.text('Failed to fetch data.');
            }
        });
    });

});