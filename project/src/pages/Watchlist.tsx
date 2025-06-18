import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown, Eye, Trash2, Plus, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Stock } from '../types/stock';
import { formatNumber, formatCompactNumber, formatPercent, getChangeColor, getChangeBgColor } from '../utils/format';
import { mockTopStocks } from '../data/mockData';

const Watchlist: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'symbol' | 'change' | 'volume'>('symbol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Mock watchlist data - in real app, this would come from API
  const [watchlistStocks] = useState<Stock[]>(mockTopStocks.slice(0, 4));

  const filteredStocks = watchlistStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    switch (sortBy) {
      case 'symbol':
        aValue = a.symbol;
        bValue = b.symbol;
        break;
      case 'change':
        aValue = a.changePercent;
        bValue = b.changePercent;
        break;
      case 'volume':
        aValue = a.volume;
        bValue = b.volume;
        break;
      default:
        aValue = a.symbol;
        bValue = b.symbol;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
  });

  const handleSort = (field: 'symbol' | 'change' | 'volume') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const removeFromWatchlist = (stockId: string) => {
    // In real app, this would call API to remove from watchlist
    console.log('Remove from watchlist:', stockId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Đăng nhập để sử dụng Watchlist
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Theo dõi các mã chứng khoán yêu thích của bạn
          </p>
          <Link
            to="/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <Star className="h-8 w-8 mr-3 text-warning-500" />
                Danh sách theo dõi
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Theo dõi các mã chứng khoán yêu thích của bạn
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <Link
                to="/market"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Thêm mã mới</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm mã chứng khoán..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sắp xếp theo:</span>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as 'symbol' | 'change' | 'volume');
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="symbol-asc">Mã A-Z</option>
                <option value="symbol-desc">Mã Z-A</option>
                <option value="change-desc">Tăng nhiều nhất</option>
                <option value="change-asc">Giảm nhiều nhất</option>
                <option value="volume-desc">Khối lượng cao</option>
                <option value="volume-asc">Khối lượng thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Watchlist Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Danh sách theo dõi ({sortedStocks.length} mã)
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Cập nhật: {new Date().toLocaleTimeString('vi-VN')}
              </div>
            </div>
          </div>

          {sortedStocks.length > 0 ? (
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
                      Khối lượng
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Giá trị
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedStocks.map((stock) => (
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
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatNumber(stock.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex flex-col items-end space-y-1">
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
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Link
                            to={`/stock/${stock.symbol}`}
                            className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 
                                     transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => removeFromWatchlist(stock.id)}
                            className="p-2 text-gray-400 hover:text-danger-600 dark:hover:text-danger-400 
                                     transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            title="Xóa khỏi danh sách"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchQuery ? 'Không tìm thấy mã chứng khoán' : 'Danh sách theo dõi trống'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {searchQuery 
                  ? 'Thử tìm kiếm với từ khóa khác'
                  : 'Thêm các mã chứng khoán yêu thích vào danh sách theo dõi'
                }
              </p>
              <Link
                to="/market"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Khám phá thị trường</span>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {sortedStocks.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                  {sortedStocks.filter(s => s.changePercent > 0).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Mã tăng giá</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-danger-600 dark:text-danger-400">
                  {sortedStocks.filter(s => s.changePercent < 0).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Mã giảm giá</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
                  {sortedStocks.filter(s => s.changePercent === 0).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Mã đứng giá</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCompactNumber(sortedStocks.reduce((sum, s) => sum + s.value, 0))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tổng giá trị</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;