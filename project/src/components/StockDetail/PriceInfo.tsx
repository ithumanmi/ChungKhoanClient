import React from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Stock } from '../../types/stock';
import { formatNumber, formatCompactNumber, formatPercent, getChangeColor } from '../../utils/format';

interface PriceInfoProps {
  stock: Stock;
}

const PriceInfo: React.FC<PriceInfoProps> = ({ stock }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {stock.symbol}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
            {stock.name}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Cập nhật: {new Date(stock.lastUpdate).toLocaleTimeString('vi-VN')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Current Price */}
        <div className="col-span-2 md:col-span-2 lg:col-span-2">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Giá hiện tại</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatNumber(stock.price)}
            </div>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <div className={`flex items-center space-x-1 ${getChangeColor(stock.change)}`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="font-medium">
                  {stock.change >= 0 ? '+' : ''}{formatNumber(stock.change)}
                </span>
              </div>
              <span className={`font-medium ${getChangeColor(stock.changePercent)}`}>
                ({formatPercent(stock.changePercent)})
              </span>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <div className="text-center p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg border border-danger-200 dark:border-danger-800">
            <div className="text-xs text-danger-600 dark:text-danger-400 mb-1">Giá trần</div>
            <div className="text-lg font-bold text-danger-600 dark:text-danger-400">
              {formatNumber(stock.ceiling)}
            </div>
          </div>
          <div className="text-center p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg border border-warning-200 dark:border-warning-800">
            <div className="text-xs text-warning-600 dark:text-warning-400 mb-1">Tham chiếu</div>
            <div className="text-lg font-bold text-warning-600 dark:text-warning-400">
              {formatNumber(stock.reference)}
            </div>
          </div>
          <div className="text-center p-3 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
            <div className="text-xs text-success-600 dark:text-success-400 mb-1">Giá sàn</div>
            <div className="text-lg font-bold text-success-600 dark:text-success-400">
              {formatNumber(stock.floor)}
            </div>
          </div>
        </div>

        {/* High/Low */}
        <div className="space-y-3">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cao nhất</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatNumber(stock.high)}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Thấp nhất</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatNumber(stock.low)}
            </div>
          </div>
        </div>

        {/* Volume & Value */}
        <div className="space-y-3">
          <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <div className="text-xs text-primary-600 dark:text-primary-400 mb-1">Khối lượng</div>
            <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {formatCompactNumber(stock.volume)}
            </div>
          </div>
          <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <div className="text-xs text-primary-600 dark:text-primary-400 mb-1">Giá trị (tỷ)</div>
            <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {formatCompactNumber(stock.value)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;