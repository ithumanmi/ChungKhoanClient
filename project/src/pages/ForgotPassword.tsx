import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, TrendingUp } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock API call - in real app, this would send reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err: any) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary-600 rounded-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                VietStock
              </span>
            </div>
          </div>
          
          <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 
                        border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-success-600 dark:text-success-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Email đã được gửi
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email <strong>{email}</strong>. 
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </p>
              
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
                           shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  Quay lại đăng nhập
                </Link>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 
                           rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 
                           bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Gửi lại email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary-600 rounded-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              VietStock
            </span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Quên mật khẩu
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 
                      border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-danger-50 dark:bg-danger-900/50 border border-danger-200 dark:border-danger-800 
                            text-danger-600 dark:text-danger-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 
                           rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 
                           focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Nhập email của bạn"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
                         shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Đang gửi...' : 'Gửi hướng dẫn đặt lại'}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 text-sm text-primary-600 
                         hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Quay lại đăng nhập</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;