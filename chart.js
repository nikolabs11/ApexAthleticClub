document.addEventListener("DOMContentLoaded", function() {
    createAnnualChart();
    createWeeklyChart();
});

function createAnnualChart() {
    const chart = document.querySelector('.annual-chart');
    const months = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
    const sports = ['Indoor Soccer / Futsal', 'Outdoor Soccer', 'Judo', 'Flag Football', 'Roller Hockey'];
    
    // Add headers
    chart.innerHTML = '<div class="header"></div>' + months.map(month => `<div class="header">${month}</div>`).join('');
    
    // Add rows
    sports.forEach(sport => {
        chart.innerHTML += `<div class="header">${sport}</div>` + '0'.repeat(12).split('').map(() => '<div></div>').join('');
    });
    
    // Color the cells
    colorCells('.annual-chart', [
        { sport: 'Indoor Soccer / Futsal', months: [0,1,2,3,4,5,9,10,11] },
        { sport: 'Outdoor Soccer', months: [0,1,5,6,7,8,11] },
        { sport: 'Judo', months: [1,2,3,4,5,9,10,11] },
        { sport: 'Flag Football', months: [5,6,7,8] },
        { sport: 'Roller Hockey', months: [0,10,11] }
    ]);
}

function createWeeklyChart() {
    const chart = document.querySelector('.weekly-chart');
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
        const sportClass = item.sport.toLowerCase().replace(/ /g, '-');
        if (item.months) {
            item.months.forEach(month => {
                cells[13 * (sports.indexOf(item.sport) + 1) + month].classList.add(sportClass);
            });
        } else if (item.cells) {
            item.cells.forEach(cell => {
                const [season, day] = cell.split('-');
                const index = 8 * seasons.indexOf(season) + days.indexOf(day) + 1;
                cells[index].classList.add(sportClass);
            });
        }
    });
}