
document.addEventListener('DOMContentLoaded', () => {

    const getStatesButton = document.getElementById('getStates');
    const getCandidatesButton = document.getElementById('getCandidates');
    const getResults2024Button = document.getElementById('getResults')
    const outputTextArea = document.getElementById('TextArea');

//GetStates
    getStatesButton.addEventListener('click', () => {
        fetch('http://localhost:3000/states')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                
                outputTextArea.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error fetching states:', error);
                outputTextArea.textContent = 'Failed to fetch data.';
            });
    });

    if (getCandidatesButton) {
        getCandidatesButton.addEventListener('click', () => {
            fetch('http://localhost:3000/candidates') // Adjust URL as needed
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Format and display the party and candidate names
                    const formattedData = data.map(item => `${item.candidate_party}: ${item.candidate_name}`).join('\n');
                    outputTextArea.textContent = formattedData;
                })
                .catch(error => {
                    console.error('Error fetching parties and candidates:', error);
                    outputTextArea.textContent = 'Failed to fetch data.';
                });
        });
    }

    getResults2024Button.addEventListener('click', () => {
        fetch('http://localhost:3000/results/2024')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                
                outputTextArea.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error fetching states:', error);
                outputTextArea.textContent = 'Failed to fetch data.';
            });
    });


});
