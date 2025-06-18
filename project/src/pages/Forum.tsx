import React, { useState } from 'react';
import { MessageSquare, Plus, Heart, MessageCircle, Share2, TrendingUp, Clock, User, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatNumber } from '../utils/format';

interface ForumPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    reputation: number;
  };
  title: string;
  content: string;
  stockSymbol?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
}

const Forum: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // Mock forum posts data
  const [posts] = useState<ForumPost[]>([
    {
      id: '1',
      author: {
        id: '1',
        name: 'Nguyễn Văn A',
        reputation: 1250
      },
      title: 'Phân tích kỹ thuật VCB - Xu hướng tăng mạnh trong tuần tới?',
      content: 'Theo phân tích biểu đồ, VCB đang có dấu hiệu tích cực với việc vượt qua vùng kháng cự 87,000. RSI đang ở mức 65, cho thấy còn dư địa tăng. Các bạn nghĩ sao về triển vọng của VCB trong thời gian tới?',
      stockSymbol: 'VCB',
      category: 'analysis',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      likesCount: 24,
      commentsCount: 12,
      isLiked: false,
      tags: ['Phân tích kỹ thuật', 'VCB', 'Ngân hàng']
    },
    {
      id: '2',
      author: {
        id: '2',
        name: 'Trần Thị B',
        reputation: 890
      },
      title: 'Chiến lược đầu tư dài hạn cho người mới bắt đầu',
      content: 'Mình mới tham gia thị trường chứng khoán và muốn xây dựng một danh mục đầu tư dài hạn. Các anh chị có thể chia sẻ kinh nghiệm và gợi ý một số mã blue-chip ổn định không ạ?',
      category: 'discussion',
      createdAt: '2024-01-14T16:45:00Z',
      updatedAt: '2024-01-14T16:45:00Z',
      likesCount: 18,
      commentsCount: 25,
      isLiked: true,
      tags: ['Đầu tư dài hạn', 'Người mới', 'Blue-chip']
    },
    {
      id: '3',
      author: {
        id: '3',
        name: 'Lê Minh C',
        reputation: 2100
      },
      title: 'Báo cáo Q3/2024: Những điểm sáng trong ngành bất động sản',
      content: 'Vừa rồi có một số công ty bất động sản công bố kết quả kinh doanh Q3 khá tích cực. VHM, NVL, DXG đều có mức tăng trưởng đáng chú ý. Cùng thảo luận về triển vọng của ngành này nhé!',
      stockSymbol: 'VHM',
      category: 'news',
      createdAt: '2024-01-13T14:20:00Z',
      updatedAt: '2024-01-13T14:20:00Z',
      likesCount: 31,
      commentsCount: 8,
      isLiked: false,
      tags: ['Báo cáo tài chính', 'Bất động sản', 'Q3 2024']
    },
    {
      id: '4',
      author: {
        id: '4',
        name: 'Phạm Đức D',
        reputation: 1560
      },
      title: 'Tác động của chính sách tiền tệ mới đến thị trường chứng khoán',
      content: 'NHNN vừa có những điều chỉnh về lãi suất và chính sách tiền tệ. Theo các bạn, điều này sẽ ảnh hưởng như thế nào đến thị trường chứng khoán trong thời gian tới?',
      category: 'market',
      createdAt: '2024-01-12T11:15:00Z',
      updatedAt: '2024-01-12T11:15:00Z',
      likesCount: 42,
      commentsCount: 19,
      isLiked: true,
      tags: ['Chính sách tiền tệ', 'NHNN', 'Vĩ mô']
    },
    {
      id: '5',
      author: {
        id: '5',
        name: 'Hoàng Thị E',
        reputation: 750
      },
      title: 'Chia sẻ công cụ screening cổ phiếu hiệu quả',
      content: 'Mình muốn chia sẻ với cộng đồng một số công cụ và tiêu chí screening cổ phiếu mà mình đang sử dụng. Các bạn có thể tham khảo và góp ý thêm nhé!',
      category: 'tools',
      createdAt: '2024-01-11T09:30:00Z',
      updatedAt: '2024-01-11T09:30:00Z',
      likesCount: 15,
      commentsCount: 7,
      isLiked: false,
      tags: ['Screening', 'Công cụ', 'Phân tích']
    }
  ]);

  const categories = [
    { id: 'all', name: 'Tất cả', count: posts.length },
    { id: 'analysis', name: 'Phân tích', count: posts.filter(p => p.category === 'analysis').length },
    { id: 'discussion', name: 'Thảo luận', count: posts.filter(p => p.category === 'discussion').length },
    { id: 'news', name: 'Tin tức', count: posts.filter(p => p.category === 'news').length },
    { id: 'market', name: 'Thị trường', count: posts.filter(p => p.category === 'market').length },
    { id: 'tools', name: 'Công cụ', count: posts.filter(p => p.category === 'tools').length }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likesCount + b.commentsCount) - (a.likesCount + a.commentsCount);
      case 'trending':
        return b.likesCount - a.likesCount;
      case 'latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'analysis':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300';
      case 'discussion':
        return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300';
      case 'news':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300';
      case 'market':
        return 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-300';
      case 'tools':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Đăng nhập để tham gia Diễn đàn
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Kết nối và thảo luận với cộng đồng nhà đầu tư
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
                <MessageSquare className="h-8 w-8 mr-3 text-primary-600" />
                Diễn đàn cộng đồng
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Kết nối, chia sẻ và thảo luận với cộng đồng nhà đầu tư
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <button
                onClick={() => setShowNewPostModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Tạo bài viết</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Danh mục</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thành viên tích cực</h3>
              <div className="space-y-3">
                {[
                  { name: 'Lê Minh C', reputation: 2100, posts: 45 },
                  { name: 'Phạm Đức D', reputation: 1560, posts: 32 },
                  { name: 'Nguyễn Văn A', reputation: 1250, posts: 28 }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {contributor.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {contributor.reputation} điểm • {contributor.posts} bài
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sắp xếp theo:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="latest">Mới nhất</option>
                    <option value="popular">Phổ biến</option>
                    <option value="trending">Thịnh hành</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {sortedPosts.length} bài viết
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                          {post.title}
                        </h3>
                        {post.stockSymbol && (
                          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                            {post.stockSymbol}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{post.author.name}</span>
                        <span>•</span>
                        <span>{post.author.reputation} điểm</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTimeAgo(post.createdAt)}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                          {categories.find(c => c.id === post.category)?.name}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {post.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <button className={`flex items-center space-x-2 text-sm transition-colors ${
                            post.isLiked 
                              ? 'text-danger-600 dark:text-danger-400' 
                              : 'text-gray-500 dark:text-gray-400 hover:text-danger-600 dark:hover:text-danger-400'
                          }`}>
                            <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span>{post.likesCount}</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.commentsCount}</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span>Chia sẻ</span>
                          </button>
                        </div>
                        
                        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                          Đọc thêm →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Xem thêm bài viết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;