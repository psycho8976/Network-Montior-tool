import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ProtocolStats } from '../types';

interface ProtocolChartProps {
  data: ProtocolStats[];
}

const ProtocolChart: React.FC<ProtocolChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-800 border border-gray-600 p-3 rounded-lg shadow-lg">
          <p className="text-white font-semibold">{data.payload.protocol}</p>
          <p className="text-gray-300">{`Packets: ${data.payload.packets.toLocaleString()}`}</p>
          <p className="text-gray-300">{`Percentage: ${data.payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Protocol Distribution</h2>
      
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={100}
              paddingAngle={2}
              dataKey="packets"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#e5e7eb' }}
              formatter={(value: string, entry: any) => (
                <span style={{ color: entry.color }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((protocol) => (
          <div key={protocol.protocol} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: protocol.color }}
              ></div>
              <span className="text-gray-300">{protocol.protocol}</span>
            </div>
            <span className="text-white font-semibold">{protocol.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolChart;