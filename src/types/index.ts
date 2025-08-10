export interface NetworkPacket {
  id: string;
  timestamp: Date;
  sourceIP: string;
  destinationIP: string;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'HTTPS';
  size: number;
  port: number;
  isAnomaly: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface TrafficData {
  timestamp: string;
  packetsPerSecond: number;
  bytesPerSecond: number;
  anomalies: number;
}

export interface Alert {
  id: string;
  type: 'anomaly' | 'security' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  sourceIP?: string;
  resolved: boolean;
}

export interface TopIP {
  ip: string;
  packets: number;
  bytes: number;
  country: string;
}

export interface ProtocolStats {
  protocol: string;
  packets: number;
  percentage: number;
  color: string;
}