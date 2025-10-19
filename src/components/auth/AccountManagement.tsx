import React, { useState } from 'react';
import { UserProfile } from './UserProfile';
import { AddressManager, Address } from './AddressManager';
import { UserDataExport } from './UserDataExport';
import { VerificationManager } from './VerificationManager';
import { SocialAuth } from './SocialAuth';
import { Button } from '../ui/Button';
import { 
  UserIcon, 
  MapPinIcon, 
  DownloadIcon, 
  ShieldCheckIcon, 
  LinkIcon,
  SettingsIcon 
} from 'lucide-react';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  role: string;
  verified: boolean;
  active: boolean;
  age?: number;
  gender?: 'Male' | 'Female';
  language: string;
  country?: string;
  timezone?: string;
  preferences?: Record<string, unknown>;
  picture?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

interface AccountManagementProps {
  user: User;
  addresses: Address[];
  onUpdateUser: (updates: Partial<User>) => Promise<void>;
  onAddAddress: (address: Address) => Promise<void>;
  onUpdateAddress: (id: string, address: Address) => Promise<void>;
  onDeleteAddress: (id: string) => Promise<void>;
  onExportData: (format: 'csv' | 'excel' | 'json') => Promise<void>;
  onVerifyEmail: (code: string) => Promise<void>;
  onVerifyPhone: (code: string) => Promise<void>;
  onResendEmailCode: () => Promise<void>;
  onResendPhoneCode: () => Promise<void>;
  onSocialAuthSuccess: (provider: string, userData: User) => Promise<void>;
  loading?: boolean;
}

type TabType = 'profile' | 'addresses' | 'verification' | 'social' | 'export' | 'preferences';

export const AccountManagement: React.FC<AccountManagementProps> = ({
  user,
  addresses,
  onUpdateUser,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onExportData,
  onVerifyEmail,
  onVerifyPhone,
  onResendEmailCode,
  onResendPhoneCode,
  onSocialAuthSuccess,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: <UserIcon size={20} />,
      description: 'Manage your personal information'
    },
    {
      id: 'addresses' as TabType,
      label: 'Addresses',
      icon: <MapPinIcon size={20} />,
      description: 'Manage billing and shipping addresses'
    },
    {
      id: 'verification' as TabType,
      label: 'Verification',
      icon: <ShieldCheckIcon size={20} />,
      description: 'Verify your email and phone number'
    },
    {
      id: 'social' as TabType,
      label: 'Social Accounts',
      icon: <LinkIcon size={20} />,
      description: 'Link social media accounts'
    },
    {
      id: 'export' as TabType,
      label: 'Data Export',
      icon: <DownloadIcon size={20} />,
      description: 'Download your data'
    },
    {
      id: 'preferences' as TabType,
      label: 'Preferences',
      icon: <SettingsIcon size={20} />,
      description: 'Customize your experience'
    }
  ];

  const handleSocialAuthError = (error: unknown) => {
    console.error('Social auth error:', error);
    // Handle error (show toast, etc.)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Account Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings, preferences, and personal information
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
                  {tab.icon}
                </span>
                <div>
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeTab === 'profile' && (
            <UserProfile
              user={user}
              onUpdate={onUpdateUser}
              loading={loading}
            />
          )}

          {activeTab === 'addresses' && (
            <AddressManager
              addresses={addresses}
              onAdd={onAddAddress}
              onUpdate={onUpdateAddress}
              onDelete={onDeleteAddress}
              loading={loading}
            />
          )}

          {activeTab === 'verification' && (
            <VerificationManager
              email={user.email}
              phone={user.phone}
              emailVerified={user.emailVerified || false}
              phoneVerified={user.phoneVerified || false}
              onVerifyEmail={onVerifyEmail}
              onVerifyPhone={onVerifyPhone}
              onResendEmailCode={onResendEmailCode}
              onResendPhoneCode={onResendPhoneCode}
              loading={loading}
            />
          )}

          {activeTab === 'social' && (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Social Media Accounts
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Link your social media accounts for easier sign-in and enhanced features.
                </p>
              </div>

              <SocialAuth
                mode="link"
                onSuccess={onSocialAuthSuccess}
                onError={handleSocialAuthError}
              />

              {/* Connected Accounts Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Connected Accounts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📧</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400">Primary</span>
                  </div>
                  
                  {user.phone && (
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📱</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone}</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 dark:text-green-400">Connected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <UserDataExport
              onExport={onExportData}
              loading={loading}
            />
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Preferences
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Customize your experience and notification settings.
                </p>
              </div>

              <div className="space-y-6">
                {/* Language & Region */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Language & Region
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Language
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="DE">Germany</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via SMS</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Marketing Communications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive promotional offers</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Privacy
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Profile Visibility</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Make your profile visible to others</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Activity Tracking</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allow tracking for personalized experience</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full md:w-auto">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};