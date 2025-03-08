// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vanta background
    VANTA.CELLS({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        color1: 0x045034,
        color2: 0x109963,
        size: 0.20,
        speed: 0.00
    });
    
    // Check if user is logged in as admin
    if (!isUserLoggedIn() || getCurrentUser().role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Display admin information
    const adminUser = getCurrentUser();
    document.getElementById('admin-name').textContent = adminUser.name;
    
    // Set up logout functionality
    document.getElementById('logout-btn').addEventListener('click', logoutUser);
    
    // Initialize admin dashboard components
    loadEvents();
    loadPlayers();
    loadTrainingSessions();
    loadDevelopmentNotes();
    
    // Navigation handling
    const navLinks = document.querySelectorAll('.admin-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Event creation modal
    const createEventBtn = document.getElementById('create-event');
    const eventModal = document.getElementById('event-modal');
    const closeModal = eventModal.querySelector('.close-modal');
    
    createEventBtn.addEventListener('click', function() {
        eventModal.classList.remove('hidden');
        // Populate event form with dates, etc.
        populateEventForm();
    });
    
    closeModal.addEventListener('click', function() {
        eventModal.classList.add('hidden');
    });
    
    // Event form submission
    document.getElementById('event-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const eventData = {
            id: Date.now().toString(),
            title: formData.get('event-title'),
            start: new Date(formData.get('event-date') + 'T' + formData.get('event-start-time')),
            end: new Date(formData.get('event-date') + 'T' + formData.get('event-end-time')),
            location: formData.get('event-location'),
            category: formData.get('event-category'),
            description: formData.get('event-description'),
            targetPlayers: Array.from(document.querySelectorAll('input[name="target-players"]:checked')).map(cb => cb.value),
            createdAt: new Date().toISOString(),
            createdBy: getCurrentUser().id
        };
        
        // Add event to storage
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(eventData);
        localStorage.setItem('events', JSON.stringify(events));
        
        // Close modal and refresh events list
        eventModal.classList.add('hidden');
        loadEvents();
        
        // Show success message
        alert('Event created successfully!');
    });
});

// Load events from storage or create sample data
function loadEvents() {
    let events = JSON.parse(localStorage.getItem('events'));
    
    if (!events || events.length === 0) {
        events = createSampleEvents();
    }
    
    // Populate events table
    const tableBody = document.querySelector('#events-table tbody');
    tableBody.innerHTML = '';
    
    events.forEach(event => {
        const row = document.createElement('tr');
        
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        
        row.innerHTML = `
            <td>${startDate.toLocaleDateString()}</td>
            <td>${startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
            <td>${event.title}</td>
            <td>${event.location}</td>
            <td>${event.category}</td>
            <td>${event.targetPlayers.length > 0 ? event.targetPlayers.length + ' players' : 'All players'}</td>
            <td>
                <button class="edit-event-btn" data-id="${event.id}"><i class="fas fa-edit"></i></button>
                <button class="delete-event-btn" data-id="${event.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-event-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-id');
            editEvent(eventId);
        });
    });
    
    document.querySelectorAll('.delete-event-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this event?')) {
                deleteEvent(eventId);
            }
        });
    });
}

// Create sample events for demo purposes
function createSampleEvents() {
    const today = new Date();
    
    const events = [
        {
            id: '1',
            title: 'Small Group Training',
            start: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
            end: new Date(today.getTime() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour later
            location: 'XL Apex',
            category: 'Small Group',
            description: 'Focus on dribbling skills and shooting techniques',
            targetPlayers: ['player1', 'player2', 'player3'],
            createdAt: new Date().toISOString(),
            createdBy: 'admin'
        },
        {
            id: '2',
            title: 'Flag Football Practice',
            start: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            end: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000), // 1.5 hours later
            location: 'XL Apex',
            category: 'Flag Football',
            description: 'Team practice with focus on offensive strategies',
            targetPlayers: [],
            createdAt: new Date().toISOString(),
            createdBy: 'admin'
        }
    ];
    
    localStorage.setItem('events', JSON.stringify(events));
    
    return events;
}

// Load player data from storage or create sample data
function loadPlayers() {
    // Implementation for player management component
}

// Load training sessions from storage or create sample data
function loadTrainingSessions() {
    // Implementation for training sessions component
}

// Load development notes from storage or create sample data
function loadDevelopmentNotes() {
    // Implementation for development notes component
}

// Populate event form for creation/editing
function populateEventForm() {
    const playersList = document.querySelector('#target-players-list');
    playersList.innerHTML = '';
    
    // Get all players from storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const players = [];
    
    // Extract players from users
    users.forEach(user => {
        if (user.players && user.players.length > 0) {
            user.players.forEach(player => {
                players.push({
                    id: player.id,
                    name: `${player.firstName} ${player.lastName}`
                });
            });
        }
    });
    
    // If no players, add sample data
    if (players.length === 0) {
        const samplePlayers = [
            { id: 'player1', name: 'Logan Smith' },
            { id: 'player2', name: 'Elliot Johnson' },
            { id: 'player3', name: 'Cooper Williams' },
            { id: 'player4', name: 'Kabir Patel' },
            { id: 'player5', name: 'Rayyan Ahmad' }
        ];
        
        samplePlayers.forEach(player => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'checkbox-option';
            checkboxDiv.innerHTML = `
                <input type="checkbox" id="player-${player.id}" name="target-players" value="${player.id}">
                <label for="player-${player.id}">${player.name}</label>
            `;
            playersList.appendChild(checkboxDiv);
        });
    } else {
        players.forEach(player => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'checkbox-option';
            checkboxDiv.innerHTML = `
                <input type="checkbox" id="player-${player.id}" name="target-players" value="${player.id}">
                <label for="player-${player.id}">${player.name}</label>
            `;
            playersList.appendChild(checkboxDiv);
        });
    }
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('event-date').valueAsDate = tomorrow;
}

// Edit an existing event
function editEvent(eventId) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        alert('Event not found');
        return;
    }
    
    // Show modal
    const eventModal = document.getElementById('event-modal');
    eventModal.classList.remove('hidden');
    
    // Populate form with event data
    const form = document.getElementById('event-form');
    form.querySelector('#event-title').value = event.title;
    
    const startDate = new Date(event.start);
    form.querySelector('#event-date').valueAsDate = startDate;
    
    const startTime = startDate.toTimeString().substring(0, 5);
    form.querySelector('#event-start-time').value = startTime;
    
    const endTime = new Date(event.end).toTimeString().substring(0, 5);
    form.querySelector('#event-end-time').value = endTime;
    
    form.querySelector('#event-location').value = event.location;
    form.querySelector('#event-category').value = event.category;
    form.querySelector('#event-description').value = event.description || '';
    
    // Set target players checkboxes
    document.querySelectorAll('input[name="target-players"]').forEach(checkbox => {
        checkbox.checked = event.targetPlayers.includes(checkbox.value);
    });
    
    // Update form submission to handle edit
    form.setAttribute('data-mode', 'edit');
    form.setAttribute('data-event-id', eventId);
}

// Delete an event
function deleteEvent(eventId) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Remove the event
    events = events.filter(event => event.id !== eventId);
    
    // Save updated events
    localStorage.setItem('events', JSON.stringify(events));
    
    // Reload events list
    loadEvents();
} 