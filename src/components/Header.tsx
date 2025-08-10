import React from 'react';
import { Activity, Shield, AlertTriangle, Server } from 'lucide-react';

interface HeaderProps {
  activeAlerts: number;
  networkStatus: 'healthy' | 'warning' | 'critical';
}

const Header: React.FC<HeaderProps> = ({ activeAlerts, networkStatus }) => {
  const getStatusColor = () => {
    switch (networkStatus) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (networkStatus) {
      case 'healthy': return <Activity className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'critical': return <Shield className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  return (
    <header className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Network Monitor</h1>
            <p className="text-gray-400 text-sm">Real-time network traffic analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`${getStatusColor()} flex items-center space-x-1`}>
              {getStatusIcon()}
              <span className="font-semibold capitalize">{networkStatus}</span>
            </div>
          </div>
          
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-semibold">{activeAlerts}</span>
              <span className="text-gray-400 text-sm">Active Alerts</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-400 to-cyan-500 w-3 h-3 rounded-full animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;