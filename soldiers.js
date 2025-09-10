// Soldiers Management JavaScript

// Sample soldier data
const soldiers = [
    {
        id: 1,
        name: 'Sgt. John Mitchell',
        rank: 'Sergeant',
        status: 'active',
        location: 'Sector-7',
        lastSeen: new Date(Date.now() - 2 * 60000), // 2 minutes ago
        equipment: ['Rifle', 'Radio', 'Night Vision'],
        mission: 'Patrol',
        health: 100,
        battery: 85
    },
    {
        id: 2,
        name: 'Cpl. Sarah Chen',
        rank: 'Corporal',
        status: 'warning',
        location: 'Checkpoint Alpha',
        lastSeen: new Date(Date.now() - 5 * 60000), // 5 minutes ago
        equipment: ['Rifle', 'Radio', 'Medical Kit'],
        mission: 'Guard Duty',
        health: 75,
        battery: 60
    },
    {
        id: 3,
        name: 'Pvt. Mike Rodriguez',
        rank: 'Private',
        status: 'danger',
        location: 'Perimeter Fence',
        lastSeen: new Date(Date.now() - 1 * 60000), // 1 minute ago
        equipment: ['Rifle', 'Radio'],
        mission: 'Emergency',
        health: 45,
        battery: 20
    },
    {
        id: 4,
        name: 'Lt. Emma Thompson',
        rank: 'Lieutenant',
        status: 'active',
        location: 'Command Center',
        lastSeen: new Date(Date.now() - 30 * 1000), // 30 seconds ago
        equipment: ['Pistol', 'Radio', 'Tablet'],
        mission: 'Command',
        health: 100,
        battery: 95
    },
    {
        id: 5,
        name: 'Sgt. David Park',
        rank: 'Sergeant',
        status: 'warning',
        location: 'Coastline Watch',
        lastSeen: new Date(Date.now() - 3 * 60000), // 3 minutes ago
        equipment: ['Rifle', 'Radio', 'Binoculars'],
        mission: 'Surveillance',
        health: 80,
        battery: 70
    },
    {
        id: 6,
        name: 'Cpl. Lisa Johnson',
        rank: 'Corporal',
        status: 'active',
        location: 'Sector-3',
        lastSeen: new Date(Date.now() - 1 * 60000), // 1 minute ago
        equipment: ['Rifle', 'Radio', 'Grenades'],
        mission: 'Patrol',
        health: 95,
        battery: 80
    },
    {
        id: 7,
        name: 'Pvt. Alex Kumar',
        rank: 'Private',
        status: 'active',
        location: 'Sector-9',
        lastSeen: new Date(Date.now() - 2 * 60000), // 2 minutes ago
        equipment: ['Rifle', 'Radio', 'Flashlight'],
        mission: 'Patrol',
        health: 90,
        battery: 75
    },
    {
        id: 8,
        name: 'Sgt. Maria Garcia',
        rank: 'Sergeant',
        status: 'active',
        location: 'Airbase Perimeter',
        lastSeen: new Date(Date.now() - 45 * 1000), // 45 seconds ago
        equipment: ['Rifle', 'Radio', 'Night Vision'],
        mission: 'Guard Duty',
        health: 100,
        battery: 90
    }
];

// Mission assignments
const missionAssignments = [
    {
        id: 1,
        title: 'Border Patrol - Sector 7',
        assignedTo: 'Sgt. John Mitchell',
        status: 'in_progress',
        priority: 'high',
        startTime: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
        estimatedEnd: new Date(Date.now() + 2 * 60 * 60000) // 2 hours from now
    },
    {
        id: 2,
        title: 'Coastline Surveillance',
        assignedTo: 'Sgt. David Park',
        status: 'in_progress',
        priority: 'medium',
        startTime: new Date(Date.now() - 1 * 60 * 60000), // 1 hour ago
        estimatedEnd: new Date(Date.now() + 3 * 60 * 60000) // 3 hours from now
    },
    {
        id: 3,
        title: 'Emergency Response - Perimeter',
        assignedTo: 'Pvt. Mike Rodriguez',
        status: 'urgent',
        priority: 'critical',
        startTime: new Date(Date.now() - 30 * 60000), // 30 minutes ago
        estimatedEnd: new Date(Date.now() + 30 * 60000) // 30 minutes from now
    }
];

// Initialize soldiers page
document.addEventListener('DOMContentLoaded', function() {
    initializeSoldiersPage();
    updateSoldierStats();
    populateSoldierTable();
    populateSupportSelect();
    populateMissionAssignments();
    startSoldierUpdates();
});

// Initialize soldiers page
function initializeSoldiersPage() {
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
}

// Update soldier statistics
function updateSoldierStats() {
    const activeSoldiers = soldiers.filter(s => s.status === 'active').length;
    const warningSoldiers = soldiers.filter(s => s.status === 'warning').length;
    const injuredSoldiers = soldiers.filter(s => s.status === 'danger').length;
    const missionsCompleted = Math.floor(Math.random() * 50) + 40; // Simulated

    document.getElementById('activeSoldiers').textContent = activeSoldiers;
    document.getElementById('warningSoldiers').textContent = warningSoldiers;
    document.getElementById('injuredSoldiers').textContent = injuredSoldiers;
    document.getElementById('missionsCompleted').textContent = missionsCompleted;
}

// Populate soldier table
function populateSoldierTable() {
    const tbody = document.getElementById('soldierTableBody');
    tbody.innerHTML = '';

    soldiers.forEach(soldier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="soldier-info">
                    <strong>${soldier.name}</strong><br>
                    <small class="text-muted">${soldier.rank}</small>
                </div>
            </td>
            <td>
                <span class="status-badge status-${soldier.status}">
                    <span class="status-indicator status-${soldier.status}"></span>
                    ${getStatusText(soldier.status)}
                </span>
            </td>
            <td>${soldier.location}</td>
            <td>
                <div class="equipment-list">
                    ${soldier.equipment.map(eq => `<span class="equipment-tag">${eq}</span>`).join('')}
                </div>
            </td>
            <td>${getTimeAgo(soldier.lastSeen)}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-info btn-sm" onclick="viewSoldierDetails(${soldier.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-success btn-sm" onclick="sendMessage(${soldier.id})" title="Send Message">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="btn btn-outline-warning btn-sm" onclick="requestSupport(${soldier.id})" title="Request Support">
                        <i class="fas fa-exclamation-triangle"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate support select dropdown
function populateSupportSelect() {
    const select = document.getElementById('supportSoldier');
    select.innerHTML = '<option value="">Choose soldier...</option>';
    
    soldiers.forEach(soldier => {
        const option = document.createElement('option');
        option.value = soldier.id;
        option.textContent = `${soldier.name} (${soldier.rank})`;
        select.appendChild(option);
    });
}

// Populate mission assignments
function populateMissionAssignments() {
    const container = document.getElementById('missionAssignments');
    container.innerHTML = '';

    missionAssignments.forEach(mission => {
        const missionElement = document.createElement('div');
        missionElement.className = 'mission-item';
        missionElement.innerHTML = `
            <div class="mission-header">
                <h6 class="mb-1">${mission.title}</h6>
                <span class="priority-badge priority-${mission.priority}">${mission.priority.toUpperCase()}</span>
            </div>
            <div class="mission-details">
                <p class="mb-1"><strong>Assigned:</strong> ${mission.assignedTo}</p>
                <p class="mb-1"><strong>Status:</strong> <span class="status-badge status-${mission.status}">${mission.status.replace('_', ' ').toUpperCase()}</span></p>
                <p class="mb-0"><strong>Duration:</strong> ${getMissionDuration(mission.startTime, mission.estimatedEnd)}</p>
            </div>
        `;
        container.appendChild(missionElement);
    });
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'active': 'Active',
        'warning': 'Requesting Aid',
        'danger': 'Injured',
        'offline': 'Offline'
    };
    return statusMap[status] || status;
}

// Get time ago
function getTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

// Get mission duration
function getMissionDuration(startTime, endTime) {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return 'Not started';
    if (now > end) return 'Completed';
    
    const totalMinutes = Math.floor((end - start) / 60000);
    const elapsedMinutes = Math.floor((now - start) / 60000);
    const remainingMinutes = totalMinutes - elapsedMinutes;
    
    return `${elapsedMinutes}m elapsed, ${remainingMinutes}m remaining`;
}

// View soldier details
function viewSoldierDetails(soldierId) {
    const soldier = soldiers.find(s => s.id === soldierId);
    if (soldier) {
        const modal = document.createElement('div');
        modal.className = 'modal fade show';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content military-card">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-user-shield me-2"></i>Soldier Details - ${soldier.name}
                        </h5>
                        <button type="button" class="btn-close" onclick="closeModal(this)"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Personal Information</h6>
                                <p><strong>Name:</strong> ${soldier.name}</p>
                                <p><strong>Rank:</strong> ${soldier.rank}</p>
                                <p><strong>Status:</strong> <span class="status-badge status-${soldier.status}">${getStatusText(soldier.status)}</span></p>
                                <p><strong>Health:</strong> ${soldier.health}%</p>
                                <p><strong>Equipment Battery:</strong> ${soldier.battery}%</p>
                            </div>
                            <div class="col-md-6">
                                <h6>Mission Details</h6>
                                <p><strong>Current Mission:</strong> ${soldier.mission}</p>
                                <p><strong>Location:</strong> ${soldier.location}</p>
                                <p><strong>Last Seen:</strong> ${getTimeAgo(soldier.lastSeen)}</p>
                                <p><strong>Equipment:</strong></p>
                                <div class="equipment-list">
                                    ${soldier.equipment.map(eq => `<span class="equipment-tag">${eq}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal(this)">Close</button>
                        <button type="button" class="btn btn-primary" onclick="sendMessage(${soldier.id})">Send Message</button>
                        <button type="button" class="btn btn-warning" onclick="requestSupport(${soldier.id})">Request Support</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Send message
function sendMessage(soldierId) {
    const soldier = soldiers.find(s => s.id === soldierId);
    if (soldier) {
        const message = prompt(`Send message to ${soldier.name}:`);
        if (message) {
            showAlert(`Message sent to ${soldier.name}: "${message}"`, 'success');
            addCommunicationLog(`Message sent to ${soldier.name}`, 'info');
        }
    }
}

// Request support
function requestSupport(soldierId) {
    const soldier = soldiers.find(s => s.id === soldierId);
    if (soldier) {
        const supportType = document.getElementById('supportType').value;
        const priority = document.getElementById('supportPriority').value;
        
        showAlert(`Support requested for ${soldier.name} - ${supportType} (${priority} priority)`, 'warning');
        addCommunicationLog(`Support requested for ${soldier.name} - ${supportType}`, 'warning');
    }
}

// Request support from form
function requestSupport() {
    const soldierId = document.getElementById('supportSoldier').value;
    const supportType = document.getElementById('supportType').value;
    const priority = document.getElementById('supportPriority').value;
    
    if (!soldierId) {
        showAlert('Please select a soldier', 'warning');
        return;
    }
    
    const soldier = soldiers.find(s => s.id == soldierId);
    if (soldier) {
        showAlert(`Support requested for ${soldier.name} - ${supportType} (${priority} priority)`, 'warning');
        addCommunicationLog(`Support requested for ${soldier.name} - ${supportType}`, 'warning');
        
        // Clear form
        document.getElementById('supportSoldier').value = '';
        document.getElementById('supportType').value = 'medical';
        document.getElementById('supportPriority').value = 'medium';
    }
}

// Open communication channel
function openCommChannel(channel) {
    const channelNames = {
        'radio': 'Radio Channel',
        'satellite': 'Satellite Link',
        'emergency': 'Emergency Line'
    };
    
    showAlert(`Opening ${channelNames[channel]}...`, 'info');
    addCommunicationLog(`${channelNames[channel]} opened`, 'info');
}

// Add communication log
function addCommunicationLog(message, type) {
    // In a real application, this would add to a communication log
    console.log(`[${type.toUpperCase()}] ${message} - ${new Date().toLocaleTimeString()}`);
}

// Close modal
function closeModal(button) {
    const modal = button.closest('.modal');
    modal.remove();
}

// Show alert
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(alertDiv, mainContent.firstChild);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Start soldier updates
function startSoldierUpdates() {
    setInterval(() => {
        // Simulate status changes
        soldiers.forEach(soldier => {
            if (Math.random() < 0.1) { // 10% chance every 30 seconds
                const statuses = ['active', 'warning', 'danger'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                if (newStatus !== soldier.status) {
                    soldier.status = newStatus;
                    soldier.lastSeen = new Date();
                }
            }
            
            // Simulate battery drain
            if (soldier.battery > 0) {
                soldier.battery = Math.max(0, soldier.battery - Math.floor(Math.random() * 2));
            }
        });
        
        updateSoldierStats();
        populateSoldierTable();
    }, 30000); // Update every 30 seconds
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

// Add CSS for soldiers page
const soldiersCSS = `
.status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
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

.status-danger {
    background: rgba(255, 0, 0, 0.2);
    color: var(--danger-color);
    border: 1px solid var(--danger-color);
}

.status-offline {
    background: rgba(128, 128, 128, 0.2);
    color: #888;
    border: 1px solid #888;
}

.equipment-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.equipment-tag {
    background: rgba(0, 255, 0, 0.1);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.7rem;
}

.priority-badge {
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.7rem;
    font-weight: bold;
}

.priority-high {
    background: rgba(255, 165, 0, 0.2);
    color: var(--warning-color);
}

.priority-critical {
    background: rgba(255, 0, 0, 0.2);
    color: var(--danger-color);
}

.priority-medium {
    background: rgba(0, 191, 255, 0.2);
    color: var(--info-color);
}

.mission-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.mission-details p {
    margin-bottom: 4px;
    font-size: 0.9rem;
}

.soldier-info {
    line-height: 1.4;
}
`;

// Add the CSS to the page
const style = document.createElement('style');
style.textContent = soldiersCSS;
document.head.appendChild(style);
