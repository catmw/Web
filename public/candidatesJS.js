$(document).ready(function () {
    async function loadCandidates() {
        try {
            const response = await fetch('http://localhost:3000/candidates');
            const candidates = await response.json();
            const $tbody = $('.table tbody');

            candidates.forEach(candidate => {
                const photoName = candidate.candidate_name.replace(/\s+/g, '_') + '.jpg';
                const photoParty = candidate.candidate_party.toLowerCase() + '.png';
                const $row = $('<tr>');
                $row.html(`
                    <td>
                        <img src="images/${photoName}" alt="${candidate.candidate_name}" style="width: 50px; height: auto; border-radius: 50%; margin-right: 10px;">
                        ${candidate.candidate_name}
                    </td>
                    <td>
                        <img src="images/${photoParty}" alt="${candidate.candidate_party}" style="width: 30px; height: auto; margin-right: 10px;">
                        ${candidate.candidate_party}
                    </td>
                `);
                $tbody.append($row);
            });
        } catch (error) {
            console.error('Error loading candidates:', error);
        }
    }
    loadCandidates();
});