import React, { useState } from 'react';
import { LineChart, Line, CandlestickChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockChartProps {
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
  const [indicators, setIndicators] = useState<string[]>([]);

  // Mock chart data - in real app, this would come from API
  const mockChartData: ChartData[] = [
    { time: '09:00', open: 86000, high: 87000, low: 85500, close: 86500, volume: 125000 },
    { time: '09:15', open: 86500, high: 88000, low: 86200, close: 87200, volume: 180000 },
    { time: '09:30', open: 87200, high: 88500, low: 86800, close: 88000, volume: 220000 },
    { time: '09:45', open: 88000, high: 89000, low: 87500, close: 88500, volume: 195000 },
    { time: '10:00', open: 88500, high: 89200, low: 88000, close: 88800, volume: 165000 },
    { time: '10:15', open: 88800, high: 89500, low: 88300, close: 89000, volume: 210000 },
    { time: '10:30', open: 89000, high: 89800, low: 88700, close: 89200, volume: 175000 },
    { time: '10:45', open: 89200, high: 89600, low: 88900, close: 89400, volume: 155000 },
    { time: '11:00', open: 89400, high: 90000, low: 89100, close: 89700, volume: 190000 },
    { time: '11:15', open: 89700, high: 90200, low: 89300, close: 89800, volume: 170000 },
  ];

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: 'YTD', value: 'YTD' },
    { label: 'MAX', value: 'MAX' },
  ];

  const technicalIndicators = [
    { label: 'MA20', value: 'ma20' },
    { label: 'MA50', value: 'ma50' },
    { label: 'RSI', value: 'rsi' },
    { label: 'MACD', value: 'macd' },
  ];

  const toggleIndicator = (indicator: string) => {
    setIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Mở cửa:</span>
              <span className="font-medium text-gray-900 dark:text-white">{data.open?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Cao nhất:</span>
              <span className="font-medium text-success-600">{data.high?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Thấp nhất:</span>
              <span className="font-medium text-danger-600">{data.low?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Đóng cửa:</span>
              <span className="font-medium text-gray-900 dark:text-white">{data.close?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Khối lượng:</span>
              <span className="font-medium text-primary-600">{data.volume?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Biểu đồ giá {symbol}
            </h2>
            
            {/* Chart Type Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  chartType === 'line'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Đường
              </button>
              <button
                onClick={() => setChartType('candlestick')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  chartType === 'candlestick'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Nến
              </button>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex flex-wrap gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === tf.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Indicators */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Chỉ báo kỹ thuật:</span>
          {technicalIndicators.map((indicator) => (
            <button
              key={indicator.value}
              onClick={() => toggleIndicator(indicator.value)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                indicators.includes(indicator.value)
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {indicator.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {chartType === 'line' ? (
                <Line 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#2563EB' }}
                />
              ) : (
                // Simplified candlestick representation using multiple lines
                <>
                  <Line type="monotone" dataKey="high" stroke="#10B981" strokeWidth={1} dot={false} />
                  <Line type="monotone" dataKey="low" stroke="#EF4444" strokeWidth={1} dot={false} />
                  <Line type="monotone" dataKey="close" stroke="#2563EB" strokeWidth={2} dot={false} />
                </>
              )}

              {/* Technical Indicators */}
              {indicators.includes('ma20') && (
                <Line 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#F59E0B" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
              {indicators.includes('ma50') && (
                <Line 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#8B5CF6" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StockChart;