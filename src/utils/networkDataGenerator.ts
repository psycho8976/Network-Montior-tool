import { NetworkPacket, TrafficData, Alert, TopIP, ProtocolStats } from '../types';
import { format } from 'date-fns';

const protocols: Array<'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'HTTPS'> = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS'];
const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia', 'Brazil'];

// Generate realistic IP addresses
const generateIP = (): string => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

// Generate network packet with anomaly detection
export const generatePacket = (): NetworkPacket => {
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const baseSize = protocol === 'HTTP' || protocol === 'HTTPS' ? 1500 : 
                   protocol === 'TCP' ? 800 : 
                   protocol === 'UDP' ? 500 : 200;
  
  const size = Math.floor(Math.random() * baseSize) + 50;
  const isAnomaly = size > baseSize * 0.8 || Math.random() < 0.05;
  
  return {
    id: `pkt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    sourceIP: generateIP(),
    destinationIP: generateIP(),
    protocol,
    size,
    port: Math.floor(Math.random() * 65535) + 1,
    isAnomaly,
    severity: isAnomaly ? (Math.random() < 0.3 ? 'high' : Math.random() < 0.5 ? 'medium' : 'low') : 'low'
  };
};

// Generate traffic data for charts
export const generateTrafficData = (minutes: number = 30): TrafficData[] => {
  const data: TrafficData[] = [];
  const now = new Date();
  
  for (let i = minutes; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60000);
    const basePackets = 50 + Math.sin(i * 0.1) * 20;
    const packetsPerSecond = Math.max(0, Math.floor(basePackets + Math.random() * 40 - 20));
    const anomalies = Math.random() < 0.2 ? Math.floor(Math.random() * 5) : 0;
    
    data.push({
      timestamp: format(timestamp, 'HH:mm'),
      packetsPerSecond,
      bytesPerSecond: packetsPerSecond * (500 + Math.random() * 1000),
      anomalies
    });
  }
  
  return data;
};

// Generate alerts
export const generateAlert = (): Alert => {
  const types: Array<'anomaly' | 'security' | 'performance'> = ['anomaly', 'security', 'performance'];
  const type = types[Math.floor(Math.random() * types.length)];
  const severities: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  
  const messages = {
    anomaly: [
      'Unusual packet size detected',
      'Suspicious traffic pattern identified',
      'Abnormal connection frequency',
      'Unexpected protocol usage'
    ],
    security: [
      'Potential DDoS attack detected',
      'Unauthorized access attempt',
      'Malicious IP identified',
      'Port scanning detected'
    ],
    performance: [
      'High bandwidth utilization',
      'Network congestion detected',
      'Latency threshold exceeded',
      'Connection timeout increase'
    ]
  };
  
  return {
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    severity,
    message: messages[type][Math.floor(Math.random() * messages[type].length)],
    timestamp: new Date(),
    sourceIP: Math.random() < 0.7 ? generateIP() : undefined,
    resolved: false
  };
};

// Generate top IPs
export const generateTopIPs = (): TopIP[] => {
  const ips: TopIP[] = [];
  
  for (let i = 0; i < 10; i++) {
    ips.push({
      ip: generateIP(),
      packets: Math.floor(Math.random() * 10000) + 100,
      bytes: Math.floor(Math.random() * 1000000) + 50000,
      country: countries[Math.floor(Math.random() * countries.length)]
    });
  }
  
  return ips.sort((a, b) => b.packets - a.packets);
};

// Generate protocol statistics
export const generateProtocolStats = (): ProtocolStats[] => {
  const total = 10000;
  const stats = [
    { protocol: 'HTTP', packets: Math.floor(Math.random() * 3000) + 2000, color: '#3b82f6' },
    { protocol: 'HTTPS', packets: Math.floor(Math.random() * 2000) + 1500, color: '#10b981' },
    { protocol: 'TCP', packets: Math.floor(Math.random() * 2000) + 1000, color: '#f59e0b' },
    { protocol: 'UDP', packets: Math.floor(Math.random() * 1500) + 500, color: '#ef4444' },
    { protocol: 'ICMP', packets: Math.floor(Math.random() * 500) + 100, color: '#8b5cf6' }
  ];
  
  const actualTotal = stats.reduce((sum, stat) => sum + stat.packets, 0);
  
  return stats.map(stat => ({
    ...stat,
    percentage: Math.round((stat.packets / actualTotal) * 100)
  }));
};