document.addEventListener("DOMContentLoaded", function() {
    // Initialize VANTA background
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
        speed: 0.00,
    });
    
    // Check if user is logged in
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/invite.html';
        return;
    }
    
    // Load player info
    const inviteCode = localStorage.getItem('inviteCode');
    if (inviteCode) {
        loadPlayerInfo(inviteCode);
    }
    
    // Navigation handling
    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            document.querySelectorAll('.main-content section').forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show target section
            document.getElementById(targetId).classList.add('active-section');
            
            // Update active nav link
            document.querySelectorAll('.sidebar nav li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            const filter = this.getAttribute('data-filter');
            filterEvents(filter);
        });
    });
    
    // Load events
    loadEvents();
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('inviteCode');
        window.location.href = '/';
    });
});

function loadPlayerInfo(inviteCode) {
    const player = getPlayerByCode(inviteCode);
    if (player) {
        document.getElementById('player-name').textContent = player.fullName;
    }
}

function loadEvents() {
    // This would typically fetch from a database
    // For now, we'll use sample data
    const events = [
        {
            id: 1,
            title: 'Small Group Training',
            date: '2024-03-14',
            time: '5:00 PM - 6:00 PM',
            location: 'XL Sports World Apex',
            type: 'small-group',
            players: ['AHRIK2025', 'RAYYAN2025', 'ELLIOT2025']
        },
        {
            id: 2,
            title: 'Flag Football Practice',
            date: '2024-03-12',
            time: '6:30 PM - 7:30 PM',
            location: 'XL Sports World Apex',
            type: 'flag-football',
            players: ['ALL']
        },
        {
            id: 3,
            title: 'Soccer Scrimmage',
            date: '2024-03-12',
            time: '7:30 PM - 8:15 PM',
            location: 'XL Sports World Apex',
            type: 'outdoor-soccer',
            players: ['ALL']
        }
    ];
    
    // Populate events list
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';
    
    const inviteCode = localStorage.getItem('inviteCode');
    const playerEvents = events.filter(event => 
        event.players.includes('ALL') || event.players.includes(inviteCode)
    );
    
    if (playerEvents.length === 0) {
        eventsList.innerHTML = '<li class="no-events">No upcoming events</li>';
        return;
    }
    
    playerEvents.forEach(event => {
        const li = document.createElement('li');
        li.className = `event-item ${event.type}`;
        li.innerHTML = `
            <div class="event-date">${formatDate(event.date)}</div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p>${event.time} at ${event.location}</p>
                <div class="event-actions">
                    <button class="btn-availability" data-event-id="${event.id}">Update Availability</button>
                </div>
            </div>
        `;
        eventsList.appendChild(li);
    });
    
    // Add event listeners to availability buttons
    document.querySelectorAll('.btn-availability').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            showAvailabilityModal(eventId);
        });
    });
}

function filterEvents(filter) {
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function showAvailabilityModal(eventId) {
    // Create and show availability modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Update Availability</h3>
            <form id="availability-form">
                <input type="hidden" name="eventId" value="${eventId}">
                <div class="radio-group">
                    <label>
                        <input type="radio" name="availability" value="available" checked>
                        Available
                    </label>
                    <label>
                        <input type="radio" name="availability" value="maybe">
                        Maybe
                    </label>
                    <label>
                        <input type="radio" name="availability" value="unavailable">
                        Unavailable
                    </label>
                </div>
                <div class="form-group">
                    <label for="availability-note">Note (optional):</label>
                    <textarea id="availability-note" name="note"></textarea>
                </div>
                <button type="submit" class="btn-submit">Save</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking X or outside
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Handle form submission
    modal.querySelector('#availability-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateAvailability(
            formData.get('eventId'),
            formData.get('availability'),
            formData.get('note')
        );
        document.body.removeChild(modal);
    });
}

function updateAvailability(eventId, status, note) {
    // This would typically send data to a server
    console.log(`Updating availability for event ${eventId}: ${status} - ${note}`);
    
    // For demo purposes, show a success message
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Availability updated successfully!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

// Add to dashboard.js

// Initialize small group training section
function initSmallGroupSection() {
    const smallGroupSection = document.getElementById('small-group');
    smallGroupSection.innerHTML = `
        <h2>Small Group Training</h2>
        
        <div class="tabs">
            <button class="tab-btn active" data-tab="upcoming">My Sessions</button>
            <button class="tab-btn" data-tab="schedule">Master Schedule</button>
            <button class="tab-btn" data-tab="credits">Training Credits</button>
        </div>
        
        <div class="tab-content active" id="upcoming-tab">
            <h3>My Upcoming Sessions</h3>
            <ul id="my-sessions-list">
                <!-- Will be populated by JavaScript -->
            </ul>
        </div>
        
        <div class="tab-content" id="schedule-tab">
            <h3>Master Schedule</h3>
            <p>Select a date to view available sessions:</p>
            <input type="date" id="session-date-picker">
            <div class="sessions-grid" id="available-sessions">
                <!-- Will be populated by JavaScript -->
            </div>
        </div>
        
        <div class="tab-content" id="credits-tab">
            <h3>Training Credits</h3>
            <div class="credits-info">
                <p>Available Credits: <span id="available-credits">0</span></p>
                <button id="request-credit-btn">Request to Use Credit</button>
            </div>
            <div class="credit-history">
                <h4>Credit History</h4>
                <ul id="credit-history-list">
                    <!-- Will be populated by JavaScript -->
                </ul>
            </div>
        </div>
    `;
    
    // Tab switching functionality
    const tabButtons = smallGroupSection.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab') + '-tab';
            smallGroupSection.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            
            // Load data for the selected tab
            if (tabId === 'schedule-tab') {
                loadMasterSchedule();
            } else if (tabId === 'credits-tab') {
                loadCreditHistory();
            }
        });
    });
    
    // Date picker for master schedule
    const datePicker = document.getElementById('session-date-picker');
    datePicker.valueAsDate = new Date();
    datePicker.addEventListener('change', function() {
        loadMasterSchedule(this.value);
    });
    
    // Request credit button
    document.getElementById('request-credit-btn').addEventListener('click', showCreditRequestModal);
    
    // Load initial data
    loadMySmallGroupSessions();
}

