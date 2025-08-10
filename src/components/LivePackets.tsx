import React, { useState } from 'react';
import { NetworkPacket } from '../types';
import { format } from 'date-fns';
import { Filter, Search, AlertCircle, CheckCircle } from 'lucide-react';

interface LivePacketsProps {
  packets: NetworkPacket[];
}

const LivePackets: React.FC<LivePacketsProps> = ({ packets }) => {
  const [filter, setFilter] = useState<'all' | 'anomalies'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPackets = packets.filter(packet => {
    const matchesFilter = filter === 'all' || (filter === 'anomalies' && packet.isAnomaly);
    const matchesSearch = searchTerm === '' || 
      packet.sourceIP.includes(searchTerm) || 
      packet.destinationIP.includes(searchTerm) ||
      packet.protocol.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case 'HTTP': return 'bg-blue-500';
      case 'HTTPS': return 'bg-green-500';
      case 'TCP': return 'bg-yellow-500';
      case 'UDP': return 'bg-red-500';
      case 'ICMP': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Live Packet Monitor</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search IP, protocol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'anomalies')}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Packets</option>
              <option value="anomalies">Anomalies Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-2 text-gray-300 font-semibold">Time</th>
              <th className="text-left py-2 px-2 text-gray-300 font-semibold">Protocol</th>
              <th className="text-left py-2 px-2 text-gray-300 font-semibold">Source IP</th>
              <th className="text-left py-2 px-2 text-gray-300 font-semibold">Dest IP</th>
              <th className="text-right py-2 px-2 text-gray-300 font-semibold">Port</th>
              <th className="text-right py-2 px-2 text-gray-300 font-semibold">Size</th>
              <th className="text-center py-2 px-2 text-gray-300 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {filteredPackets.slice(0, 50).map((packet) => (
              <tr 
                key={packet.id}
                className={`border-b border-gray-800 hover:bg-gray-700/30 transition-colors ${packet.isAnomaly ? 'bg-red-500/5' : ''}`}
              >
                <td className="py-2 px-2 text-gray-400">
                  {format(packet.timestamp, 'HH:mm:ss.SSS')}
                </td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getProtocolColor(packet.protocol)}`}>
                    {packet.protocol}
                  </span>
                </td>
                <td className="py-2 px-2 text-gray-300">
                  {packet.sourceIP}
                </td>
                <td className="py-2 px-2 text-gray-300">
                  {packet.destinationIP}
                </td>
                <td className="py-2 px-2 text-right text-gray-300">
                  {packet.port}
                </td>
                <td className="py-2 px-2 text-right text-white">
                  {packet.size.toLocaleString()} B
                </td>
                <td className="py-2 px-2 text-center">
                  {packet.isAnomaly ? (
                    <div className="flex items-center justify-center space-x-1">
                      <AlertCircle className={`w-4 h-4 ${getSeverityColor(packet.severity)}`} />
                      <span className={`text-xs ${getSeverityColor(packet.severity)}`}>
                        {packet.severity.toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPackets.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No packets match your filter</div>
          <button
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
            className="text-cyan-400 hover:text-cyan-300 text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default LivePackets;