import React from 'react';
import { Building2, Users, MapPin, Globe, Phone, Mail } from 'lucide-react';

interface CompanyInfoProps {
  symbol: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ symbol }) => {
  // Mock company data - in real app, this would come from API
  const companyData = {
    fullName: 'Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam',
    englishName: 'Joint Stock Commercial Bank for Foreign Trade of Vietnam',
    industry: 'Ngân hàng',
    sector: 'Dịch vụ tài chính',
    description: 'Vietcombank là một trong những ngân hàng thương mại hàng đầu Việt Nam, cung cấp đầy đủ các dịch vụ ngân hàng bao gồm huy động vốn, cho vay, dịch vụ thanh toán, ngân hàng đầu tư và các dịch vụ tài chính khác. Ngân hàng có mạng lưới chi nhánh rộng khắp cả nước và đang mở rộng ra thị trường quốc tế.',
    foundedYear: 1963,
    headquarters: 'Hà Nội, Việt Nam',
    employees: 25000,
    website: 'https://www.vietcombank.com.vn',
    phone: '1900 545 413',
    email: 'info@vietcombank.com.vn',
    address: 'Số 198 Trần Quang Khải, Quận Hoàn Kiếm, Hà Nội',
    businessLicense: '0100101234',
    taxCode: '0100101234',
    listingDate: '2009-06-24',
    exchange: 'HOSE',
    majorShareholders: [
      { name: 'Nhà nước Việt Nam', percentage: 74.8 },
      { name: 'IFC', percentage: 8.1 },
      { name: 'Mizuho Bank', percentage: 15.0 },
      { name: 'Cổ đông khác', percentage: 2.1 },
    ],
    leadership: [
      { name: 'Nghiêm Xuân Thành', position: 'Chủ tịch HĐQT' },
      { name: 'Phạm Quang Dũng', position: 'Tổng Giám đốc' },
      { name: 'Nguyễn Thu Trang', position: 'Phó Tổng Giám đốc' },
      { name: 'Lê Đức Thọ', position: 'Phó Tổng Giám đốc' },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Company Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Thông tin công ty
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {companyData.fullName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {companyData.englishName}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {companyData.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ngành</div>
                  <div className="font-medium text-gray-900 dark:text-white">{companyData.industry}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lĩnh vực</div>
                  <div className="font-medium text-gray-900 dark:text-white">{companyData.sector}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Thành lập</div>
                  <div className="font-medium text-gray-900 dark:text-white">{companyData.foundedYear}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nhân viên</div>
                  <div className="font-medium text-gray-900 dark:text-white">{companyData.employees.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Thông tin liên hệ
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Trụ sở chính</div>
                      <div className="text-gray-900 dark:text-white">{companyData.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Điện thoại</div>
                      <div className="text-gray-900 dark:text-white">{companyData.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="text-gray-900 dark:text-white">{companyData.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Website</div>
                      <a 
                        href={companyData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {companyData.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Thông tin niêm yết
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sàn giao dịch</div>
                    <div className="font-medium text-gray-900 dark:text-white">{companyData.exchange}</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ngày niêm yết</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {new Date(companyData.listingDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Mã số thuế</div>
                    <div className="font-medium text-gray-900 dark:text-white">{companyData.taxCode}</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">GPKD</div>
                    <div className="font-medium text-gray-900 dark:text-white">{companyData.businessLicense}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shareholders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cơ cấu cổ đông
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {companyData.majorShareholders.map((shareholder, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white">
                  {shareholder.name}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {shareholder.percentage}%
                  </div>
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${shareholder.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Ban lãnh đạo
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companyData.leadership.map((leader, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  {leader.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {leader.position}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;