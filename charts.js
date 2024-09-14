document.addEventListener("DOMContentLoaded", function() {
    console.log("Charts.js loaded");
    createAnnualChart();
    createWeeklyChart();
});

function createAnnualChart() {
    console.log("Creating annual chart");
    const chart = document.querySelector('.annual-chart');
    if (!chart) {
        console.error("Annual chart container not found");
        return;
    }
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const sports = ['Indoor Soccer / Futsal', 'Outdoor Soccer', 'Judo', 'Flag Football', 'Roller Hockey'];
    
    // Add headers
    chart.innerHTML = '<div class="header"></div>' + months.map(month => `<div class="header" colspan="2">${month}</div>`).join('');
    
    // Add rows
    sports.forEach(sport => {
        chart.innerHTML += `<div class="header">${sport}</div>` + '0'.repeat(24).split('').map(() => '<div></div>').join('');
    });
    
    // Color the cells
    colorCells('.annual-chart', [
        { sport: 'Indoor Soccer / Futsal', periods: [1,2,3,4,5,6,7,8,9,14,15,16,17,18,19,20,21] },
        { sport: 'Outdoor Soccer', periods: [0,1,10,11,12,13,14,21,22,23] },
        { sport: 'Judo', periods: [1,2,3,4,5,6,7,8,9,14,15,16,17,18,19,20,21] },
        { sport: 'Flag Football', periods: [10,11,12,13] },
        { sport: 'Roller Hockey', periods: [0,20,21,22,23] }
    ]);
}

function createWeeklyChart() {
    console.log("Creating weekly chart");
    const chart = document.querySelector('.weekly-chart');
    if (!chart) {
        console.error("Weekly chart container not found");
        return;
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    
    // Add headers
    chart.innerHTML = '<div class="header"></div>' + days.map(day => `<div class="header">${day}</div>`).join('');
    
    // Add rows
    seasons.forEach(season => {
        chart.innerHTML += `<div class="header">${season}</div>` + '0'.repeat(7).split('').map(() => '<div></div>').join('');
    });
    
    // Color the cells
    colorCells('.weekly-chart', [
        { sport: 'Indoor Soccer', cells: ['Winter-Sunday', 'Winter-Friday', 'Summer-Sunday', 'Summer-Friday'] },
        { sport: 'Outdoor Soccer', cells: ['Spring-Wednesday', 'Spring-Saturday', 'Fall-Sunday', 'Fall-Wednesday'] },
        { sport: 'Judo', cells: ['Winter-Wednesday', 'Summer-Wednesday'] },
        { sport: 'Flag Football', cells: ['Spring-Sunday', 'Spring-Thursday'] },
        { sport: 'Roller Hockey', cells: ['Fall-Tuesday', 'Fall-Saturday'] }
    ]);
}

function colorCells(chartSelector, data) {
    const cells = document.querySelectorAll(`${chartSelector} > div:not(.header)`);
    const sports = ['Indoor Soccer / Futsal', 'Outdoor Soccer', 'Judo', 'Flag Football', 'Roller Hockey'];
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    data.forEach(item => {
        let sportClass = item.sport.toLowerCase().replace(/\s*\/\s*/g, '-').replace(/\s+/g, '-');
        if (item.sport === 'Indoor Soccer') {
            sportClass = 'indoor-soccer-futsal'; // Use the same class as "Indoor Soccer / Futsal"
        }
        if (item.periods) {
            const rowIndex = sports.indexOf(item.sport);
            item.periods.forEach(period => {
                const cellIndex = 24 * rowIndex + period;
                if (cells[cellIndex]) {
                    cells[cellIndex].classList.add(sportClass);
                } else {
                    console.error(`Cell not found for sport ${item.sport} at period ${period}`);
                }
            });
        } else if (item.cells) {
            item.cells.forEach(cell => {
                const [season, day] = cell.split('-');
                const rowIndex = seasons.indexOf(season);
                const cellIndex = 7 * rowIndex + days.indexOf(day); // Adjusted to 7 columns per row
                if (cells[cellIndex]) {
                    cells[cellIndex].classList.add(sportClass);
                    cells[cellIndex].innerText = item.sport; // Add sport name to the cell
                    cells[cellIndex].style.color = 'white'; // Set text color to white
                } else {
                    console.error(`Cell not found for ${cell}`);
                }
            });
        }
    });
}