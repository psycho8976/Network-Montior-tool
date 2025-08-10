import React from 'react';
import { AlertTriangle, Shield, Activity, X, Clock } from 'lucide-react';
import { Alert } from '../types';
import { format } from 'date-fns';

interface AlertsPanelProps {
  alerts: Alert[];
  onResolveAlert: (alertId: string) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onResolveAlert }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10 text-red-400';
      case 'high': return 'border-orange-500 bg-orange-500/10 text-orange-400';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      case 'low': return 'border-blue-500 bg-blue-500/10 text-blue-400';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'performance': return <Activity className="w-4 h-4" />;
      case 'anomaly': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical').length;
  const highAlerts = activeAlerts.filter(alert => alert.severity === 'high').length;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Active Alerts</h2>
        <div className="flex items-center space-x-2 text-sm">
          {criticalAlerts > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {criticalAlerts} Critical
            </span>
          )}
          {highAlerts > 0 && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {highAlerts} High
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-gray-400">No active alerts</p>
            <p className="text-sm text-gray-500">Network is running smoothly</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-lg ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold capitalize">{alert.type}</span>
                      <span className="text-xs px-2 py-1 bg-gray-700 rounded-full uppercase">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{format(alert.timestamp, 'HH:mm:ss')}</span>
                      </div>
                      {alert.sourceIP && (
                        <span>IP: {alert.sourceIP}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onResolveAlert(alert.id)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded"
                  title="Resolve alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;