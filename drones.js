// Drones Management JavaScript

// Sample drone data
const drones = [
    {
        id: 'DRONE-001',
        name: 'Alpha-1',
        status: 'active',
        battery: 87,
        location: 'Sector-7',
        mission: 'Patrol',
        altitude: 1250,
        lastUpdate: '2 min ago'
    },
    {
        id: 'DRONE-002',
        name: 'Beta-2',
        status: 'warning',
        battery: 25,
        location: 'Checkpoint Alpha',
        mission: 'Surveillance',
        altitude: 800,
        lastUpdate: '1 min ago'
    },
    {
        id: 'DRONE-003',
        name: 'Gamma-3',
        status: 'active',
        battery: 92,
        location: 'Perimeter Fence',
        mission: 'Search & Rescue',
        altitude: 1500,
        lastUpdate: '30 sec ago'
    },
    {
        id: 'DRONE-004',
        name: 'Delta-4',
        status: 'maintenance',
        battery: 0,
        location: 'Base Station',
        mission: 'None',
        altitude: 0,
        lastUpdate: '5 min ago'
    },
    {
        id: 'DRONE-005',
        name: 'Echo-5',
        status: 'active',
        battery: 78,
        location: 'Coastline Watch',
        mission: 'Threat Assessment',
        altitude: 1100,
        lastUpdate: '1 min ago'
    },
    {
        id: 'DRONE-006',
        name: 'Foxtrot-6',
        status: 'returning',
        battery: 15,
        location: 'Sector-3',
        mission: 'Returning to Base',
        altitude: 600,
        lastUpdate: '45 sec ago'
    },
    {
        id: 'DRONE-007',
        name: 'Golf-7',
        status: 'active',
        battery: 95,
        location: 'Airbase Perimeter',
        mission: 'Patrol',
        altitude: 2000,
        lastUpdate: '1 min ago'
    },
    {
        id: 'DRONE-008',
        name: 'Hotel-8',
        status: 'emergency',
        battery: 5,
        location: 'Sector-9',
        mission: 'Emergency Landing',
        altitude: 200,
        lastUpdate: '30 sec ago'
    }
];

// Initialize drones page
document.addEventListener('DOMContentLoaded', function() {
    initializeDronePage();
    updateDroneStats();
    populateDroneTable();
    populateDroneSelect();
    startDroneUpdates();
});

// Initialize drone page
function initializeDronePage() {
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
}

// Update drone statistics
function updateDroneStats() {
    const activeDrones = drones.filter(d => d.status === 'active').length;
    const avgBattery = Math.round(drones.reduce((sum, d) => sum + d.battery, 0) / drones.length);
    const activeMissions = drones.filter(d => d.mission !== 'None' && d.status !== 'maintenance').length;
    const alerts = drones.filter(d => d.status === 'warning' || d.status === 'emergency').length;

    document.getElementById('activeDrones').textContent = activeDrones;
    document.getElementById('avgBattery').textContent = avgBattery + '%';
    document.getElementById('missions').textContent = activeMissions;
    document.getElementById('alerts').textContent = alerts;
}

// Populate drone table
function populateDroneTable() {
    const tbody = document.getElementById('droneTableBody');
    tbody.innerHTML = '';

    drones.forEach(drone => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${drone.id}</strong><br>
                <small class="text-muted">${drone.name}</small>
            </td>
            <td>
                <span class="status-badge status-${drone.status}">
                    ${getStatusText(drone.status)}
                </span>
            </td>
            <td>
                <div class="battery-indicator">
                    <i class="fas fa-battery-${getBatteryIcon(drone.battery)} text-${getBatteryColor(drone.battery)}"></i>
                    <span>${drone.battery}%</span>
                </div>
            </td>
            <td>${drone.location}</td>
            <td>${drone.mission}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-info btn-sm" onclick="viewDroneDetails('${drone.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-warning btn-sm" onclick="controlDrone('${drone.id}')" title="Control">
                        <i class="fas fa-gamepad"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="emergencyStop('${drone.id}')" title="Emergency Stop">
                        <i class="fas fa-stop"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate drone select dropdown
function populateDroneSelect() {
    const select = document.getElementById('droneSelect');
    select.innerHTML = '<option value="">Choose a drone...</option>';
    
    drones.filter(d => d.status === 'active').forEach(drone => {
        const option = document.createElement('option');
        option.value = drone.id;
        option.textContent = `${drone.id} - ${drone.name}`;
        select.appendChild(option);
    });
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'active': 'Active',
        'warning': 'Warning',
        'maintenance': 'Maintenance',
        'returning': 'Returning',
        'emergency': 'Emergency'
    };
    return statusMap[status] || status;
}

// Get battery icon
function getBatteryIcon(battery) {
    if (battery > 75) return 'three-quarters';
    if (battery > 50) return 'half';
    if (battery > 25) return 'quarter';
    return 'empty';
}

// Get battery color
function getBatteryColor(battery) {
    if (battery > 50) return 'success';
    if (battery > 25) return 'warning';
    return 'danger';
}

// Launch drone
function launchDrone() {
    const droneId = document.getElementById('droneSelect').value;
    const missionType = document.getElementById('missionType').value;
    const targetLat = document.getElementById('targetLat').value;
    const targetLng = document.getElementById('targetLng').value;

    if (!droneId) {
        showAlert('Please select a drone', 'warning');
        return;
    }

    const drone = drones.find(d => d.id === droneId);
    if (drone) {
        drone.mission = missionType;
        drone.status = 'active';
        
        addMissionLog(`Drone ${droneId} launched on ${missionType} mission`, 'success');
        showAlert(`Drone ${droneId} launched successfully`, 'success');
        
        populateDroneTable();
        updateDroneStats();
    }
}

// Return drone
function returnDrone() {
    const droneId = document.getElementById('droneSelect').value;
    
    if (!droneId) {
        showAlert('Please select a drone', 'warning');
        return;
    }

    const drone = drones.find(d => d.id === droneId);
    if (drone) {
        drone.mission = 'Returning to Base';
        drone.status = 'returning';
        
        addMissionLog(`Drone ${droneId} returning to base`, 'info');
        showAlert(`Drone ${droneId} returning to base`, 'info');
        
        populateDroneTable();
        updateDroneStats();
    }
}

// Emergency land
function emergencyLand() {
    const droneId = document.getElementById('droneSelect').value;
    
    if (!droneId) {
        showAlert('Please select a drone', 'warning');
        return;
    }

    const drone = drones.find(d => d.id === droneId);
    if (drone) {
        drone.mission = 'Emergency Landing';
        drone.status = 'emergency';
        
        addMissionLog(`EMERGENCY: Drone ${droneId} emergency landing initiated`, 'danger');
        showAlert(`EMERGENCY: Drone ${droneId} emergency landing`, 'danger');
        
        populateDroneTable();
        updateDroneStats();
    }
}

// View drone details
function viewDroneDetails(droneId) {
    const drone = drones.find(d => d.id === droneId);
    if (drone) {
        const modal = document.createElement('div');
        modal.className = 'modal fade show';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content military-card">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-drone me-2"></i>Drone Details - ${droneId}
                        </h5>
                        <button type="button" class="btn-close" onclick="closeModal(this)"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Basic Information</h6>
                                <p><strong>Name:</strong> ${drone.name}</p>
                                <p><strong>Status:</strong> <span class="status-badge status-${drone.status}">${getStatusText(drone.status)}</span></p>
                                <p><strong>Battery:</strong> ${drone.battery}%</p>
                                <p><strong>Altitude:</strong> ${drone.altitude}m</p>
                            </div>
                            <div class="col-md-6">
                                <h6>Mission Details</h6>
                                <p><strong>Current Mission:</strong> ${drone.mission}</p>
                                <p><strong>Location:</strong> ${drone.location}</p>
                                <p><strong>Last Update:</strong> ${drone.lastUpdate}</p>
                                <p><strong>Flight Time:</strong> ${Math.floor(Math.random() * 120) + 30} min</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal(this)">Close</button>
                        <button type="button" class="btn btn-primary" onclick="controlDrone('${droneId}')">Control Drone</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Control drone
function controlDrone(droneId) {
    showAlert(`Opening control interface for ${droneId}`, 'info');
    // In a real application, this would open a drone control interface
}

// Emergency stop
function emergencyStop(droneId) {
    if (confirm(`Are you sure you want to emergency stop ${droneId}?`)) {
        const drone = drones.find(d => d.id === droneId);
        if (drone) {
            drone.status = 'emergency';
            drone.mission = 'Emergency Stop';
            
            addMissionLog(`EMERGENCY STOP: Drone ${droneId} stopped immediately`, 'danger');
            showAlert(`EMERGENCY STOP: Drone ${droneId} stopped`, 'danger');
            
            populateDroneTable();
            updateDroneStats();
        }
    }
}

// Add mission log entry
function addMissionLog(message, type) {
    const logContainer = document.getElementById('missionLog');
    const logEntry = document.createElement('div');
    logEntry.className = `mission-log-entry log-${type}`;
    logEntry.innerHTML = `
        <div class="log-time">${new Date().toLocaleTimeString()}</div>
        <div class="log-message">${message}</div>
    `;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Keep only last 10 entries
    const entries = logContainer.querySelectorAll('.mission-log-entry');
    if (entries.length > 10) {
        entries[entries.length - 1].remove();
    }
}

// Show alert
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at top of main content
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(alertDiv, mainContent.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Close modal
function closeModal(button) {
    const modal = button.closest('.modal');
    modal.remove();
}

// Start drone updates
function startDroneUpdates() {
    setInterval(() => {
        // Simulate battery drain
        drones.forEach(drone => {
            if (drone.status === 'active' && drone.battery > 0) {
                drone.battery = Math.max(0, drone.battery - Math.floor(Math.random() * 3));
                if (drone.battery <= 15) {
                    drone.status = 'warning';
                    drone.mission = 'Returning to Base';
                }
            }
        });
        
        updateDroneStats();
        populateDroneTable();
    }, 10000); // Update every 10 seconds
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

// Add CSS for status badges and mission log
const additionalCSS = `
.status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
}

.status-active {
    background: rgba(0, 255, 0, 0.2);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.status-warning {
    background: rgba(255, 165, 0, 0.2);
    color: var(--warning-color);
    border: 1px solid var(--warning-color);
}

.status-maintenance {
    background: rgba(128, 128, 128, 0.2);
    color: #888;
    border: 1px solid #888;
}

.status-returning {
    background: rgba(0, 191, 255, 0.2);
    color: var(--info-color);
    border: 1px solid var(--info-color);
}

.status-emergency {
    background: rgba(255, 0, 0, 0.2);
    color: var(--danger-color);
    border: 1px solid var(--danger-color);
}

.battery-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
}

.mission-log-entry {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 8px;
    font-size: 0.9rem;
}

.log-time {
    color: var(--text-muted);
    font-size: 0.8rem;
    margin-bottom: 4px;
}

.log-message {
    color: var(--text-light);
}

.log-success {
    border-left: 4px solid var(--primary-color);
}

.log-info {
    border-left: 4px solid var(--info-color);
}

.log-warning {
    border-left: 4px solid var(--warning-color);
}

.log-danger {
    border-left: 4px solid var(--danger-color);
}
`;

// Add the CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
