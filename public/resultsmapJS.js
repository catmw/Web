$(document).ready(function () {
    async function paintMap() {
        try {
            const response = await fetch('http://localhost:3000/results/2024');
            const results = await response.json();

            const stateResults = {};
            results.forEach(result => {
                if (!stateResults[result.state_abbr]) {
                    stateResults[result.state_abbr] = [];
                }
                stateResults[result.state_abbr].push(result);
            });

            const map = document.getElementById('outlines');

            Object.keys(stateResults).forEach(stateAbbr => {
                const stateData = stateResults[stateAbbr];

                const winner = stateData.reduce((prev, curr) =>
                    prev.votes > curr.votes ? prev : curr
                );

                const stateColor =
                    winner.candidate_party === 'Republican' ? 'red' : 'blue';

                const stateElement = map.querySelector(`#${stateAbbr}`);
                if (stateElement) {
                    stateElement.style.fill = stateColor;
                }
            });

        } catch (error) {
            console.error('Error loading election results:', error);
        }
    }

    paintMap();
});