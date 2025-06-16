import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Bell, Share2, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PriceInfo from '../components/StockDetail/PriceInfo';
import StockChart from '../components/StockDetail/StockChart';
import OrderBook from '../components/StockDetail/OrderBook';
import FinancialMetrics from '../components/StockDetail/FinancialMetrics';
import CompanyInfo from '../components/StockDetail/CompanyInfo';
import FinancialReports from '../components/StockDetail/FinancialReports';
import RelatedNews from '../components/StockDetail/RelatedNews';
import { mockTopStocks } from '../data/mockData';

const StockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Find stock data - in real app, this would be fetched from API
  const stock = mockTopStocks.find(s => s.symbol === symbol?.toUpperCase()) || mockTopStocks[0];

  const tabs = [
    { id: 'overview', name: 'Tổng quan', description: 'Thông tin giá và biểu đồ' },
    { id: 'financials', name: 'Tài chính', description: 'Chỉ số và báo cáo tài chính' },
    { id: 'company', name: 'Công ty', description: 'Thông tin doanh nghiệp' },
    { id: 'news', name: 'Tin tức', description: 'Tin tức và sự kiện' },
  ];

  const handleAddToWatchlist = () => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }
    setIsInWatchlist(!isInWatchlist);
  };

  const handleSetAlert = () => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }
    // Open alert modal
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${stock.symbol} - ${stock.name}`,
        text: `Xem thông tin chi tiết cổ phiếu ${stock.symbol}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chi tiết cổ phiếu {stock.symbol}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Thông tin chi tiết và phân tích chuyên sâu
            </p>
          </div>
          
          {user && (
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={handleAddToWatchlist}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isInWatchlist
                    ? 'bg-warning-100 dark:bg-warning-900/20 text-warning-700 dark:text-warning-300 border border-warning-300 dark:border-warning-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Star className={`h-4 w-4 ${isInWatchlist ? 'fill-current' : ''}`} />
                <span>{isInWatchlist ? 'Đã theo dõi' : 'Theo dõi'}</span>
              </button>
              
              <button
                onClick={handleSetAlert}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span>Cảnh báo</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Chia sẻ</span>
              </button>
            </div>
          )}
        </div>

        {/* Price Information */}
        <div className="mb-8">
          <PriceInfo stock={stock} />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div>{tab.name}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {tab.description}
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <>
              <StockChart symbol={stock.symbol} />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <FinancialMetrics stock={stock} />
                </div>
                <div>
                  <OrderBook orderBook={{ buy: [], sell: [] }} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-8">
              <FinancialReports symbol={stock.symbol} />
              <FinancialMetrics stock={stock} />
            </div>
          )}

          {activeTab === 'company' && (
            <CompanyInfo symbol={stock.symbol} />
          )}

          {activeTab === 'news' && (
            <RelatedNews symbol={stock.symbol} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetail;