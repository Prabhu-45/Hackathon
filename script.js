// Defense Drone Command Dashboard JavaScript

// Global variables
let map;
let alertCounter = 0;
let markerCounter = 0;
let systemTimeInterval;

// Sample data
const alertTypes = [
    {
        type: 'critical',
        icon: '🔴',
        messages: [
            'Intruder detected at Border Sector-7',
            'Hostile UAV approaching Airbase',
            'Unauthorized vehicle at Checkpoint Alpha',
            'Suspicious activity at Perimeter Fence',
            'Unknown aircraft in restricted airspace'
        ]
    },
    {
        type: 'warning',
        icon: '🟠',
        messages: [
            'Suspicious boat spotted at Coastline',
            'Movement detected in restricted zone',
            'Unidentified object near Base Camp',
            'Anomaly detected in thermal imaging',
            'Communication interference detected'
        ]
    },
    {
        type: 'info',
        icon: '🔵',
        messages: [
            'Drone battery low - returning to base',
            'Weather conditions deteriorating',
            'New patrol route assigned',
            'System maintenance scheduled',
            'Backup communication activated'
        ]
    }
];

const soldiers = [
    {
        id: 1,
        name: 'Sgt. John Mitchell',
        status: 'active',
        location: 'Sector-7',
        lastSeen: '2 min ago'
    },
    {
        id: 2,
        name: 'Cpl. Sarah Chen',
        status: 'warning',
        location: 'Checkpoint Alpha',
        lastSeen: '5 min ago'
    },
    {
        id: 3,
        name: 'Pvt. Mike Rodriguez',
        status: 'danger',
        location: 'Perimeter Fence',
        lastSeen: '1 min ago'
    },
    {
        id: 4,
        name: 'Lt. Emma Thompson',
        status: 'active',
        location: 'Command Center',
        lastSeen: '30 sec ago'
    },
    {
        id: 5,
        name: 'Sgt. David Park',
        status: 'warning',
        location: 'Coastline Watch',
        lastSeen: '3 min ago'
    }
];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeAlerts();
    initializeSoldiers();
    initializeDroneStatus();
    initializeSystemTime();
    startSimulations();
});

