import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Eye, Star } from 'lucide-react';
import { Stock } from '../../types/stock';
import { formatNumber, formatCompactNumber, formatPercent, getChangeColor, getChangeBgColor } from '../../utils/format';

interface StockListProps {
  stocks: Stock[];
  title: string;
  showWatchlistButton?: boolean;
}

const StockList: React.FC<StockListProps> = ({ stocks, title, showWatchlistButton = true }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Mã CK
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Thay đổi
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                KL
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                GT
              </th>
              {showWatchlistButton && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {stocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <Link
                      to={`/stock/${stock.symbol}`}
                      className="text-primary-600 dark:text-primary-400 font-bold hover:text-primary-800 
                               dark:hover:text-primary-300 transition-colors"
                    >
                      {stock.symbol}
                    </Link>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {stock.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatNumber(stock.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className={`inline-flex flex-col items-end space-y-1`}>
                    <span className={`text-sm font-medium ${getChangeColor(stock.change)}`}>
                      {stock.change >= 0 ? '+' : ''}{formatNumber(stock.change)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getChangeBgColor(stock.changePercent)}`}>
                      {formatPercent(stock.changePercent)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {formatCompactNumber(stock.volume)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {formatCompactNumber(stock.value)}
                  </div>
                </td>
                {showWatchlistButton && (
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        to={`/stock/${stock.symbol}`}
                        className="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 
                                 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-1 text-gray-400 hover:text-warning-600 transition-colors"
                        title="Thêm vào danh sách theo dõi"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <Link
          to="/market"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-800 
                   dark:hover:text-primary-300 font-medium text-sm transition-colors"
        >
          Xem tất cả →
        </Link>
      </div>
    </div>
  );
};

export default StockList;