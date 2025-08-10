# 📡 Network Monitoring Dashboard

A professional web-based network monitoring tool with real-time traffic analysis, anomaly detection, and interactive dashboards.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- VS Code (recommended)

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - The app will automatically open at `http://localhost:5173`
   - Or click the preview link in the terminal

## 🛠 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🎯 Features

### Real-Time Monitoring
- **Live Traffic Charts** - Real-time packet and bandwidth monitoring
- **Protocol Analysis** - TCP, UDP, HTTP, HTTPS traffic breakdown
- **Anomaly Detection** - Intelligent threat detection with severity levels
- **Live Packet Stream** - Real-time packet capture simulation

### Dashboard Components
- **Stats Cards** - Key metrics overview (packets, data, connections, latency)
- **Alert Management** - Security and performance alerts with resolution
- **Top IPs Tracking** - Most active source IPs with geolocation
- **Interactive Charts** - Responsive charts with hover details

### Professional Design
- **Dark Theme** - Optimized for 24/7 monitoring environments
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Real-time Updates** - Live data refresh every second
- **Smooth Animations** - Professional transitions and micro-interactions

## 🏗 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Date Handling:** date-fns

## 📊 Dashboard Sections

1. **Header** - Network status, active alerts, live indicator
2. **Stats Cards** - Key performance metrics
3. **Traffic Chart** - Real-time network traffic visualization
4. **Protocol Chart** - Traffic distribution by protocol
5. **Alerts Panel** - Security and anomaly alerts
6. **Top IPs Table** - Most active network endpoints
7. **Live Packets** - Real-time packet monitoring with filtering

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.tsx      # Main header with status
│   ├── StatsCards.tsx  # Metrics overview
│   ├── TrafficChart.tsx # Network traffic chart
│   ├── ProtocolChart.tsx # Protocol distribution
│   ├── AlertsPanel.tsx # Alert management
│   ├── TopIPsTable.tsx # Top IPs table
│   └── LivePackets.tsx # Live packet monitor
├── types/              # TypeScript definitions
├── utils/              # Data generation utilities
└── App.tsx            # Main application
```

### Key Components

- **Real-time Data Generation** - Simulates realistic network traffic
- **Anomaly Detection** - Identifies suspicious patterns
- **Interactive Filtering** - Search and filter capabilities
- **Responsive Design** - Mobile-first approach
- **Performance Optimized** - Efficient rendering and updates

## 🎨 Design System

### Colors
- **Primary:** Cyan (#06b6d4) - Main accent color
- **Success:** Green (#10b981) - Healthy status
- **Warning:** Yellow (#f59e0b) - Medium alerts
- **Danger:** Red (#ef4444) - Critical alerts
- **Background:** Dark grays for monitoring environment

### Typography
- **Headers:** Bold, clear hierarchy
- **Data:** Monospace for technical information
- **UI Text:** Clean, readable sans-serif

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px - 1280px
- **Large:** > 1280px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

(You can add a CONTRIBUTING.md later if you want stricter guidelines)
