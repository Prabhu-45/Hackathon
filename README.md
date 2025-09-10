# DefenseHack 2025 - AI-Powered Defense Drone Command Dashboard

A fully responsive, real-time simulation of a military defense command center that demonstrates AI-powered drone surveillance, threat detection, and soldier support systems.

## 🚁 Features

### Live Drone Feed
- Simulated live video feed with AI detection overlays
- Real-time battery, altitude, and GPS status updates
- Animated detection boxes (red/green highlights) simulating AI detection
- Dynamic status indicators with color-coded warnings

### AI Alerts System
- Auto-updating alerts every 5 seconds
- Color-coded threat levels:
  - 🔴 **Critical**: Intruders, hostile UAVs, unauthorized access
  - 🟠 **Warning**: Suspicious activity, movement in restricted zones
  - 🔵 **Info**: System updates, maintenance notifications
- Real-time timestamp tracking

### Interactive Surveillance Map
- Leaflet.js-powered interactive map centered on India
- Auto-generated threat markers every 10 seconds
- Clickable markers with detailed threat information
- Real-time location updates

### Soldier Support Panel
- Live status tracking for 5 soldiers
- Status indicators: 🟢 Active, 🟡 Requesting Aid, 🔴 Injured
- One-click drone support dispatch
- Real-time location and last-seen updates

### System Security
- AES-256 encryption status display
- Real-time system clock
- Mission ID tracking (DEF-OPS-2025)
- Military-grade UI design

## 🎮 Interactive Features

### Keyboard Shortcuts
- **A**: Add random alert
- **M**: Add random map marker
- **R**: Refresh drone status

### Real-time Simulations
- Drone battery drain simulation
- Altitude and GPS coordinate updates
- Soldier status changes
- Automatic threat detection on map

## 🛠️ Technical Stack

- **HTML5**: Semantic structure
- **CSS3**: Military theme with animations and responsive design
- **JavaScript (ES6+)**: Real-time simulations and interactions
- **Bootstrap 5**: Responsive grid system and components
- **Leaflet.js**: Interactive mapping
- **FontAwesome**: Military-themed icons

## 🚀 Getting Started

1. **Open the Dashboard**
   ```bash
   # Simply open index.html in any modern web browser
   open index.html
   ```

2. **Features in Action**
   - Watch the live drone feed with detection overlays
   - Observe alerts appearing automatically
   - Click on map markers to see threat details
   - Use "Send Drone Support" buttons for soldier assistance
   - Monitor real-time system status in the footer

## 🎯 Demo Flow

1. **Detection**: Drones detect threats with AI overlays
2. **Alert**: System generates real-time alerts
3. **Mapping**: Threats appear on interactive map
4. **Response**: Soldiers can request drone support
5. **Command**: Centralized control and monitoring

## 📱 Responsive Design

- **Desktop**: Full-featured dashboard with all panels
- **Tablet**: Optimized layout with adjusted panel sizes
- **Mobile**: Stacked layout with touch-friendly controls

## 🎨 Design Features

- **Military Theme**: Dark colors with green accents
- **Futuristic UI**: Glowing effects and animations
- **Real-time Updates**: Live data simulation
- **Professional Look**: Defense-grade interface design

## 🔧 Customization

### Adding New Alert Types
Edit the `alertTypes` array in `script.js`:
```javascript
const alertTypes = [
    {
        type: 'critical',
        icon: '🔴',
        messages: ['Your custom alert message']
    }
];
```

### Modifying Soldier Data
Update the `soldiers` array in `script.js`:
```javascript
const soldiers = [
    {
        id: 1,
        name: 'Your Soldier Name',
        status: 'active',
        location: 'Your Location',
        lastSeen: '2 min ago'
    }
];
```

### Adjusting Simulation Timing
Modify intervals in the `startSimulations()` function:
```javascript
setInterval(addRandomAlert, 5000);      // Alerts every 5 seconds
setInterval(() => addRandomMarkers(1), 10000); // Markers every 10 seconds
setInterval(updateDroneStatus, 3000);   // Drone status every 3 seconds
```

## 🌟 Perfect for Hackathons

This dashboard is designed to impress judges with:
- **Real-time Simulation**: Looks like a live system
- **Professional UI**: Military-grade design
- **Interactive Elements**: Engaging user experience
- **Complete Workflow**: Detection → Alert → Response → Support
- **Responsive Design**: Works on all devices

## 📊 System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for external libraries)
- No server required - runs entirely in browser

## 🎯 Mission Status

**Mission ID**: DEF-OPS-2025  
**Status**: ✅ Online  
**Encryption**: AES-256 Secure  
**Last Updated**: Real-time  

---

*Built for DefenseHack 2025 - Demonstrating the future of AI-powered defense systems*
