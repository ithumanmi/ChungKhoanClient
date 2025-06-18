import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: '',
      bio: ''
    },
    notifications: {
      emailAlerts: true,
      priceAlerts: true,
      newsUpdates: false,
      forumReplies: true,
      marketSummary: true
    },
    privacy: {
      profileVisibility: 'public',
      showPortfolio: false,
      showWatchlist: false
    },
    appearance: {
      theme: 'system',
      language: 'vi',
      currency: 'VND'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Hồ sơ', icon: <User className="h-5 w-5" /> },
    { id: 'notifications', name: 'Thông báo', icon: <Bell className="h-5 w-5" /> },
    { id: 'privacy', name: 'Bảo mật', icon: <Shield className="h-5 w-5" /> },
    { id: 'appearance', name: 'Giao diện', icon: <Palette className="h-5 w-5" /> }
  ];

  const handleSave = () => {
    // In real app, this would save to API
    console.log('Saving settings:', settings);
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Thông tin cá nhân
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              value={settings.profile.fullName}
              onChange={(e) => updateSetting('profile', 'fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => updateSetting('profile', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Giới thiệu bản thân
          </label>
          <textarea
            rows={4}
            value={settings.profile.bio}
            onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Chia sẻ về kinh nghiệm đầu tư của bạn..."
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Cài đặt thông báo
        </h3>
        <div className="space-y-4">
          {[
            { key: 'emailAlerts', label: 'Cảnh báo qua email', description: 'Nhận thông báo cảnh báo giá qua email' },
            { key: 'priceAlerts', label: 'Cảnh báo giá', description: 'Thông báo khi giá cổ phiếu đạt ngưỡng đã đặt' },
            { key: 'newsUpdates', label: 'Tin tức cập nhật', description: 'Nhận tin tức mới nhất về thị trường' },
            { key: 'forumReplies', label: 'Phản hồi diễn đàn', description: 'Thông báo khi có người phản hồi bài viết của bạn' },
            { key: 'marketSummary', label: 'Tóm tắt thị trường', description: 'Báo cáo tổng kết thị trường hàng ngày' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                  onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Cài đặt bảo mật
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hiển thị hồ sơ
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="public">Công khai</option>
              <option value="friends">Chỉ bạn bè</option>
              <option value="private">Riêng tư</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {[
              { key: 'showPortfolio', label: 'Hiển thị danh mục đầu tư', description: 'Cho phép người khác xem danh mục của bạn' },
              { key: 'showWatchlist', label: 'Hiển thị watchlist', description: 'Cho phép người khác xem danh sách theo dõi của bạn' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                    onChange={(e) => updateSetting('privacy', item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Cài đặt giao diện
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chủ đề
            </label>
            <select
              value={settings.appearance.theme}
              onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="light">Sáng</option>
              <option value="dark">Tối</option>
              <option value="system">Theo hệ thống</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ngôn ngữ
            </label>
            <select
              value={settings.appearance.language}
              onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Đơn vị tiền tệ
            </label>
            <select
              value={settings.appearance.currency}
              onChange={(e) => updateSetting('appearance', 'currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="VND">VND (₫)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'privacy':
        return renderPrivacyTab();
      case 'appearance':
        return renderAppearanceTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3 text-gray-600 dark:text-gray-400" />
            Cài đặt tài khoản
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý thông tin cá nhân và tùy chỉnh trải nghiệm của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              {renderTabContent()}
              
              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Lưu thay đổi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;