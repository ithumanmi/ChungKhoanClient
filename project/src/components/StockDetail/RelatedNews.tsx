import React, { useState } from 'react';
import { Newspaper, Clock, ExternalLink, Filter } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  category: string;
  url: string;
  impact: 'positive' | 'negative' | 'neutral';
}

interface RelatedNewsProps {
  symbol: string;
}

const RelatedNews: React.FC<RelatedNewsProps> = ({ symbol }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock news data
  const newsData: NewsItem[] = [
    {
      id: '1',
      title: 'VCB báo lãi quý 3/2024 tăng 15% so với cùng kỳ năm trước',
      summary: 'Ngân hàng TMCP Ngoại thương Việt Nam (VCB) công bố kết quả kinh doanh quý 3/2024 với lợi nhuận trước thuế đạt 8.234 tỷ đồng, tăng 15% so với cùng kỳ năm 2023.',
      source: 'VnExpress',
      publishedAt: '2024-10-25T10:30:00Z',
      category: 'earnings',
      url: '#',
      impact: 'positive'
    },
    {
      id: '2',
      title: 'VCB được Moody\'s nâng hạng tín nhiệm lên Ba1',
      summary: 'Moody\'s Investors Service đã nâng hạng tín nhiệm dài hạn của VCB từ Ba2 lên Ba1 với triển vọng ổn định, phản ánh vị thế mạnh mẽ của ngân hàng trong hệ thống.',
      source: 'Đầu tư Chứng khoán',
      publishedAt: '2024-10-24T14:15:00Z',
      category: 'rating',
      url: '#',
      impact: 'positive'
    },
    {
      id: '3',
      title: 'NHNN điều chỉnh chính sách tiền tệ, tác động đến ngành ngân hàng',
      summary: 'Ngân hàng Nhà nước công bố điều chỉnh lãi suất điều hành, dự kiến sẽ có tác động tích cực đến hoạt động kinh doanh của các ngân hàng thương mại.',
      source: 'Thời báo Kinh tế',
      publishedAt: '2024-10-23T16:45:00Z',
      category: 'policy',
      url: '#',
      impact: 'positive'
    },
    {
      id: '4',
      title: 'VCB mở rộng mạng lưới chi nhánh tại khu vực phía Nam',
      summary: 'Vietcombank tiếp tục chiến lược mở rộng với việc khai trương 5 chi nhánh mới tại TP.HCM và các tỉnh lân cận, nhằm tăng cường phục vụ khách hàng.',
      source: 'Báo Đầu tư',
      publishedAt: '2024-10-22T09:20:00Z',
      category: 'business',
      url: '#',
      impact: 'positive'
    },
    {
      id: '5',
      title: 'Cảnh báo rủi ro tín dụng trong bối cảnh kinh tế khó khăn',
      summary: 'Các chuyên gia tài chính cảnh báo về rủi ro tín dụng gia tăng trong bối cảnh kinh tế gặp khó khăn, có thể ảnh hưởng đến kết quả kinh doanh của các ngân hàng.',
      source: 'Tài chính Doanh nghiệp',
      publishedAt: '2024-10-21T11:30:00Z',
      category: 'analysis',
      url: '#',
      impact: 'negative'
    },
    {
      id: '6',
      title: 'VCB ký kết hợp tác chiến lược với đối tác quốc tế',
      summary: 'Vietcombank vừa ký kết thỏa thuận hợp tác với ngân hàng hàng đầu Nhật Bản để phát triển các sản phẩm dịch vụ tài chính hiện đại.',
      source: 'Vietnam Finance',
      publishedAt: '2024-10-20T13:45:00Z',
      category: 'partnership',
      url: '#',
      impact: 'positive'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', count: newsData.length },
    { id: 'earnings', name: 'Kết quả kinh doanh', count: newsData.filter(n => n.category === 'earnings').length },
    { id: 'business', name: 'Hoạt động kinh doanh', count: newsData.filter(n => n.category === 'business').length },
    { id: 'policy', name: 'Chính sách', count: newsData.filter(n => n.category === 'policy').length },
    { id: 'analysis', name: 'Phân tích', count: newsData.filter(n => n.category === 'analysis').length },
    { id: 'rating', name: 'Xếp hạng', count: newsData.filter(n => n.category === 'rating').length },
    { id: 'partnership', name: 'Hợp tác', count: newsData.filter(n => n.category === 'partnership').length },
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800';
      case 'negative':
        return 'text-danger-600 dark:text-danger-400 bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'Tích cực';
      case 'negative':
        return 'Tiêu cực';
      default:
        return 'Trung tính';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Newspaper className="h-5 w-5 mr-2" />
            Tin tức liên quan - {symbol}
          </h2>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Lọc theo:</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {filteredNews.map((news) => (
            <article 
              key={news.id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(news.impact)}`}>
                    {getImpactLabel(news.impact)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {news.source}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(news.publishedAt)}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                {news.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {news.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {news.category}
                  </span>
                </div>
                <a
                  href={news.url}
                  className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors"
                >
                  <span>Đọc thêm</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Không có tin tức nào trong danh mục này
            </p>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredNews.length > 0 && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <button className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Xem thêm tin tức
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedNews;