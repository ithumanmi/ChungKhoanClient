import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketIndex } from '../../types/stock';
import { formatNumber, formatPercent, getChangeColor } from '../../utils/format';

interface MarketIndicesProps {
  indices: MarketIndex[];
}

const MarketIndices: React.FC<MarketIndicesProps> = ({ indices }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Chỉ số thị trường
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Cập nhật: {new Date().toLocaleTimeString('vi-VN')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((index) => (
          <div
            key={index.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 
                     hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {index.name}
              </h3>
              <div className="flex items-center">
                {index.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-danger-600" />
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(index.value, 2)}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getChangeColor(index.change)}`}>
                  {index.change >= 0 ? '+' : ''}{formatNumber(index.change, 2)}
                </span>
                <span className={`text-sm font-medium ${getChangeColor(index.changePercent)}`}>
                  ({formatPercent(index.changePercent)})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketIndices;