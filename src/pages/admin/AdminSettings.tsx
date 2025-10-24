import React, { useState, useEffect } from 'react';
import { useApi, useMutation } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';
import { SystemSettings } from '../../types';
import { toast } from 'react-hot-toast';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(null);

  const { data: fetchedSettings, loading, error, refetch } = useApi<SystemSettings>(
    () => AdminAPI.getSystemSettings(),
    { autoFetch: true, showErrorToast: false }
  );

  const { mutate: updateSettings, loading: updating, error: updateError } = useMutation<SystemSettings, Partial<SystemSettings>>(
    (updates) => AdminAPI.updateSystemSettings(updates),
    {
      onSuccess: (data) => {
        setSettings(data);
        toast.success('Settings updated successfully!');
      },
      onError: (err) => {
        toast.error(`Failed to update settings: ${err.message}`);
      },
    }
  );

  useEffect(() => {
    if (fetchedSettings && !settings) {
      setSettings(fetchedSettings);
    }
  }, [fetchedSettings, settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      updateSettings(settings);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-copy-light">Loading settings...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage
          error={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!settings) {
    return <div className="p-6 text-center text-copy-light">No settings found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-main mb-6">System Settings</h1>
      <form onSubmit={handleSubmit} className="bg-surface rounded-lg shadow-sm p-6 border border-border-light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between bg-background p-4 rounded-md border border-border">
            <div>
              <label htmlFor="maintenance_mode" className="block text-lg font-medium text-main">Maintenance Mode</label>
              <p className="text-sm text-copy-light">Temporarily disable site access for maintenance.</p>
            </div>
            <input
              type="checkbox"
              id="maintenance_mode"
              name="maintenance_mode"
              checked={settings.maintenance_mode}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </div>

          {/* Registration Enabled */}
          <div className="flex items-center justify-between bg-background p-4 rounded-md border border-border">
            <div>
              <label htmlFor="registration_enabled" className="block text-lg font-medium text-main">User Registration</label>
              <p className="text-sm text-copy-light">Allow new users to register accounts.</p>
            </div>
            <input
              type="checkbox"
              id="registration_enabled"
              name="registration_enabled"
              checked={settings.registration_enabled}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </div>

          {/* Max File Size */}
          <div className="bg-background p-4 rounded-md border border-border">
            <label htmlFor="max_file_size" className="block text-lg font-medium text-main mb-2">Max File Upload Size (MB)</label>
            <input
              type="number"
              id="max_file_size"
              name="max_file_size"
              value={settings.max_file_size}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-surface text-copy"
            />
            <p className="text-sm text-copy-light mt-1">Maximum size for file uploads (e.g., product images).</p>
          </div>

          {/* Allowed File Types */}
          <div className="bg-background p-4 rounded-md border border-border">
            <label htmlFor="allowed_file_types" className="block text-lg font-medium text-main mb-2">Allowed File Types</label>
            <input
              type="text"
              id="allowed_file_types"
              name="allowed_file_types"
              value={settings.allowed_file_types}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-surface text-copy"
            />
            <p className="text-sm text-copy-light mt-1">Comma-separated list of allowed file extensions (e.g., jpg,png,pdf).</p>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between bg-background p-4 rounded-md border border-border">
            <div>
              <label htmlFor="email_notifications" className="block text-lg font-medium text-main">Email Notifications</label>
              <p className="text-sm text-copy-light">Enable or disable system-wide email notifications.</p>
            </div>
            <input
              type="checkbox"
              id="email_notifications"
              name="email_notifications"
              checked={settings.email_notifications}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between bg-background p-4 rounded-md border border-border">
            <div>
              <label htmlFor="sms_notifications" className="block text-lg font-medium text-main">SMS Notifications</label>
              <p className="text-sm text-copy-light">Enable or disable system-wide SMS notifications.</p>
            </div>
            <input
              type="checkbox"
              id="sms_notifications"
              name="sms_notifications"
              checked={settings.sms_notifications}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={updating}
          >
            {updating ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};