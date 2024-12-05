document.addEventListener('DOMContentLoaded', () => { 
    async function loadStates() {
        try {
            const response = await fetch('http://localhost:3000/states');
            const states = await response.json();
            const tbody = document.querySelector('.table tbody');

            states.forEach(state => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${state.name}</td>
                    <td>${state.abbr}</td>
                    <td>${state.capital}</td>
                    <td>${state.ev}</td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading states:', error);
        }
    }

    window.onload = loadStates;
})