import React from 'react';
import { Globe, TrendingUp, Database } from 'lucide-react';
import { TopIP } from '../types';

interface TopIPsTableProps {
  data: TopIP[];
}

const TopIPsTable: React.FC<TopIPsTableProps> = ({ data }) => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Top Source IPs</span>
        </h2>
        <div className="text-sm text-gray-400">
          Last 24 hours
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-2 text-gray-300 font-semibold">Rank</th>
              <th className="text-left py-3 px-2 text-gray-300 font-semibold">IP Address</th>
              <th className="text-left py-3 px-2 text-gray-300 font-semibold">Country</th>
              <th className="text-right py-3 px-2 text-gray-300 font-semibold">Packets</th>
              <th className="text-right py-3 px-2 text-gray-300 font-semibold">Data</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 8).map((ip, index) => (
              <tr 
                key={ip.ip} 
                className="border-b border-gray-800 hover:bg-gray-700/30 transition-colors"
              >
                <td className="py-3 px-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="font-mono text-white">{ip.ip}</div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{ip.country}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="text-white font-semibold">{ip.packets.toLocaleString()}</span>
                </td>
                <td className="py-3 px-2 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Database className="w-3 h-3 text-gray-400" />
                    <span className="text-white font-semibold">{formatBytes(ip.bytes)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
          View All IPs →
        </button>
      </div>
    </div>
  );
};

export default TopIPsTable;