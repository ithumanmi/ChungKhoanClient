import React from 'react';
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react';
import { Stock } from '../../types/stock';
import { formatNumber, formatCompactNumber } from '../../utils/format';

interface FinancialMetricsProps {
  stock: Stock;
}

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ stock }) => {
  // Mock additional financial data
  const financialData = {
    roe: 15.2,
    roa: 8.7,
    debtToEquity: 0.45,
    currentRatio: 1.8,
    quickRatio: 1.2,
    grossMargin: 25.6,
    netMargin: 12.3,
    bookValue: 45000,
    dividendYield: 3.2,
    beta: 1.15,
    revenue: 125000000000,
    netIncome: 15375000000,
    totalAssets: 450000000000,
    totalEquity: 180000000000,
  };

  const metrics = [
    {
      category: 'Định giá',
      icon: <Calculator className="h-5 w-5" />,
      items: [
        { label: 'P/E', value: stock.pe?.toFixed(2) || 'N/A', description: 'Tỷ số giá/thu nhập' },
        { label: 'P/B', value: stock.pb?.toFixed(2) || 'N/A', description: 'Tỷ số giá/sổ sách' },
        { label: 'EPS', value: formatNumber(stock.eps || 0), description: 'Thu nhập trên cổ phiếu' },
        { label: 'Book Value', value: formatNumber(financialData.bookValue), description: 'Giá trị sổ sách/cổ phiếu' },
      ]
    },
    {
      category: 'Khả năng sinh lời',
      icon: <TrendingUp className="h-5 w-5" />,
      items: [
        { label: 'ROE', value: `${financialData.roe}%`, description: 'Lợi nhuận trên vốn chủ sở hữu' },
        { label: 'ROA', value: `${financialData.roa}%`, description: 'Lợi nhuận trên tổng tài sản' },
        { label: 'Gross Margin', value: `${financialData.grossMargin}%`, description: 'Tỷ suất lợi nhuận gộp' },
        { label: 'Net Margin', value: `${financialData.netMargin}%`, description: 'Tỷ suất lợi nhuận ròng' },
      ]
    },
    {
      category: 'Thanh khoản & Nợ',
      icon: <DollarSign className="h-5 w-5" />,
      items: [
        { label: 'Current Ratio', value: financialData.currentRatio.toFixed(2), description: 'Tỷ số thanh toán hiện hành' },
        { label: 'Quick Ratio', value: financialData.quickRatio.toFixed(2), description: 'Tỷ số thanh toán nhanh' },
        { label: 'Debt/Equity', value: financialData.debtToEquity.toFixed(2), description: 'Tỷ số nợ/vốn chủ sở hữu' },
        { label: 'Beta', value: financialData.beta.toFixed(2), description: 'Hệ số rủi ro thị trường' },
      ]
    },
    {
      category: 'Thị trường',
      icon: <Percent className="h-5 w-5" />,
      items: [
        { label: 'Market Cap', value: formatCompactNumber(stock.marketCap || 0), description: 'Vốn hóa thị trường' },
        { label: 'Dividend Yield', value: `${financialData.dividendYield}%`, description: 'Tỷ suất cổ tức' },
        { label: 'Revenue', value: formatCompactNumber(financialData.revenue), description: 'Doanh thu' },
        { label: 'Net Income', value: formatCompactNumber(financialData.netIncome), description: 'Lợi nhuận ròng' },
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Chỉ số tài chính
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Các chỉ số đánh giá sức khỏe tài chính doanh nghiệp
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {metrics.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                {category.icon}
                <h3 className="text-lg font-semibold">{category.category}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.label}
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {item.value}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tóm tắt hiệu suất
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">
              Tốt
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Khả năng sinh lời
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-warning-600 dark:text-warning-400 mb-1">
              Trung bình
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Thanh khoản
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              Ổn định
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Cấu trúc tài chính
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialMetrics;