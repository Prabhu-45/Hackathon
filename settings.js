// Settings Management JavaScript

// Initialize settings page
document.addEventListener('DOMContentLoaded', function() {
    initializeSettingsPage();
    loadSettings();
    startSettingsUpdates();
});

// Initialize settings page
function initializeSettingsPage() {
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
}

// Show settings tab
function showSettingsTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.settings-tab');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.settings-nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-settings`);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
    
    // Add active class to selected nav item
    const selectedNavItem = document.querySelector(`[onclick="showSettingsTab('${tabName}')"]`);
    if (selectedNavItem) {
        selectedNavItem.classList.add('active');
    }
}

// Load settings from localStorage or use defaults
function loadSettings() {
    const defaultSettings = {
        // General settings
        missionName: 'DEF-OPS-2025',
        commandLocation: 'New Delhi, India',
        timeZone: 'IST',
        language: 'en',
        theme: 'dark',
        autoRefresh: true,
        
        // Drone settings
        maxFlightTime: 120,
        batteryWarning: 20,
        autoReturnLevel: 15,
        detectionSensitivity: 'medium',
        videoQuality: '1080p',
        autoDetect: true,
        
        // Alert settings
        alertSound: 'siren',
        alertVolume: 75,
        emailAlerts: true,
        criticalDelay: 0,
        alertRetention: 30,
        autoAcknowledge: true,
        
        // Security settings
        encryptionLevel: 'AES-256',
        sessionTimeout: 30,
        twoFactor: true,
        accessLevel: 'operator',
        logLevel: 'info',
        auditLog: true,
        
        // Communication settings
        primaryChannel: 'satellite',
        backupChannel: 'radio',
        signalThreshold: 70,
        updateFrequency: 5,
        retryAttempts: 3,
        autoReconnect: true,
        
        // System settings
        systemPerformance: 'medium',
        memoryLimit: 80,
        cpuLimit: 85,
        dataRetention: 90,
        backupFrequency: 'daily',
        autoBackup: true
    };
    
    // Load settings from localStorage or use defaults
    const settings = JSON.parse(localStorage.getItem('defenseSettings')) || defaultSettings;
    
    // Apply settings to form elements
    Object.keys(settings).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = settings[key];
            } else if (element.type === 'range') {
                element.value = settings[key];
                // Update range display
                const display = element.nextElementSibling;
                if (display) {
                    display.textContent = settings[key];
                }
            } else {
                element.value = settings[key];
            }
        }
    });
    
    // Add event listeners for range inputs
    document.querySelectorAll('input[type="range"]').forEach(range => {
        range.addEventListener('input', function() {
            const display = this.nextElementSibling;
            if (display) {
                display.textContent = this.value;
            }
        });
    });
}

// Save settings
function saveSettings() {
    const settings = {};
    
    // Collect all form values
    document.querySelectorAll('input, select').forEach(element => {
        if (element.id) {
            if (element.type === 'checkbox') {
                settings[element.id] = element.checked;
            } else {
                settings[element.id] = element.value;
            }
        }
    });
    
    // Save to localStorage
    localStorage.setItem('defenseSettings', JSON.stringify(settings));
    
    // Show success message
    showAlert('Settings saved successfully!', 'success');
    
    // Apply settings to system
    applySettings(settings);
}

// Apply settings to system
function applySettings(settings) {
    // Apply theme
    if (settings.theme) {
        document.body.className = document.body.className.replace(/theme-\w+/, '');
        document.body.classList.add(`theme-${settings.theme}`);
    }
    
    // Apply language
    if (settings.language) {
        document.documentElement.lang = settings.language;
    }
    
    // Apply auto-refresh
    if (settings.autoRefresh) {
        startAutoRefresh();
    } else {
        stopAutoRefresh();
    }
    
    // Apply alert settings
    if (settings.alertVolume) {
        // In a real application, this would set the system alert volume
        console.log(`Alert volume set to ${settings.alertVolume}%`);
    }
    
    // Apply system performance settings
    if (settings.systemPerformance) {
        // In a real application, this would adjust system performance
        console.log(`System performance set to ${settings.systemPerformance}`);
    }
}

// Reset settings to default
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
        localStorage.removeItem('defenseSettings');
        loadSettings();
        showAlert('Settings reset to default values', 'info');
    }
}

// Export settings
function exportSettings() {
    const settings = JSON.parse(localStorage.getItem('defenseSettings')) || {};
    const exportData = {
        ...settings,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `defense-settings-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showAlert('Settings exported successfully', 'success');
}

// Import settings
function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedSettings = JSON.parse(e.target.result);
                    localStorage.setItem('defenseSettings', JSON.stringify(importedSettings));
                    loadSettings();
                    showAlert('Settings imported successfully', 'success');
                } catch (error) {
                    showAlert('Error importing settings: Invalid file format', 'danger');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Start auto-refresh
function startAutoRefresh() {
    // In a real application, this would start auto-refresh functionality
    console.log('Auto-refresh started');
}

// Stop auto-refresh
function stopAutoRefresh() {
    // In a real application, this would stop auto-refresh functionality
    console.log('Auto-refresh stopped');
}

// Start settings updates
function startSettingsUpdates() {
    // Update system status indicators
    setInterval(updateSystemStatus, 5000);
}

// Update system status
function updateSystemStatus() {
    const statusIndicators = document.querySelectorAll('.status-indicator-item');
    
    statusIndicators.forEach(indicator => {
        const icon = indicator.querySelector('i');
        const text = indicator.querySelector('span');
        
        // Simulate status changes
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
            const statuses = [
                { icon: 'fas fa-database', text: 'Database: Online', color: 'text-success' },
                { icon: 'fas fa-database', text: 'Database: Syncing', color: 'text-warning' },
                { icon: 'fas fa-wifi', text: 'Network: Connected', color: 'text-success' },
                { icon: 'fas fa-wifi', text: 'Network: Weak Signal', color: 'text-warning' },
                { icon: 'fas fa-shield-alt', text: 'Security: Active', color: 'text-success' },
                { icon: 'fas fa-shield-alt', text: 'Security: Scanning', color: 'text-info' },
                { icon: 'fas fa-sync', text: 'Sync: In Progress', color: 'text-warning' },
                { icon: 'fas fa-sync', text: 'Sync: Complete', color: 'text-success' }
            ];
            
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            icon.className = `${randomStatus.icon} ${randomStatus.color}`;
            text.textContent = randomStatus.text;
        }
    });
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

// Add CSS for settings page
const settingsCSS = `
.theme-light {
    --dark-bg: #f8f9fa;
    --card-bg: #ffffff;
    --text-light: #212529;
    --text-muted: #6c757d;
    --border-color: #dee2e6;
}

.theme-high-contrast {
    --dark-bg: #000000;
    --card-bg: #1a1a1a;
    --text-light: #ffffff;
    --text-muted: #cccccc;
    --border-color: #ffffff;
    --primary-color: #ffff00;
}

.range-display {
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
    color: var(--primary-color);
}

.form-range {
    background: var(--card-bg);
}

.form-range::-webkit-slider-thumb {
    background: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.form-range::-moz-range-thumb {
    background: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.settings-nav-item {
    cursor: pointer;
}

.settings-nav-item:hover {
    background: rgba(0, 255, 0, 0.1) !important;
}

.status-indicator-item {
    transition: all 0.3s ease;
}

.status-indicator-item:hover {
    background: rgba(0, 255, 0, 0.1);
}

.btn-group .btn {
    margin-right: 5px;
}

.btn-group .btn:last-child {
    margin-right: 0;
}

@media (max-width: 768px) {
    .settings-nav {
        margin-bottom: 20px;
    }
    
    .settings-nav-item {
        padding: 10px 15px;
        font-size: 0.9rem;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
}
`;

// Add the CSS to the page
const style = document.createElement('style');
style.textContent = settingsCSS;
document.head.appendChild(style);

// Add range display updates
document.addEventListener('DOMContentLoaded', function() {
    // Add range displays after range inputs
    document.querySelectorAll('input[type="range"]').forEach(range => {
        const display = document.createElement('span');
        display.className = 'range-display';
        display.textContent = range.value;
        range.parentNode.insertBefore(display, range.nextSibling);
        
        range.addEventListener('input', function() {
            display.textContent = this.value;
        });
    });
});
