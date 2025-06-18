import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Users, Bell } from 'lucide-react';
import MarketIndices from '../components/Home/MarketIndices';
import StockList from '../components/Home/StockList';
import { useStocks } from '../hooks/useApi';
import { mockMarketIndices } from '../data/mockData';

const Home: React.FC = () => {
  // Sử dụng API để lấy danh sách cổ phiếu
  const { data: stocksData, isLoading: stocksLoading, error: stocksError } = useStocks(1, 10);

  // Tách dữ liệu thành 2 nhóm: top stocks và hot stocks
  const topStocks = stocksData?.data?.slice(0, 5) || [];
  const hotStocks = stocksData?.data?.slice(5, 10) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              Thị trường chứng khoán Việt Nam
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-slide-up">
              Theo dõi thông tin thời gian thực, phân tích chuyên sâu và quản lý danh mục đầu tư hiệu quả
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                to="/market"
                className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold 
                         hover:bg-gray-100 transition-colors shadow-lg"
              >
                Khám phá thị trường
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold 
                         hover:bg-white hover:text-primary-600 transition-colors"
              >
                Đăng ký miễn phí
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Indices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MarketIndices indices={mockMarketIndices} />
      </section>

      {/* Stock Lists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stocksLoading ? (
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : stocksError ? (
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <p className="text-red-500 text-center">
                  Không thể tải dữ liệu cổ phiếu: {(stocksError as Error).message}
                </p>
              </div>
            </div>
          ) : (
            <>
              <StockList 
                stocks={topStocks} 
                title="Cổ phiếu vốn hóa lớn" 
              />
              <StockList 
                stocks={hotStocks} 
                title="Cổ phiếu được quan tâm" 
              />
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Những công cụ và tính năng giúp bạn đầu tư thông minh và hiệu quả hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center 
                            mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Thông tin thời gian thực
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Cập nhật giá cổ phiếu, khối lượng giao dịch và chỉ số thị trường liên tục
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center 
                            mx-auto mb-4 group-hover:bg-success-200 dark:group-hover:bg-success-800 transition-colors">
                <BarChart3 className="h-8 w-8 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Phân tích kỹ thuật
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Biểu đồ tương tác với các chỉ báo kỹ thuật chuyên nghiệp
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center 
                            mx-auto mb-4 group-hover:bg-warning-200 dark:group-hover:bg-warning-800 transition-colors">
                <Bell className="h-8 w-8 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cảnh báo thông minh
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Thiết lập cảnh báo giá, khối lượng và các sự kiện quan trọng
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-danger-100 dark:bg-danger-900 rounded-lg flex items-center justify-center 
                            mx-auto mb-4 group-hover:bg-danger-200 dark:group-hover:bg-danger-800 transition-colors">
                <Users className="h-8 w-8 text-danger-600 dark:text-danger-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cộng đồng đầu tư
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Tham gia thảo luận và chia sẻ kinh nghiệm với các nhà đầu tư khác
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Bắt đầu hành trình đầu tư của bạn
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Tham gia cộng đồng hơn 100,000 nhà đầu tư thông minh đang sử dụng VietStock
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg 
                       font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              Đăng ký ngay - Miễn phí
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;