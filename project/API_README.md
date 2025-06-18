# API Integration Guide

## Tổng quan

Dự án đã được tích hợp với API backend Node.js thông qua các service và hooks được tạo sẵn.

## Cấu trúc API

### 1. Cấu hình API (`src/config/api.ts`)
- Quản lý URL base, timeout, headers mặc định
- Định nghĩa các endpoints
- Xử lý error messages

### 2. API Service (`src/services/api.ts`)
- Tạo axios instance với interceptors
- Xử lý authentication token
- Các function gọi API cho từng module

### 3. Custom Hooks (`src/hooks/useApi.ts`)
- Sử dụng React Query để quản lý state
- Cache và refetch tự động
- Error handling

## Cách sử dụng

### 1. Authentication

```typescript
import { useLogin, useRegister, useLogout, useCurrentUser } from '../hooks/useApi';

// Login
const loginMutation = useLogin();
const handleLogin = async (email: string, password: string) => {
  try {
    await loginMutation.mutateAsync({ email, password });
    // Redirect hoặc xử lý thành công
  } catch (error) {
    // Xử lý lỗi
  }
};

// Register
const registerMutation = useRegister();
const handleRegister = async (email: string, password: string, fullName: string) => {
  try {
    await registerMutation.mutateAsync({ email, password, fullName });
    // Redirect hoặc xử lý thành công
  } catch (error) {
    // Xử lý lỗi
  }
};

// Logout
const logoutMutation = useLogout();
const handleLogout = () => {
  logoutMutation.mutate();
};

// Get current user
const { data: user, isLoading, error } = useCurrentUser();
```

### 2. Stocks

```typescript
import { useStocks, useStockDetail, useStockPrice } from '../hooks/useApi';

// Get stocks list
const { data: stocks, isLoading } = useStocks(1, 20);

// Get stock detail
const { data: stockDetail } = useStockDetail('VNM');

// Get stock price
const { data: priceData } = useStockPrice('VNM', '1d');
```

### 3. Portfolio

```typescript
import { usePortfolio, useAddToPortfolio, useRemoveFromPortfolio } from '../hooks/useApi';

// Get portfolio
const { data: portfolio } = usePortfolio();

// Add to portfolio
const addMutation = useAddToPortfolio();
const handleAdd = async (symbol: string, quantity: number, price: number) => {
  await addMutation.mutateAsync({ symbol, quantity, price });
};

// Remove from portfolio
const removeMutation = useRemoveFromPortfolio();
const handleRemove = async (symbol: string) => {
  await removeMutation.mutateAsync(symbol);
};
```

### 4. Watchlist

```typescript
import { useWatchlist, useAddToWatchlist, useRemoveFromWatchlist } from '../hooks/useApi';

// Get watchlist
const { data: watchlist } = useWatchlist();

// Add to watchlist
const addMutation = useAddToWatchlist();
const handleAdd = async (symbol: string) => {
  await addMutation.mutateAsync(symbol);
};

// Remove from watchlist
const removeMutation = useRemoveFromWatchlist();
const handleRemove = async (symbol: string) => {
  await removeMutation.mutateAsync(symbol);
};
```

## Cấu hình Environment

Tạo file `.env` trong thư mục gốc:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Backend API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `POST /api/auth/refresh` - Refresh token

### Stocks
- `GET /api/stocks` - Lấy danh sách cổ phiếu
- `GET /api/stocks/:symbol` - Lấy chi tiết cổ phiếu
- `GET /api/stocks/:symbol/price` - Lấy dữ liệu giá

### Portfolio
- `GET /api/portfolio` - Lấy portfolio
- `POST /api/portfolio` - Thêm vào portfolio
- `DELETE /api/portfolio/:symbol` - Xóa khỏi portfolio

### Watchlist
- `GET /api/watchlist` - Lấy watchlist
- `POST /api/watchlist` - Thêm vào watchlist
- `DELETE /api/watchlist/:symbol` - Xóa khỏi watchlist

## Error Handling

API service tự động xử lý các lỗi phổ biến:
- 401: Tự động logout và redirect về login
- Network errors: Hiển thị thông báo lỗi kết nối
- Server errors: Hiển thị thông báo lỗi server

## React Query Features

- **Caching**: Tự động cache data để tăng performance
- **Background Updates**: Tự động refetch data khi cần
- **Optimistic Updates**: Cập nhật UI ngay lập tức
- **Error Retry**: Tự động retry khi gặp lỗi
- **Loading States**: Quản lý trạng thái loading

## Best Practices

1. **Sử dụng hooks**: Luôn sử dụng custom hooks thay vì gọi API trực tiếp
2. **Error handling**: Luôn wrap API calls trong try-catch
3. **Loading states**: Hiển thị loading indicator khi cần
4. **Cache management**: Sử dụng React Query để quản lý cache
5. **Token management**: Token được tự động quản lý bởi interceptors 