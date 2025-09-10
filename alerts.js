// Alerts Management JavaScript

// Sample alert data
let alerts = [
    {
        id: 1,
        type: 'critical',
        title: 'Intruder detected at Border Sector-7',
        description: 'Two unidentified persons detected crossing the border fence. Night vision equipment confirmed.',
        location: 'Sector-7',
        timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
        status: 'active',
        priority: 'high',
        assignedTo: 'Drone Alpha-1'
    },
    {
        id: 2,
        type: 'warning',
        title: 'Suspicious boat spotted at Coastline',
        description: 'Unidentified vessel approaching restricted waters. No response to radio hails.',
        location: 'Coastline Watch',
        timestamp: new Date(Date.now() - 12 * 60000), // 12 minutes ago
        status: 'acknowledged',
        priority: 'medium',
        assignedTo: 'Drone Beta-2'
    },
    {
        id: 3,
        type: 'info',
        title: 'Drone battery low - returning to base',
        description: 'Drone Gamma-3 battery level below 20%. Initiating return to base protocol.',
        location: 'Sector-3',
        timestamp: new Date(Date.now() - 3 * 60000), // 3 minutes ago
        status: 'resolved',
        priority: 'low',
        assignedTo: 'Drone Gamma-3'
    },
    {
        id: 4,
        type: 'critical',
        title: 'Hostile UAV approaching Airbase',
        description: 'Unknown UAV detected on collision course with military airbase. Immediate action required.',
        location: 'Airbase Perimeter',
        timestamp: new Date(Date.now() - 2 * 60000), // 2 minutes ago
        status: 'active',
        priority: 'critical',
        assignedTo: 'Drone Delta-4'
    },
    {
        id: 5,
        type: 'warning',
        title: 'Movement detected in restricted zone',
        description: 'Thermal imaging detected movement in Sector-5 restricted area. Investigation required.',
        location: 'Sector-5',
        timestamp: new Date(Date.now() - 8 * 60000), // 8 minutes ago
        status: 'active',
        priority: 'medium',
        assignedTo: 'Drone Echo-5'
    }
];

// Initialize alerts page
document.addEventListener('DOMContentLoaded', function() {
    initializeAlertsPage();
    updateAlertCounts();
    populateAlertsList();
    startAlertUpdates();
});

// Initialize alerts page
function initializeAlertsPage() {
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
}

// Update alert counts
function updateAlertCounts() {
    const criticalCount = alerts.filter(a => a.type === 'critical' && a.status === 'active').length;
    const warningCount = alerts.filter(a => a.type === 'warning' && a.status === 'active').length;
    const infoCount = alerts.filter(a => a.type === 'info' && a.status === 'active').length;
    const resolvedCount = alerts.filter(a => a.status === 'resolved').length;

    document.getElementById('criticalCount').textContent = criticalCount;
    document.getElementById('warningCount').textContent = warningCount;
    document.getElementById('infoCount').textContent = infoCount;
    document.getElementById('resolvedCount').textContent = resolvedCount;
}

// Populate alerts list
function populateAlertsList() {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '';

    // Sort alerts by timestamp (newest first)
    const sortedAlerts = alerts.sort((a, b) => b.timestamp - a.timestamp);

    sortedAlerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item alert-${alert.type} fade-in`;
        alertElement.onclick = () => showAlertDetails(alert);
        
        const timeAgo = getTimeAgo(alert.timestamp);
        const statusIcon = getStatusIcon(alert.status);
        
        alertElement.innerHTML = `
            <div class="d-flex align-items-start">
                <span class="me-3" style="font-size: 1.5rem;">${getAlertIcon(alert.type)}</span>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-1">${alert.title}</h6>
                            <p class="mb-1 text-muted">${alert.description}</p>
                            <small class="text-muted">
                                <i class="fas fa-map-marker-alt me-1"></i>${alert.location} • 
                                <i class="fas fa-clock me-1"></i>${timeAgo} • 
                                <i class="fas fa-user me-1"></i>${alert.assignedTo}
                            </small>
                        </div>
                        <div class="text-end">
                            <span class="status-badge status-${alert.status}">${statusIcon}</span>
                            <div class="mt-1">
                                <button class="btn btn-sm btn-outline-primary me-1" onclick="event.stopPropagation(); acknowledgeAlert(${alert.id})">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation(); resolveAlert(${alert.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        alertsList.appendChild(alertElement);
    });
}

// Show alert details
function showAlertDetails(alert) {
    const detailsContainer = document.getElementById('alertDetails');
    const timeAgo = getTimeAgo(alert.timestamp);
    
    detailsContainer.innerHTML = `
        <div class="alert-details">
            <h6 class="mb-3">
                ${getAlertIcon(alert.type)} ${alert.title}
            </h6>
            <div class="alert-info">
                <p><strong>Description:</strong> ${alert.description}</p>
                <p><strong>Location:</strong> ${alert.location}</p>
                <p><strong>Priority:</strong> <span class="priority-${alert.priority}">${alert.priority.toUpperCase()}</span></p>
                <p><strong>Status:</strong> <span class="status-badge status-${alert.status}">${getStatusIcon(alert.status)}</span></p>
                <p><strong>Assigned To:</strong> ${alert.assignedTo}</p>
                <p><strong>Timestamp:</strong> ${alert.timestamp.toLocaleString()}</p>
                <p><strong>Time Ago:</strong> ${timeAgo}</p>
            </div>
            <div class="alert-actions mt-3">
                <button class="btn btn-success btn-sm me-2" onclick="acknowledgeAlert(${alert.id})">
                    <i class="fas fa-check me-1"></i>Acknowledge
                </button>
                <button class="btn btn-warning btn-sm me-2" onclick="escalateAlert(${alert.id})">
                    <i class="fas fa-arrow-up me-1"></i>Escalate
                </button>
                <button class="btn btn-danger btn-sm" onclick="resolveAlert(${alert.id})">
                    <i class="fas fa-times me-1"></i>Resolve
                </button>
            </div>
        </div>
    `;
}

// Get alert icon
function getAlertIcon(type) {
    const icons = {
        'critical': '🔴',
        'warning': '🟠',
        'info': '🔵'
    };
    return icons[type] || '⚪';
}

// Get status icon
function getStatusIcon(status) {
    const icons = {
        'active': 'Active',
        'acknowledged': 'Acknowledged',
        'resolved': 'Resolved'
    };
    return icons[status] || status;
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

// Acknowledge alert
function acknowledgeAlert(alertId) {
    const alert = alerts.find(a => a.id === alertId);
    if (alert && alert.status === 'active') {
        alert.status = 'acknowledged';
        updateAlertCounts();
        populateAlertsList();
        showAlert(`Alert ${alertId} acknowledged`, 'success');
    }
}

// Resolve alert
function resolveAlert(alertId) {
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
        alert.status = 'resolved';
        updateAlertCounts();
        populateAlertsList();
        showAlert(`Alert ${alertId} resolved`, 'info');
    }
}

// Escalate alert
function escalateAlert(alertId) {
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
        alert.priority = 'critical';
        showAlert(`Alert ${alertId} escalated to critical priority`, 'warning');
    }
}

// Filter alerts
function filterAlerts() {
    const typeFilter = document.getElementById('alertTypeFilter').value;
    const timeFilter = document.getElementById('timeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    let filteredAlerts = [...alerts];

    // Filter by type
    if (typeFilter !== 'all') {
        filteredAlerts = filteredAlerts.filter(a => a.type === typeFilter);
    }

    // Filter by time
    if (timeFilter !== 'all') {
        const now = new Date();
        const timeThreshold = new Date(now - getTimeThreshold(timeFilter));
        filteredAlerts = filteredAlerts.filter(a => a.timestamp >= timeThreshold);
    }

    // Filter by status
    if (statusFilter !== 'all') {
        filteredAlerts = filteredAlerts.filter(a => a.status === statusFilter);
    }

    // Update display
    displayFilteredAlerts(filteredAlerts);
}

// Get time threshold
function getTimeThreshold(filter) {
    switch (filter) {
        case '1h': return 60 * 60000;
        case '24h': return 24 * 60 * 60000;
        case '7d': return 7 * 24 * 60 * 60000;
        default: return 0;
    }
}

// Display filtered alerts
function displayFilteredAlerts(filteredAlerts) {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '';

    filteredAlerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item alert-${alert.type} fade-in`;
        alertElement.onclick = () => showAlertDetails(alert);
        
        const timeAgo = getTimeAgo(alert.timestamp);
        const statusIcon = getStatusIcon(alert.status);
        
        alertElement.innerHTML = `
            <div class="d-flex align-items-start">
                <span class="me-3" style="font-size: 1.5rem;">${getAlertIcon(alert.type)}</span>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-1">${alert.title}</h6>
                            <p class="mb-1 text-muted">${alert.description}</p>
                            <small class="text-muted">
                                <i class="fas fa-map-marker-alt me-1"></i>${alert.location} • 
                                <i class="fas fa-clock me-1"></i>${timeAgo} • 
                                <i class="fas fa-user me-1"></i>${alert.assignedTo}
                            </small>
                        </div>
                        <div class="text-end">
                            <span class="status-badge status-${alert.status}">${statusIcon}</span>
                            <div class="mt-1">
                                <button class="btn btn-sm btn-outline-primary me-1" onclick="event.stopPropagation(); acknowledgeAlert(${alert.id})">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation(); resolveAlert(${alert.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        alertsList.appendChild(alertElement);
    });
}

// Clear filters
function clearFilters() {
    document.getElementById('alertTypeFilter').value = 'all';
    document.getElementById('timeFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    populateAlertsList();
}

// Acknowledge all alerts
function acknowledgeAll() {
    alerts.forEach(alert => {
        if (alert.status === 'active') {
            alert.status = 'acknowledged';
        }
    });
    updateAlertCounts();
    populateAlertsList();
    showAlert('All active alerts acknowledged', 'success');
}

// Escalate critical alerts
function escalateCritical() {
    const criticalAlerts = alerts.filter(a => a.type === 'critical' && a.status === 'active');
    criticalAlerts.forEach(alert => {
        alert.priority = 'critical';
    });
    showAlert(`${criticalAlerts.length} critical alerts escalated`, 'warning');
}

// Generate report
function generateReport() {
    const reportData = {
        totalAlerts: alerts.length,
        activeAlerts: alerts.filter(a => a.status === 'active').length,
        criticalAlerts: alerts.filter(a => a.type === 'critical' && a.status === 'active').length,
        resolvedAlerts: alerts.filter(a => a.status === 'resolved').length,
        generatedAt: new Date().toLocaleString()
    };

    const reportText = `
ALERT REPORT - ${reportData.generatedAt}
=====================================
Total Alerts: ${reportData.totalAlerts}
Active Alerts: ${reportData.activeAlerts}
Critical Alerts: ${reportData.criticalAlerts}
Resolved Alerts: ${reportData.resolvedAlerts}
    `;

    // Create and download report
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alert-report-${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    showAlert('Alert report generated and downloaded', 'info');
}

// Clear resolved alerts
function clearResolved() {
    if (confirm('Are you sure you want to clear all resolved alerts?')) {
        alerts = alerts.filter(a => a.status !== 'resolved');
        updateAlertCounts();
        populateAlertsList();
        showAlert('Resolved alerts cleared', 'info');
    }
}

// Start alert updates
function startAlertUpdates() {
    setInterval(() => {
        // Simulate new alerts
        if (Math.random() < 0.3) { // 30% chance every 10 seconds
            addRandomAlert();
        }
    }, 10000);
}

// Add random alert
function addRandomAlert() {
    const alertTypes = ['critical', 'warning', 'info'];
    const alertTitles = [
        'Intruder detected at Border Sector-7',
        'Suspicious boat spotted at Coastline',
        'Hostile UAV approaching Airbase',
        'Unauthorized vehicle at Checkpoint Alpha',
        'Suspicious activity at Perimeter Fence',
        'Unknown aircraft in restricted airspace',
        'Movement detected in restricted zone',
        'Anomaly detected in thermal imaging',
        'Communication interference detected',
        'Drone battery low - returning to base'
    ];

    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const title = alertTitles[Math.floor(Math.random() * alertTitles.length)];
    
    const newAlert = {
        id: Date.now(),
        type: type,
        title: title,
        description: 'Automated detection by AI surveillance system.',
        location: `Sector-${Math.floor(Math.random() * 10) + 1}`,
        timestamp: new Date(),
        status: 'active',
        priority: type === 'critical' ? 'critical' : 'medium',
        assignedTo: `Drone ${String.fromCharCode(65 + Math.floor(Math.random() * 8))}-${Math.floor(Math.random() * 8) + 1}`
    };

    alerts.unshift(newAlert);
    updateAlertCounts();
    populateAlertsList();
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

// Add CSS for alerts page
const alertsCSS = `
.status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
}

.status-active {
    background: rgba(255, 0, 0, 0.2);
    color: var(--danger-color);
    border: 1px solid var(--danger-color);
}

.status-acknowledged {
    background: rgba(255, 165, 0, 0.2);
    color: var(--warning-color);
    border: 1px solid var(--warning-color);
}

.status-resolved {
    background: rgba(0, 255, 0, 0.2);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.priority-high {
    color: var(--warning-color);
    font-weight: bold;
}

.priority-critical {
    color: var(--danger-color);
    font-weight: bold;
}

.alert-details {
    background: var(--card-bg);
    border-radius: 8px;
    padding: 20px;
}

.alert-info p {
    margin-bottom: 8px;
}

.alert-actions {
    border-top: 1px solid var(--border-color);
    padding-top: 15px;
}
`;

// Add the CSS to the page
const style = document.createElement('style');
style.textContent = alertsCSS;
document.head.appendChild(style);
