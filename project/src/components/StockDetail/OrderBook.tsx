import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { OrderBook as OrderBookType } from '../../types/stock';
import { formatNumber, formatCompactNumber } from '../../utils/format';

interface OrderBookProps {
  orderBook: OrderBookType;
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook }) => {
  // Mock order book data
  const mockOrderBook: OrderBookType = {
    buy: [
      { price: 88000, volume: 15000 },
      { price: 87500, volume: 25000 },
      { price: 87000, volume: 18000 },
      { price: 86500, volume: 32000 },
      { price: 86000, volume: 28000 },
      { price: 85500, volume: 22000 },
      { price: 85000, volume: 35000 },
      { price: 84500, volume: 19000 },
      { price: 84000, volume: 41000 },
      { price: 83500, volume: 26000 },
    ],
    sell: [
      { price: 88500, volume: 12000 },
      { price: 89000, volume: 20000 },
      { price: 89500, volume: 16000 },
      { price: 90000, volume: 28000 },
      { price: 90500, volume: 24000 },
      { price: 91000, volume: 18000 },
      { price: 91500, volume: 31000 },
      { price: 92000, volume: 15000 },
      { price: 92500, volume: 37000 },
      { price: 93000, volume: 21000 },
    ]
  };

  const maxBuyVolume = Math.max(...mockOrderBook.buy.map(item => item.volume));
  const maxSellVolume = Math.max(...mockOrderBook.sell.map(item => item.volume));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Sổ lệnh
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Danh sách lệnh mua/bán đang chờ khớp
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">
        {/* Buy Orders */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-success-600 dark:text-success-400 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Lệnh mua
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Tổng: {formatCompactNumber(mockOrderBook.buy.reduce((sum, item) => sum + item.volume, 0))}
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
              <div>Giá</div>
              <div className="text-right">KL</div>
              <div className="text-right">Tỷ lệ</div>
            </div>
            
            {mockOrderBook.buy.map((order, index) => {
              const volumePercent = (order.volume / maxBuyVolume) * 100;
              return (
                <div key={index} className="relative">
                  <div 
                    className="absolute inset-0 bg-success-50 dark:bg-success-900/20 rounded"
                    style={{ width: `${volumePercent}%` }}
                  />
                  <div className="relative grid grid-cols-3 gap-4 py-1 px-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded transition-colors">
                    <div className="font-medium text-success-600 dark:text-success-400">
                      {formatNumber(order.price)}
                    </div>
                    <div className="text-right text-gray-900 dark:text-white">
                      {formatCompactNumber(order.volume)}
                    </div>
                    <div className="text-right text-gray-500 dark:text-gray-400">
                      {volumePercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sell Orders */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-danger-600 dark:text-danger-400 flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Lệnh bán
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Tổng: {formatCompactNumber(mockOrderBook.sell.reduce((sum, item) => sum + item.volume, 0))}
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
              <div>Giá</div>
              <div className="text-right">KL</div>
              <div className="text-right">Tỷ lệ</div>
            </div>
            
            {mockOrderBook.sell.reverse().map((order, index) => {
              const volumePercent = (order.volume / maxSellVolume) * 100;
              return (
                <div key={index} className="relative">
                  <div 
                    className="absolute inset-0 bg-danger-50 dark:bg-danger-900/20 rounded"
                    style={{ width: `${volumePercent}%` }}
                  />
                  <div className="relative grid grid-cols-3 gap-4 py-1 px-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded transition-colors">
                    <div className="font-medium text-danger-600 dark:text-danger-400">
                      {formatNumber(order.price)}
                    </div>
                    <div className="text-right text-gray-900 dark:text-white">
                      {formatCompactNumber(order.volume)}
                    </div>
                    <div className="text-right text-gray-500 dark:text-gray-400">
                      {volumePercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tổng lệnh mua</div>
            <div className="text-lg font-bold text-success-600 dark:text-success-400">
              {formatCompactNumber(mockOrderBook.buy.reduce((sum, item) => sum + item.volume, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tổng lệnh bán</div>
            <div className="text-lg font-bold text-danger-600 dark:text-danger-400">
              {formatCompactNumber(mockOrderBook.sell.reduce((sum, item) => sum + item.volume, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;