// Initialize Leaflet map
function initializeMap() {
    // Initialize map centered on India
    map = L.map('map').setView([20.5937, 78.9629], 5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add initial markers
    addRandomMarkers(3);
}

// Add random markers to map
function addRandomMarkers(count) {
    const indiaBounds = {
        north: 37.1,
        south: 6.5,
        east: 97.4,
        west: 68.2
    };
    
    for (let i = 0; i < count; i++) {
        const lat = indiaBounds.south + Math.random() * (indiaBounds.north - indiaBounds.south);
        const lng = indiaBounds.west + Math.random() * (indiaBounds.east - indiaBounds.west);
        
        const marker = L.marker([lat, lng], {
            icon: L.divIcon({
                className: 'custom-marker',
                html: '<div style="background: red; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px red;"></div>',
                iconSize: [20, 20]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <div style="color: #000;">
                <h6>🚨 Threat Detected</h6>
                <p><strong>Type:</strong> Intruder detected</p>
                <p><strong>Count:</strong> ${Math.floor(Math.random() * 3) + 1} persons</p>
                <p><strong>Equipment:</strong> Night Vision</p>
                <p><strong>Location:</strong> Sector-${Math.floor(Math.random() * 10) + 1}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
            </div>
        `);
        
        markerCounter++;
    }
}

// Initialize alerts system
function initializeAlerts() {
    const alertsContainer = document.getElementById('alertsContainer');
    
    // Add initial alerts
    for (let i = 0; i < 3; i++) {
        addRandomAlert();
    }
}

// Add random alert
function addRandomAlert() {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const message = alertType.messages[Math.floor(Math.random() * alertType.messages.length)];
    const timestamp = new Date().toLocaleTimeString();
    
    const alertElement = document.createElement('div');
    alertElement.className = `alert-item alert-${alertType.type} fade-in`;
    alertElement.innerHTML = `
        <div class="d-flex align-items-start">
            <span class="me-2" style="font-size: 1.2rem;">${alertType.icon}</span>
            <div class="flex-grow-1">
                <div class="fw-bold">${message}</div>
                <div class="alert-time">${timestamp}</div>
            </div>
        </div>
    `;
    
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.insertBefore(alertElement, alertsContainer.firstChild);
    
    // Remove old alerts if more than 10
    const alerts = alertsContainer.querySelectorAll('.alert-item');
    if (alerts.length > 10) {
        alerts[alerts.length - 1].remove();
    }
    
    alertCounter++;
}

// Initialize soldiers panel
function initializeSoldiers() {
    const soldiersList = document.getElementById('soldiersList');
    
    // Clear existing content
    soldiersList.innerHTML = '';
    
    soldiers.forEach(soldier => {
        const soldierElement = document.createElement('div');
        soldierElement.className = 'soldier-item';
        soldierElement.innerHTML = `
            <div class="soldier-header">
                <div class="soldier-name">
                    <span class="status-indicator status-${soldier.status}"></span>
                    ${soldier.name}
                </div>
            </div>
            <div class="soldier-info">
                <div><strong>Location:</strong> ${soldier.location}</div>
                <div><strong>Last Seen:</strong> ${soldier.lastSeen}</div>
                <div><strong>Health:</strong> ${soldier.health}%</div>
                <div><strong>Equipment:</strong> ${soldier.equipment.join(', ')}</div>
            </div>
            <button class="support-btn" onclick="sendDroneSupport(${soldier.id})">
                <i class="fas fa-paper-plane me-1"></i>Send Drone Support
            </button>
        `;
        
        soldiersList.appendChild(soldierElement);
    });
}

// Send drone support
function sendDroneSupport(soldierId) {
    const soldier = soldiers.find(s => s.id === soldierId);
    if (soldier) {
        // Show confirmation popup
        const modal = document.createElement('div');
        modal.className = 'modal fade show';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content military-card">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-check-circle text-success me-2"></i>
                            Drone Support Dispatched
                        </h5>
                        <button type="button" class="btn-close" onclick="closeModal(this)"></button>
                    </div>
                    <div class="modal-body">
                        <p>✅ Drone dispatched with medical kit to <strong>${soldier.name}</strong></p>
                        <p>📍 Location: ${soldier.location}</p>
                        <p>⏱️ ETA: ${Math.floor(Math.random() * 5) + 2} minutes</p>
                        <div class="loading-container text-center mt-3">
                            <div class="loading"></div>
                            <span class="ms-2">Dispatching...</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="closeModal(this)">Acknowledged</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 3000);
    }
}

// Close modal
function closeModal(button) {
    const modal = button.closest('.modal');
    modal.remove();
}

// Initialize drone status updates
function initializeDroneStatus() {
    updateDroneStatus();
}

// Update drone status
function updateDroneStatus() {
    const batteryElement = document.getElementById('batteryLevel');
    const altitudeElement = document.getElementById('altitude');
    const gpsElement = document.getElementById('gpsLocation');
    
    // Simulate battery drain
    let battery = parseInt(batteryElement.textContent);
    battery = Math.max(20, battery - Math.floor(Math.random() * 3));
    batteryElement.textContent = battery + '%';
    
    // Update battery color based on level
    const batteryIcon = batteryElement.parentElement.querySelector('i');
    if (battery < 30) {
        batteryIcon.className = 'fas fa-battery-quarter text-danger';
    } else if (battery < 60) {
        batteryIcon.className = 'fas fa-battery-half text-warning';
    } else {
        batteryIcon.className = 'fas fa-battery-three-quarters text-success';
    }
    
    // Simulate altitude changes
    const altitude = 1000 + Math.floor(Math.random() * 500);
    altitudeElement.textContent = altitude.toLocaleString() + 'm';
    
    // Simulate GPS movement
    const baseLat = 28.6139 + (Math.random() - 0.5) * 0.1;
    const baseLng = 77.2090 + (Math.random() - 0.5) * 0.1;
    gpsElement.textContent = `${baseLat.toFixed(4)}°N, ${baseLng.toFixed(4)}°E`;
}

// Initialize system time
function initializeSystemTime() {
    updateSystemTime();
    systemTimeInterval = setInterval(updateSystemTime, 1000);
}

// Update system time
function updateSystemTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const systemTimeElement = document.getElementById('systemTime');
    if (systemTimeElement) {
        systemTimeElement.textContent = timeString;
    }
}

// Start all simulations
function startSimulations() {
    // Add new alerts every 5 seconds
    setInterval(addRandomAlert, 5000);
    
    // Add new map markers every 10 seconds
    setInterval(() => addRandomMarkers(1), 10000);
    
    // Update drone status every 3 seconds
    setInterval(updateDroneStatus, 3000);
    
    // Update soldier statuses every 15 seconds
    setInterval(updateSoldierStatuses, 15000);
}

// Update soldier statuses
function updateSoldierStatuses() {
    const soldierItems = document.querySelectorAll('.soldier-item');
    
    soldierItems.forEach((item, index) => {
        const soldier = soldiers[index];
        if (soldier) {
            // Randomly change status
            const statuses = ['active', 'warning', 'danger'];
            const currentStatus = soldier.status;
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            if (newStatus !== currentStatus) {
                soldier.status = newStatus;
                
                // Update status indicator
                const statusIndicator = item.querySelector('.status-indicator');
                statusIndicator.className = `status-indicator status-${newStatus}`;
                
                // Update last seen time
                const lastSeenElement = item.querySelector('.soldier-info div:last-child');
                lastSeenElement.innerHTML = `<strong>Last Seen:</strong> ${Math.floor(Math.random() * 5) + 1} min ago`;
            }
        }
    });
}

// Add CSS for modal
const modalCSS = `
.modal {
    background: rgba(0, 0, 0, 0.8);
    z-index: 9999;
}

.modal-content {
    background: var(--card-bg);
    border: 1px solid var(--primary-color);
    color: var(--text-light);
}

.modal-header {
    border-bottom: 1px solid var(--border-color);
}

.modal-footer {
    border-top: 1px solid var(--border-color);
}

.btn-close {
    filter: invert(1);
}

.custom-marker {
    background: transparent !important;
    border: none !important;
}
`;

// Add modal CSS to head
const style = document.createElement('style');
style.textContent = modalCSS;
document.head.appendChild(style);

// Add some additional visual effects
function addVisualEffects() {
    // Add glow effect to critical alerts
    const criticalAlerts = document.querySelectorAll('.alert-critical');
    criticalAlerts.forEach(alert => {
        alert.style.animation = 'pulse 1s infinite';
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.military-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize visual effects
document.addEventListener('DOMContentLoaded', addVisualEffects);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'A' to add a random alert
    if (e.key === 'a' || e.key === 'A') {
        addRandomAlert();
    }
    
    // Press 'M' to add a random marker
    if (e.key === 'm' || e.key === 'M') {
        addRandomMarkers(1);
    }
    
    // Press 'R' to refresh drone status
    if (e.key === 'r' || e.key === 'R') {
        updateDroneStatus();
    }
});

// Add console welcome message
console.log(`
🚁 DefenseHack 2025 - Drone Command Center
==========================================
Welcome to the AI-Powered Defense Dashboard!

Keyboard Shortcuts:
- Press 'A' to add a random alert
- Press 'M' to add a random map marker  
- Press 'R' to refresh drone status

System Status: ✅ Online
Mission: DEF-OPS-2025
`);

// Navigation functionality
function showPage(pageName) {
    // This function is called from navigation links
    // In a real application, this would handle page routing
    console.log(`Navigating to ${pageName} page`);
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (systemTimeInterval) {
        clearInterval(systemTimeInterval);
    }
});
