import React, { useState } from 'react';
import { useLogin, useStocks, usePortfolio, useAddToPortfolio } from '../../hooks/useApi';

const ExampleApiUsage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sử dụng các hooks API
  const loginMutation = useLogin();
  const { data: stocks, isLoading: stocksLoading, error: stocksError } = useStocks(1, 10);
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const addToPortfolioMutation = useAddToPortfolio();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      alert('Đăng nhập thành công!');
    } catch (error: any) {
      alert(`Đăng nhập thất bại: ${error.message}`);
    }
  };

  const handleAddToPortfolio = async (symbol: string) => {
    try {
      await addToPortfolioMutation.mutateAsync({ symbol, quantity: 100, price: 50000 });
      alert('Thêm vào portfolio thành công!');
    } catch (error: any) {
      alert(`Thêm vào portfolio thất bại: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Example API Usage</h1>

      {/* Login Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Login Example</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loginMutation.isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loginMutation.isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>

      {/* Stocks List */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Stocks List Example</h2>
        {stocksLoading ? (
          <p>Đang tải danh sách cổ phiếu...</p>
        ) : stocksError ? (
          <p className="text-red-500">Lỗi: {(stocksError as Error).message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stocks?.data?.map((stock: any) => (
              <div key={stock.symbol} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{stock.symbol}</h3>
                <p className="text-gray-600">{stock.name}</p>
                <p className="text-lg font-bold text-green-600">
                  {stock.price?.toLocaleString()} VND
                </p>
                <button
                  onClick={() => handleAddToPortfolio(stock.symbol)}
                  disabled={addToPortfolioMutation.isLoading}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50"
                >
                  Thêm vào Portfolio
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Portfolio */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Portfolio Example</h2>
        {portfolioLoading ? (
          <p>Đang tải portfolio...</p>
        ) : (
          <div>
            {portfolio?.data?.length === 0 ? (
              <p>Portfolio trống</p>
            ) : (
              <div className="space-y-2">
                {portfolio?.data?.map((item: any) => (
                  <div key={item.symbol} className="flex justify-between items-center border-b py-2">
                    <div>
                      <span className="font-semibold">{item.symbol}</span>
                      <span className="text-gray-600 ml-2">({item.quantity} cổ phiếu)</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      {(item.quantity * item.averagePrice).toLocaleString()} VND
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExampleApiUsage; 