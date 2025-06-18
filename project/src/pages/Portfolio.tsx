import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Briefcase, TrendingUp, TrendingDown, Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatNumber, formatCompactNumber, formatPercent, getChangeColor } from '../utils/format';

interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  weight: number;
}

const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock portfolio data
  const [holdings] = useState<PortfolioHolding[]>([
    {
      id: '1',
      symbol: 'VCB',
      name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
      quantity: 1000,
      averagePrice: 85000,
      currentPrice: 88500,
      totalCost: 85000000,
      currentValue: 88500000,
      profitLoss: 3500000,
      profitLossPercent: 4.12,
      weight: 35.2
    },
    {
      id: '2',
      symbol: 'VHM',
      name: 'CTCP Vinhomes',
      quantity: 500,
      averagePrice: 68000,
      currentPrice: 65800,
      totalCost: 34000000,
      currentValue: 32900000,
      profitLoss: -1100000,
      profitLossPercent: -3.24,
      weight: 13.1
    },
    {
      id: '3',
      symbol: 'HPG',
      name: 'CTCP Tập đoàn Hòa Phát',
      quantity: 2000,
      averagePrice: 24500,
      currentPrice: 25600,
      totalCost: 49000000,
      currentValue: 51200000,
      profitLoss: 2200000,
      profitLossPercent: 4.49,
      weight: 20.4
    },
    {
      id: '4',
      symbol: 'FPT',
      name: 'CTCP FPT',
      quantity: 300,
      averagePrice: 120000,
      currentPrice: 123400,
      totalCost: 36000000,
      currentValue: 37020000,
      profitLoss: 1020000,
      profitLossPercent: 2.83,
      weight: 14.7
    },
    {
      id: '5',
      symbol: 'MWG',
      name: 'CTCP Đầu tư Thế Giới Di Động',
      quantity: 800,
      averagePrice: 70000,
      currentPrice: 67800,
      totalCost: 56000000,
      currentValue: 54240000,
      profitLoss: -1760000,
      profitLossPercent: -3.14,
      weight: 21.6
    }
  ]);

  const totalCost = holdings.reduce((sum, holding) => sum + holding.totalCost, 0);
  const totalCurrentValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
  const totalProfitLoss = totalCurrentValue - totalCost;
  const totalProfitLossPercent = (totalProfitLoss / totalCost) * 100;

  const pieData = holdings.map(holding => ({
    name: holding.symbol,
    value: holding.weight,
    currentValue: holding.currentValue
  }));

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tỷ trọng: {data.value.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Giá trị: {formatCompactNumber(data.currentValue)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Đăng nhập để quản lý Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Theo dõi danh mục đầu tư và hiệu suất của bạn
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
                <Briefcase className="h-8 w-8 mr-3 text-primary-600" />
                Danh mục đầu tư
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Quản lý và theo dõi hiệu suất danh mục của bạn
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Thêm giao dịch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng giá trị</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCompactNumber(totalCurrentValue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vốn đầu tư</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCompactNumber(totalCost)}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lãi/Lỗ</p>
                <p className={`text-2xl font-bold ${getChangeColor(totalProfitLoss)}`}>
                  {totalProfitLoss >= 0 ? '+' : ''}{formatCompactNumber(totalProfitLoss)}
                </p>
              </div>
              {totalProfitLoss >= 0 ? (
                <TrendingUp className="h-8 w-8 text-success-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-danger-600" />
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">% Lãi/Lỗ</p>
                <p className={`text-2xl font-bold ${getChangeColor(totalProfitLossPercent)}`}>
                  {formatPercent(totalProfitLossPercent)}
                </p>
              </div>
              {totalProfitLossPercent >= 0 ? (
                <TrendingUp className="h-8 w-8 text-success-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-danger-600" />
              )}
            </div>
          </div>
        </div>

        {/* Charts and Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Allocation Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Phân bổ danh mục
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-gray-900 dark:text-white">{entry.name}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">{entry.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Danh sách nắm giữ ({holdings.length} mã)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Mã CK
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        SL
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Giá TB
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Giá HT
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Lãi/Lỗ
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {holdings.map((holding) => (
                      <tr key={holding.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div>
                            <Link
                              to={`/stock/${holding.symbol}`}
                              className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-800"
                            >
                              {holding.symbol}
                            </Link>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                              {holding.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatNumber(holding.quantity)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatNumber(holding.averagePrice)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatNumber(holding.currentPrice)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end space-y-1">
                            <div className={`text-sm font-medium ${getChangeColor(holding.profitLoss)}`}>
                              {holding.profitLoss >= 0 ? '+' : ''}{formatCompactNumber(holding.profitLoss)}
                            </div>
                            <div className={`text-xs ${getChangeColor(holding.profitLossPercent)}`}>
                              ({formatPercent(holding.profitLossPercent)})
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-danger-600 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hiệu suất theo mã
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={holdings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symbol" />
                <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Lãi/Lỗ %']}
                  labelFormatter={(label) => `Mã: ${label}`}
                />
                <Bar 
                  dataKey="profitLossPercent" 
                  fill={(entry: any) => entry.profitLossPercent >= 0 ? '#10B981' : '#EF4444'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;