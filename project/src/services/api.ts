import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG, handleApiError } from '../config/api';

// Tạo instance axios với cấu hình mặc định
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Debug logging
console.log('API Base URL:', API_CONFIG.BASE_URL);

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data
    });
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Debug logging
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    
    return response;
  },
  (error) => {
    // Debug logging
    console.error('API Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      response: error.response?.data
    });
    
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types cho API responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
  };
  token: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
  };
  token: string;
}

export interface ApiError {
  message: string;
  status: number;
}

// API functions
export const authAPI = {
  // Đăng nhập
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('Attempting login with:', data);
      const response = await api.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, data);
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Đăng ký
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      console.log('Attempting registration with:', data);
      const response = await api.post<RegisterResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Đăng xuất
  logout: async (): Promise<void> => {
    try {
      await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    try {
      const response = await api.post<{ token: string }>(API_CONFIG.ENDPOINTS.AUTH.REFRESH);
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },
};

// Stock API functions
export const stockAPI = {
  // Lấy danh sách cổ phiếu
  getStocks: async (page = 1, limit = 20) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.STOCKS.LIST}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },

  // Lấy chi tiết cổ phiếu
  getStockDetail: async (symbol: string) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.STOCKS.DETAIL(symbol));
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },

  // Lấy dữ liệu giá cổ phiếu
  getStockPrice: async (symbol: string, period = '1d') => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.STOCKS.PRICE(symbol)}?period=${period}`);
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },
};

// Portfolio API functions
export const portfolioAPI = {
  // Lấy portfolio của user
  getPortfolio: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.PORTFOLIO.LIST);
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },

  // Thêm cổ phiếu vào portfolio
  addToPortfolio: async (symbol: string, quantity: number, price: number) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.PORTFOLIO.ADD, { symbol, quantity, price });
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },

  // Xóa cổ phiếu khỏi portfolio
  removeFromPortfolio: async (symbol: string) => {
    try {
      const response = await api.delete(API_CONFIG.ENDPOINTS.PORTFOLIO.REMOVE(symbol));
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },
};

// Watchlist API functions
export const watchlistAPI = {
  // Lấy watchlist của user
  getWatchlist: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.WATCHLIST.LIST);
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },

  // Thêm cổ phiếu vào watchlist
  addToWatchlist: async (symbol: string) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.WATCHLIST.ADD, { symbol });
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },

  // Xóa cổ phiếu khỏi watchlist
  removeFromWatchlist: async (symbol: string) => {
    try {
      const response = await api.delete(API_CONFIG.ENDPOINTS.WATCHLIST.REMOVE(symbol));
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  },
};

export default api; 