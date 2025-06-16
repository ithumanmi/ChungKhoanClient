import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import { formatNumber, formatCompactNumber } from '../../utils/format';

interface FinancialReportsProps {
  symbol: string;
}

const FinancialReports: React.FC<FinancialReportsProps> = ({ symbol }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q3-2024');
  const [selectedReport, setSelectedReport] = useState('income');

  // Mock financial reports data
  const periods = ['Q3-2024', 'Q2-2024', 'Q1-2024', '2023', '2022', '2021'];
  
  const reportTypes = [
    { id: 'income', name: 'Báo cáo kết quả kinh doanh', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'balance', name: 'Bảng cân đối kế toán', icon: <FileText className="h-4 w-4" /> },
    { id: 'cashflow', name: 'Báo cáo lưu chuyển tiền tệ', icon: <FileText className="h-4 w-4" /> },
  ];

  const incomeStatementData = {
    'Q3-2024': {
      revenue: 45678000000,
      grossProfit: 32145000000,
      operatingProfit: 18234000000,
      netIncome: 15678000000,
      eps: 8500,
      operatingExpenses: 13911000000,
      interestExpense: 2556000000,
    },
    'Q2-2024': {
      revenue: 42345000000,
      grossProfit: 29876000000,
      operatingProfit: 16789000000,
      netIncome: 14234000000,
      eps: 7800,
      operatingExpenses: 13087000000,
      interestExpense: 2555000000,
    }
  };

  const balanceSheetData = {
    'Q3-2024': {
      totalAssets: 1456789000000,
      totalLiabilities: 1234567000000,
      totalEquity: 222222000000,
      cash: 89123000000,
      loans: 987654000000,
      deposits: 1123456000000,
    }
  };

  const cashFlowData = {
    'Q3-2024': {
      operatingCashFlow: 23456000000,
      investingCashFlow: -12345000000,
      financingCashFlow: -5678000000,
      netCashFlow: 5433000000,
    }
  };

  const getCurrentData = () => {
    switch (selectedReport) {
      case 'income':
        return incomeStatementData[selectedPeriod as keyof typeof incomeStatementData] || incomeStatementData['Q3-2024'];
      case 'balance':
        return balanceSheetData[selectedPeriod as keyof typeof balanceSheetData] || balanceSheetData['Q3-2024'];
      case 'cashflow':
        return cashFlowData[selectedPeriod as keyof typeof cashFlowData] || cashFlowData['Q3-2024'];
      default:
        return incomeStatementData['Q3-2024'];
    }
  };

  const renderIncomeStatement = (data: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div className="text-sm text-primary-600 dark:text-primary-400 mb-1">Doanh thu</div>
          <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
            {formatCompactNumber(data.revenue)}
          </div>
        </div>
        <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
          <div className="text-sm text-success-600 dark:text-success-400 mb-1">Lợi nhuận ròng</div>
          <div className="text-2xl font-bold text-success-700 dark:text-success-300">
            {formatCompactNumber(data.netIncome)}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="py-3 text-gray-900 dark:text-white font-medium">Doanh thu thuần</td>
              <td className="py-3 text-right text-gray-900 dark:text-white">{formatNumber(data.revenue)}</td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600 dark:text-gray-400 pl-4">Lợi nhuận gộp</td>
              <td className="py-3 text-right text-gray-900 dark:text-white">{formatNumber(data.grossProfit)}</td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600 dark:text-gray-400 pl-4">Chi phí hoạt động</td>
              <td className="py-3 text-right text-danger-600 dark:text-danger-400">({formatNumber(data.operatingExpenses)})</td>
            </tr>
            <tr>
              <td className="py-3 text-gray-900 dark:text-white font-medium">Lợi nhuận hoạt động</td>
              <td className="py-3 text-right text-gray-900 dark:text-white">{formatNumber(data.operatingProfit)}</td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600 dark:text-gray-400 pl-4">Chi phí lãi vay</td>
              <td className="py-3 text-right text-danger-600 dark:text-danger-400">({formatNumber(data.interestExpense)})</td>
            </tr>
            <tr className="border-t-2 border-gray-300 dark:border-gray-600">
              <td className="py-3 text-gray-900 dark:text-white font-bold">Lợi nhuận ròng</td>
              <td className="py-3 text-right text-success-600 dark:text-success-400 font-bold">{formatNumber(data.netIncome)}</td>
            </tr>
            <tr>
              <td className="py-3 text-gray-900 dark:text-white font-medium">EPS (VNĐ)</td>
              <td className="py-3 text-right text-gray-900 dark:text-white font-medium">{formatNumber(data.eps)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBalanceSheet = (data: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div className="text-sm text-primary-600 dark:text-primary-400 mb-1">Tổng tài sản</div>
          <div className="text-xl font-bold text-primary-700 dark:text-primary-300">
            {formatCompactNumber(data.totalAssets)}
          </div>
        </div>
        <div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg border border-warning-200 dark:border-warning-800">
          <div className="text-sm text-warning-600 dark:text-warning-400 mb-1">Tổng nợ phải trả</div>
          <div className="text-xl font-bold text-warning-700 dark:text-warning-300">
            {formatCompactNumber(data.totalLiabilities)}
          </div>
        </div>
        <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
          <div className="text-sm text-success-600 dark:text-success-400 mb-1">Vốn chủ sở hữu</div>
          <div className="text-xl font-bold text-success-700 dark:text-success-300">
            {formatCompactNumber(data.totalEquity)}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tài sản</h4>
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Tiền và tương đương tiền</span>
              <span className="text-gray-900 dark:text-white font-medium">{formatCompactNumber(data.cash)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Cho vay khách hàng</span>
              <span className="text-gray-900 dark:text-white font-medium">{formatCompactNumber(data.loans)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-bold">Tổng tài sản</span>
              <span className="text-gray-900 dark:text-white font-bold">{formatCompactNumber(data.totalAssets)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Nợ phải trả & Vốn CSH</h4>
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Tiền gửi khách hàng</span>
              <span className="text-gray-900 dark:text-white font-medium">{formatCompactNumber(data.deposits)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Vốn chủ sở hữu</span>
              <span className="text-gray-900 dark:text-white font-medium">{formatCompactNumber(data.totalEquity)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-bold">Tổng nguồn vốn</span>
              <span className="text-gray-900 dark:text-white font-bold">{formatCompactNumber(data.totalAssets)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCashFlow = (data: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div className="text-sm text-primary-600 dark:text-primary-400 mb-1">CF từ hoạt động kinh doanh</div>
          <div className="text-xl font-bold text-primary-700 dark:text-primary-300">
            {formatCompactNumber(data.operatingCashFlow)}
          </div>
        </div>
        <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
          <div className="text-sm text-success-600 dark:text-success-400 mb-1">CF ròng</div>
          <div className="text-xl font-bold text-success-700 dark:text-success-300">
            {formatCompactNumber(data.netCashFlow)}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="py-3 text-gray-900 dark:text-white font-medium">Lưu chuyển tiền từ hoạt động kinh doanh</td>
              <td className="py-3 text-right text-success-600 dark:text-success-400 font-medium">{formatNumber(data.operatingCashFlow)}</td>
            </tr>
            <tr>
              <td className="py-3 text-gray-900 dark:text-white font-medium">Lưu chuyển tiền từ hoạt động đầu tư</td>
              <td className="py-3 text-right text-danger-600 dark:text-danger-400 font-medium">{formatNumber(data.investingCashFlow)}</td>
            </tr>
            <tr>
              <td className="py-3 text-gray-900 dark:text-white font-medium">Lưu chuyển tiền từ hoạt động tài chính</td>
              <td className="py-3 text-right text-danger-600 dark:text-danger-400 font-medium">{formatNumber(data.financingCashFlow)}</td>
            </tr>
            <tr className="border-t-2 border-gray-300 dark:border-gray-600">
              <td className="py-3 text-gray-900 dark:text-white font-bold">Lưu chuyển tiền thuần</td>
              <td className="py-3 text-right text-success-600 dark:text-success-400 font-bold">{formatNumber(data.netCashFlow)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReportContent = () => {
    const data = getCurrentData();
    
    switch (selectedReport) {
      case 'income':
        return renderIncomeStatement(data);
      case 'balance':
        return renderBalanceSheet(data);
      case 'cashflow':
        return renderCashFlow(data);
      default:
        return renderIncomeStatement(data);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Báo cáo tài chính
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {periods.map((period) => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Tải xuống</span>
            </button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="mt-6 flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedReport === type.id
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {type.icon}
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {renderReportContent()}
      </div>

      {/* Historical Data Summary */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Xu hướng tài chính
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tăng trưởng doanh thu</div>
            <div className="text-xl font-bold text-success-600 dark:text-success-400">+8.2%</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tăng trưởng lợi nhuận</div>
            <div className="text-xl font-bold text-success-600 dark:text-success-400">+12.5%</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">ROE trung bình</div>
            <div className="text-xl font-bold text-primary-600 dark:text-primary-400">15.8%</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Debt/Equity</div>
            <div className="text-xl font-bold text-warning-600 dark:text-warning-400">0.45</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;