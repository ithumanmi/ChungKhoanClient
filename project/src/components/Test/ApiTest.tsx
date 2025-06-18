import React, { useState } from 'react';
import { authAPI } from '../../services/api';

const ApiTest: React.FC = () => {
  const [email, setEmail] = useState('khang@vn.com');
  const [password, setPassword] = useState('123456');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setResult('Đang kiểm tra kết nối...');
    
    try {
      // Test basic connection
      const response = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setResult('✅ Kết nối thành công! Server đang hoạt động.');
      } else {
        setResult(`❌ Server trả về lỗi: ${response.status} ${response.statusText}`);
      }
    } catch (error: any) {
      setResult(`❌ Không thể kết nối đến server: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    setResult('Đang thử đăng nhập...');
    
    try {
      const response = await authAPI.login({ email, password });
      setResult(`✅ Đăng nhập thành công! User: ${response.user.fullName}`);
    } catch (error: any) {
      setResult(`❌ Đăng nhập thất bại: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testRegister = async () => {
    setIsLoading(true);
    setResult('Đang thử đăng ký...');
    
    try {
      const response = await authAPI.register({ 
        email: `test${Date.now()}@example.com`, 
        password: 'password123', 
        fullName: 'Test User' 
      });
      setResult(`✅ Đăng ký thành công! User: ${response.user.fullName}`);
    } catch (error: any) {
      setResult(`❌ Đăng ký thất bại: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Test Tool</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Kiểm tra kết nối</h2>
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Connection
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Login</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={testLogin}
            disabled={isLoading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Login
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Register</h2>
        <button
          onClick={testRegister}
          disabled={isLoading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test Register
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Kết quả:</h3>
        <pre className="whitespace-pre-wrap text-sm">{result}</pre>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Hướng dẫn debug:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Mở Developer Tools (F12)</li>
          <li>Vào tab Console để xem log</li>
          <li>Vào tab Network để xem API calls</li>
          <li>Kiểm tra server có chạy tại http://localhost:3001 không</li>
          <li>Kiểm tra endpoint /api/auth/login có tồn tại không</li>
        </ol>
      </div>
    </div>
  );
};

export default ApiTest; 