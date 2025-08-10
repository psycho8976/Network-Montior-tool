import React from 'react';
import { Activity, Shield, AlertTriangle, TrendingUp, Database, Zap } from 'lucide-react';

interface StatsCardsProps {
  totalPackets: number;
  totalBytes: number;
  activeConnections: number;
  threatLevel: 'low' | 'medium' | 'high';
  avgLatency: number;
  uptimePercentage: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalPackets,
  totalBytes,
  activeConnections,
  threatLevel,
  avgLatency,
  uptimePercentage
}) => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const cards = [
    {
      title: 'Total Packets',
      value: totalPackets.toLocaleString(),
      icon: <Activity className="w-6 h-6" />,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      trend: '+12.5%'
    },
    {
      title: 'Data Processed',
      value: formatBytes(totalBytes),
      icon: <Database className="w-6 h-6" />,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      trend: '+8.2%'
    },
    {
      title: 'Active Connections',
      value: activeConnections.toLocaleString(),
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-400 bg-green-500/10 border-green-500/20',
      trend: '-2.1%'
    },
    {
      title: 'Threat Level',
      value: threatLevel.charAt(0).toUpperCase() + threatLevel.slice(1),
      icon: <Shield className="w-6 h-6" />,
      color: getThreatLevelColor(threatLevel),
      trend: threatLevel === 'low' ? 'Secure' : 'Monitor'
    },
    {
      title: 'Avg Latency',
      value: `${avgLatency}ms`,
      icon: <Zap className="w-6 h-6" />,
      color: avgLatency < 50 ? 'text-green-400 bg-green-500/10 border-green-500/20' : 
             avgLatency < 100 ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
             'text-red-400 bg-red-500/10 border-red-500/20',
      trend: avgLatency < 50 ? 'Excellent' : avgLatency < 100 ? 'Good' : 'Poor'
    },
    {
      title: 'Uptime',
      value: `${uptimePercentage}%`,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: uptimePercentage > 99 ? 'text-green-400 bg-green-500/10 border-green-500/20' :
             uptimePercentage > 95 ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
             'text-red-400 bg-red-500/10 border-red-500/20',
      trend: `${(730 - (730 * (100 - uptimePercentage) / 100)).toFixed(1)}h`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} border backdrop-blur-sm rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="opacity-80">
              {card.icon}
            </div>
            <div className="text-xs px-2 py-1 bg-black/20 rounded-full">
              {card.trend}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm opacity-80">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;