// API Configuration
export const API_CONFIG = {
  // Base URL cho API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  
  // Timeout cho requests (ms)
  TIMEOUT: 10000,
  
  // Headers mặc định
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      ME: '/auth/me',
      REFRESH: '/auth/refresh',
    },
    STOCKS: {
      LIST: '/stocks',
      DETAIL: (symbol: string) => `/stocks/${symbol}`,
      PRICE: (symbol: string) => `/stocks/${symbol}/price`,
    },
    PORTFOLIO: {
      LIST: '/portfolio',
      ADD: '/portfolio',
      REMOVE: (symbol: string) => `/portfolio/${symbol}`,
    },
    WATCHLIST: {
      LIST: '/watchlist',
      ADD: '/watchlist',
      REMOVE: (symbol: string) => `/watchlist/${symbol}`,
    },
  },
  
  // Error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Lỗi kết nối mạng',
    TIMEOUT_ERROR: 'Request timeout',
    UNAUTHORIZED: 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn',
    FORBIDDEN: 'Bạn không có quyền truy cập',
    NOT_FOUND: 'Không tìm thấy dữ liệu',
    SERVER_ERROR: 'Lỗi server',
    UNKNOWN_ERROR: 'Có lỗi xảy ra',
  },
};

// Helper function để tạo full URL
export const createApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function để xử lý error
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server trả về response với status code khác 2xx
    const status = error.response.status;
    const message = error.response.data?.message;
    
    switch (status) {
      case 401:
        return API_CONFIG.ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return API_CONFIG.ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return API_CONFIG.ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return API_CONFIG.ERROR_MESSAGES.SERVER_ERROR;
      default:
        return message || API_CONFIG.ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  } else if (error.request) {
    // Request được gửi nhưng không nhận được response
    return API_CONFIG.ERROR_MESSAGES.NETWORK_ERROR;
  } else {
    // Có lỗi khi setup request
    return error.message || API_CONFIG.ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}; 