import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TrafficChart from './components/TrafficChart';
import ProtocolChart from './components/ProtocolChart';
import AlertsPanel from './components/AlertsPanel';
import TopIPsTable from './components/TopIPsTable';
import LivePackets from './components/LivePackets';
import {
  generatePacket,
  generateTrafficData,
  generateAlert,
  generateTopIPs,
  generateProtocolStats
} from './utils/networkDataGenerator';
import { NetworkPacket, Alert, TrafficData, TopIP, ProtocolStats } from './types';

function App() {
  const [packets, setPackets] = useState<NetworkPacket[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [topIPs, setTopIPs] = useState<TopIP[]>([]);
  const [protocolStats, setProtocolStats] = useState<ProtocolStats[]>([]);
  
  // Stats state
  const [totalPackets, setTotalPackets] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [activeConnections] = useState(Math.floor(Math.random() * 500) + 100);
  const [threatLevel] = useState<'low' | 'medium' | 'high'>(
    Math.random() < 0.7 ? 'low' : Math.random() < 0.9 ? 'medium' : 'high'
  );
  const [avgLatency] = useState(Math.floor(Math.random() * 100) + 20);
  const [uptimePercentage] = useState(99.2 + Math.random() * 0.8);

  // Initialize data
  useEffect(() => {
    setTrafficData(generateTrafficData(30));
    setTopIPs(generateTopIPs());
    setProtocolStats(generateProtocolStats());
    
    // Generate initial alerts
    const initialAlerts = Array.from({ length: 5 }, () => generateAlert());
    setAlerts(initialAlerts);
  }, []);

  // Simulate real-time packet generation
  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket = generatePacket();
      
      setPackets(prev => {
        const updated = [newPacket, ...prev.slice(0, 99)]; // Keep last 100 packets
        return updated;
      });
      
      setTotalPackets(prev => prev + 1);
      setTotalBytes(prev => prev + newPacket.size);
      
      // Generate occasional alerts
      if (Math.random() < 0.05) { // 5% chance
        const newAlert = generateAlert();
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update traffic data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(generateTrafficData(30));
      setTopIPs(generateTopIPs());
      setProtocolStats(generateProtocolStats());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved).length;
  const networkStatus = threatLevel === 'high' ? 'critical' : 
                       threatLevel === 'medium' ? 'warning' : 'healthy';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <Header activeAlerts={activeAlerts} networkStatus={networkStatus} />
      
      <main className="p-6 space-y-6">
        <StatsCards
          totalPackets={totalPackets}
          totalBytes={totalBytes}
          activeConnections={activeConnections}
          threatLevel={threatLevel}
          avgLatency={avgLatency}
          uptimePercentage={uptimePercentage}
        />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TrafficChart data={trafficData} />
          </div>
          <div>
            <ProtocolChart data={protocolStats} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div>
            <AlertsPanel alerts={alerts} onResolveAlert={handleResolveAlert} />
          </div>
          <div>
            <TopIPsTable data={topIPs} />
          </div>
          <div>
            <LivePackets packets={packets} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;