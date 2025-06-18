import React, { useState } from 'react';
import { Bell, Plus, Edit, Trash2, TrendingUp, TrendingDown, Volume2, Percent } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatNumber } from '../utils/format';

interface Alert {
  id: string;
  symbol: string;
  name: string;
  type: 'price_above' | 'price_below' | 'volume_above' | 'percent_change';
  value: number;
  currentValue: number;
  isActive: boolean;
  isTriggered: boolean;
  createdAt: string;
  triggeredAt?: string;
}

const Alerts: React.FC = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'triggered'>('all');

  // Mock alerts data
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      symbol: 'VCB',
      name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
      type: 'price_above',
      value: 90000,
      currentValue: 88500,
      isActive: true,
      isTriggered: false,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      symbol: 'VHM',
      name: 'CTCP Vinhomes',
      type: 'price_below',
      value: 65000,
      currentValue: 65800,
      isActive: true,
      isTriggered: false,
      createdAt: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      symbol: 'HPG',
      name: 'CTCP Tập đoàn Hòa Phát',
      type: 'volume_above',
      value: 5000000,
      currentValue: 3567890,
      isActive: true,
      isTriggered: false,
      createdAt: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      symbol: 'FPT',
      name: 'CTCP FPT',
      type: 'percent_change',
      value: 5,
      currentValue: 4.75,
      isActive: false,
      isTriggered: true,
      createdAt: '2024-01-12T11:45:00Z',
      triggeredAt: '2024-01-12T15:30:00Z'
    },
    {
      id: '5',
      symbol: 'MWG',
      name: 'CTCP Đầu tư Thế Giới Di Động',
      type: 'price_below',
      value: 70000,
      currentValue: 67800,
      isActive: false,
      isTriggered: true,
      createdAt: '2024-01-10T16:00:00Z',
      triggeredAt: '2024-01-11T10:20:00Z'
    }
  ]);

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'active':
        return alert.isActive && !alert.isTriggered;
      case 'triggered':
        return alert.isTriggered;
      default:
        return true;
    }
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price_above':
        return <TrendingUp className="h-5 w-5 text-success-600" />;
      case 'price_below':
        return <TrendingDown className="h-5 w-5 text-danger-600" />;
      case 'volume_above':
        return <Volume2 className="h-5 w-5 text-primary-600" />;
      case 'percent_change':
        return <Percent className="h-5 w-5 text-warning-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertTypeText = (type: string) => {
    switch (type) {
      case 'price_above':
        return 'Giá vượt';
      case 'price_below':
        return 'Giá dưới';
      case 'volume_above':
        return 'KL vượt';
      case 'percent_change':
        return '% thay đổi';
      default:
        return type;
    }
  };

  const getAlertStatus = (alert: Alert) => {
    if (alert.isTriggered) {
      return { text: 'Đã kích hoạt', color: 'text-success-600 bg-success-50 border-success-200' };
    }
    if (alert.isActive) {
      return { text: 'Đang theo dõi', color: 'text-primary-600 bg-primary-50 border-primary-200' };
    }
    return { text: 'Tạm dừng', color: 'text-gray-600 bg-gray-50 border-gray-200' };
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Đăng nhập để sử dụng Cảnh báo
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thiết lập cảnh báo thông minh cho các mã chứng khoán
          </p>
          <a
            href="/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Đăng nhập ngay
          </a>
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
                <Bell className="h-8 w-8 mr-3 text-warning-500" />
                Cảnh báo thông minh
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Thiết lập và quản lý các cảnh báo cho mã chứng khoán
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Tạo cảnh báo mới</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { key: 'all', label: 'Tất cả', count: alerts.length },
              { key: 'active', label: 'Đang hoạt động', count: alerts.filter(a => a.isActive && !a.isTriggered).length },
              { key: 'triggered', label: 'Đã kích hoạt', count: alerts.filter(a => a.isTriggered).length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Danh sách cảnh báo ({filteredAlerts.length})
            </h2>
          </div>

          {filteredAlerts.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAlerts.map((alert) => {
                const status = getAlertStatus(alert);
                return (
                  <div key={alert.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getAlertIcon(alert.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {alert.symbol}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                              {status.text}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {alert.name}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Điều kiện: </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {getAlertTypeText(alert.type)} {formatNumber(alert.value)}
                                {alert.type.includes('percent') ? '%' : ''}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Hiện tại: </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formatNumber(alert.currentValue)}
                                {alert.type.includes('percent') ? '%' : ''}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Tạo: {new Date(alert.createdAt).toLocaleDateString('vi-VN')}
                            {alert.triggeredAt && (
                              <span className="ml-4">
                                Kích hoạt: {new Date(alert.triggeredAt).toLocaleDateString('vi-VN')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-danger-600 dark:hover:text-danger-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {filter === 'all' ? 'Chưa có cảnh báo nào' : 
                 filter === 'active' ? 'Không có cảnh báo đang hoạt động' : 
                 'Không có cảnh báo nào đã kích hoạt'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Tạo cảnh báo để nhận thông báo khi có biến động quan trọng
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Tạo cảnh báo đầu tiên</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {alerts.filter(a => a.isActive && !a.isTriggered).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Đang theo dõi</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                {alerts.filter(a => a.isTriggered).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Đã kích hoạt</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
                {alerts.filter(a => a.type === 'price_above' || a.type === 'price_below').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cảnh báo giá</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {alerts.filter(a => !a.isActive && !a.isTriggered).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tạm dừng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;