function loadMySmallGroupSessions() {
    // This would typically fetch from a database
    // For now, we'll use sample data
    const sessions = [
        {
            id: 101,
            date: '2024-03-15',
            time: '5:00 PM - 6:00 PM',
            location: 'XL Sports World Apex',
            coach: 'Coach Brett',
            players: ['AHRIK2025', 'RAYYAN2025', 'ELLIOT2025', 'COOPER2025']
        },
        {
            id: 102,
            date: '2024-03-22',
            time: '5:00 PM - 6:00 PM',
            location: 'Hunter Street Park',
            coach: 'Coach Brett',
            players: ['AHRIK2025', 'RAYYAN2025', 'ELLIOT2025', 'COOPER2025']
        }
    ];
    
    const sessionsList = document.getElementById('my-sessions-list');
    sessionsList.innerHTML = '';
    
    const inviteCode = localStorage.getItem('inviteCode');
    const playerSessions = sessions.filter(session => 
        session.players.includes(inviteCode)
    );
    
    if (playerSessions.length === 0) {
        sessionsList.innerHTML = '<li class="no-sessions">No upcoming small group sessions</li>';
        return;
    }
    
    playerSessions.forEach(session => {
        const li = document.createElement('li');
        li.className = 'session-item';
        li.innerHTML = `
            <div class="session-date">${formatDate(session.date)}</div>
            <div class="session-details">
                <h4>Small Group Training</h4>
                <p>${session.time} at ${session.location}</p>
                <p>Coach: ${session.coach}</p>
                <div class="session-actions">
                    <button class="btn-reschedule" data-session-id="${session.id}">Request Reschedule</button>
                    <button class="btn-cancel" data-session-id="${session.id}">Cancel</button>
                </div>
            </div>
        `;
        sessionsList.appendChild(li);
    });
    
    // Add event listeners
    document.querySelectorAll('.btn-reschedule').forEach(button => {
        button.addEventListener('click', function() {
            const sessionId = this.getAttribute('data-session-id');
            showRescheduleModal(sessionId);
        });
    });
    
    document.querySelectorAll('.btn-cancel').forEach(button => {
        button.addEventListener('click', function() {
            const sessionId = this.getAttribute('data-session-id');
            showCancelConfirmation(sessionId);
        });
    });
}

function loadMasterSchedule(date = new Date().toISOString().split('T')[0]) {
    // This would typically fetch from a database
    // For now, we'll use sample data
    const allSessions = [
        {
            id: 101,
            date: '2024-03-15',
            time: '5:00 PM - 6:00 PM',
            location: 'XL Sports World Apex',
            coach: 'Coach Brett',
            players: ['AHRIK2025', 'RAYYAN2025', 'ELLIOT2025', 'COOPER2025'],
            maxPlayers: 6,
            available: 2
        },
        {
            id: 103,
            date: '2024-03-15',
            time: '6:00 PM - 7:00 PM',
            location: 'XL Sports World Apex',
            coach: 'Coach Brett',
            players: ['LOGAN2025', 'KABIR2025', 'SERGEI2025'],
            maxPlayers: 6,
            available: 3
        },
        {
            id: 104,
            date: '2024-03-16',
            time: '10:00 AM - 11:00 AM',
            location: 'Hunter Street Park',
            coach: 'Coach Brett',
            players: ['ERIC2025', 'JERRY2025', 'JAXON2025'],
            maxPlayers: 6,
            available: 3
        }
    ];
    
    const sessionsGrid = document.getElementById('available-sessions');
    sessionsGrid.innerHTML = '';
    
    // Filter sessions for the selected date
    const dateSessions = allSessions.filter(session => session.date === date);
    
    if (dateSessions.length === 0) {
        sessionsGrid.innerHTML = '<p class="no-sessions">No sessions scheduled for this date</p>';
        return;
    }
    
    dateSessions.forEach(session => {
        const sessionCard = document.createElement('div');
        sessionCard.className = 'session-card';
        
        // Check if current player is in this session
        const inviteCode = localStorage.getItem('inviteCode');
        const isPlayerSession = session.players.includes(inviteCode);
        
        sessionCard.innerHTML = `
            <h4>${session.time}</h4>
            <p>Location: ${session.location}</p>
            <p>Coach: ${session.coach}</p>
            <p>Availability: ${session.available} spots left</p>
            <div class="session-actions">
                ${isPlayerSession ? 
                    '<span class="enrolled-badge">You are enrolled</span>' : 
                    `<button class="btn-request-swap" data-session-id="${session.id}">Request Swap</button>`
                }
            </div>
        `;
        sessionsGrid.appendChild(sessionCard);
    });
    
    // Add event listeners
    document.querySelectorAll('.btn-request-swap').forEach(button => {
        button.addEventListener('click', function() {
            const sessionId = this.getAttribute('data-session-id');
            showSwapRequestModal(sessionId);
        });
    });
}

function loadCreditHistory() {
    // This would typically fetch from a database
    // For now, we'll use sample data
    const credits = [
        {
            id: 201,
            date: '2024-02-28',
            reason: 'Coach cancellation',
            status: 'available'
        }
    ];
    
    document.getElementById('available-credits').textContent = credits.filter(c => c.status === 'available').length;
    
    const historyList = document.getElementById('credit-history-list');
    historyList.innerHTML = '';
    
    if (credits.length === 0) {
        historyList.innerHTML = '<li class="no-credits">No credit history</li>';
        return;
    }
    
    credits.forEach(credit => {
        const li = document.createElement('li');
        li.className = `credit-item ${credit.status}`;
        li.innerHTML = `
            <div class="credit-date">${formatDate(credit.date)}</div>
            <div class="credit-details">
                <p>${credit.reason}</p>
                <p class="credit-status">Status: ${credit.status.charAt(0).toUpperCase() + credit.status.slice(1)}</p>
            </div>
        `;
        historyList.appendChild(li);
    });
}

function showRescheduleModal(sessionId) {
    // Create and show reschedule modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Request Reschedule</h3>
            <p>Select a new date and time for your small group training:</p>
            <form id="reschedule-form">
                <input type="hidden" name="sessionId" value="${sessionId}">
                <div class="form-group">
                    <label for="reschedule-date">New Date:</label>
                    <input type="date" id="reschedule-date" name="newDate" required>
                </div>
                <div class="form-group">
                    <label for="reschedule-time">Preferred Time:</label>
                    <select id="reschedule-time" name="newTime" required>
                        <option value="">Select a time</option>
                        <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                        <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                        <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="reschedule-note">Note (optional):</label>
                    <textarea id="reschedule-note" name="note"></textarea>
                </div>
                <button type="submit" class="btn-submit">Submit Request</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    modal.querySelector('#reschedule-date').valueAsDate = tomorrow;
    
    // Close modal when clicking X or outside
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Handle form submission
    modal.querySelector('#reschedule-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        requestReschedule(
            formData.get('sessionId'),
            formData.get('newDate'),
            formData.get('newTime'),
            formData.get('note')
        );
        document.body.removeChild(modal);
    });
}

function showSwapRequestModal(sessionId) {
    // Create and show swap request modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Request Session Swap</h3>
            <p>You are requesting to swap to this session. Please select which of your current sessions you would like to swap from:</p>
            <form id="swap-form">
                <input type="hidden" name="toSessionId" value="${sessionId}">
                <div class="form-group">
                    <label for="from-session">Swap from:</label>
                    <select id="from-session" name="fromSessionId" required>
                        <option value="">Select a session</option>
                        <!-- Will be populated by JavaScript -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="swap-note">Note (optional):</label>
                    <textarea id="swap-note" name="note"></textarea>
                </div>
                <button type="submit" class="btn-submit">Submit Request</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Populate the from-session dropdown
    const fromSessionSelect = modal.querySelector('#from-session');
    
    // This would typically fetch from a database
    // For now, we'll use sample data
    const playerSessions = [
        {
            id: 101,
            date: '2024-03-15',
            time: '5:00 PM - 6:00 PM',
            location: 'XL Sports World Apex'
        },
        {
            id: 102,
            date: '2024-03-22',
            time: '5:00 PM - 6:00 PM',
            location: 'Hunter Street Park'
        }
    ];
    
    playerSessions.forEach(session => {
        const option = document.createElement('option');
        option.value = session.id;
        option.textContent = `${formatDate(session.date)}, ${session.time} at ${session.location}`;
        fromSessionSelect.appendChild(option);
    });
    
    // Close modal when clicking X or outside
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Handle form submission
    modal.querySelector('#swap-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        requestSwap(
            formData.get('toSessionId'),
            formData.get('fromSessionId'),
            formData.get('note')
        );
        document.body.removeChild(modal);
    });
}

function requestSwap(toSessionId, fromSessionId, note) {
    // This would typically send data to a server
    console.log(`Requesting swap from session ${fromSessionId} to session ${toSessionId}: ${note}`);
    
    // For demo purposes, show a success message
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Swap request submitted successfully!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}