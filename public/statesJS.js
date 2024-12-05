$(document).ready(function () {
    let statesOrder = []; 
    let currentSort = { key: null, order: 'asc' };

    // get data and create table
    function loadStates() {
        $.ajax({
            url: 'http://localhost:3000/states',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                statesOrder = data; // Store fetched data
                makeStates(statesOrder);
            },
            error: function (xhr, status, error) {
                console.error('Error loading states:', error);
            }
        });
    }


    function makeStates(states) {
        const $tbody = $('.table tbody');
        $tbody.empty(); 
        states.forEach((state) => {
            $tbody.append(`
                <tr>
                    <td>${state.name}</td>
                    <td>${state.abbr}</td>
                    <td>${state.capital}</td>
                    <td>${state.ev}</td>
                </tr>
            `);
        });
    }

    window.sortStates = function (key) {
        if (currentSort.key === key) {
            currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.key = key;
            currentSort.order = 'asc';
        }
    
        statesOrder.sort((a, b) => {
            const orderMultiplier = currentSort.order === 'asc' ? 1 : -1;
            if (a[key] < b[key]) return -1 * orderMultiplier;
            if (a[key] > b[key]) return 1 * orderMultiplier;
            return 0;
        });
    
        makeStates(statesOrder);
    };

    loadStates();
});