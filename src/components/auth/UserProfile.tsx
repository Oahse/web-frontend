import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

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
}

interface UserProfileProps {
  user: User;
  editable?: boolean;
  onUpdate: (updates: Partial<User>) => void;
  loading?: boolean;
}

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'AU', label: 'Australia' },
  { value: 'BR', label: 'Brazil' },
  { value: 'IN', label: 'India' },
  { value: 'CN', label: 'China' },
  // Add more countries as needed
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese' },
];

const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  editable = true,
  onUpdate,
  loading = false
}) => {
  const [formData, setFormData] = useState<Partial<User>>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof User, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstname?.trim()) {
      errors.firstname = 'First name is required';
    }

    if (!formData.lastname?.trim()) {
      errors.lastname = 'Last name is required';
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (formData.phone) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;      const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    if (formData.age && (formData.age < 13 || formData.age > 120)) {
      errors.age = 'Age must be between 13 and 120';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setValidationErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h2>
        {editable && !isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl text-gray-500">
              {user.firstname?.[0]}{user.lastname?.[0]}
            </span>
          )}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {user.firstname} {user.lastname}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          <div className="flex items-center mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.verified 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
            }`}>
              {user.verified ? '✓ Verified' : '⚠ Unverified'}
            </span>
            <span className="ml-2 text-xs text-gray-500 capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="First Name"
              type="text"
              value={formData.firstname || ''}
              onChange={(e) => handleInputChange('firstname', e.target.value)}
              error={validationErrors.firstname}
              disabled={!isEditing}
              required
            />
          </div>
          <div>
            <Input
              label="Last Name"
              type="text"
              value={formData.lastname || ''}
              onChange={(e) => handleInputChange('lastname', e.target.value)}
              error={validationErrors.lastname}
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={validationErrors.email}
              disabled={!isEditing}
              required
            />
          </div>
          <div>
            <Input
              label="Phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={validationErrors.phone}
              disabled={!isEditing}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Age"
              type="number"
              value={formData.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              error={validationErrors.age}
              disabled={!isEditing}
              min="13"
              max="120"
            />
          </div>
          <div>
            <Select
              label="Gender"
              value={formData.gender || ''}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              disabled={!isEditing}
              options={[
                { value: '', label: 'Select Gender' },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]}
            />
          </div>
          <div>
            <Select
              label="Language"
              value={formData.language || 'en'}
              onChange={(e) => handleInputChange('language', e.target.value)}
              disabled={!isEditing}
              options={languages}
            />
          </div>
        </div>

        {/* Location and Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              label="Country"
              value={formData.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              disabled={!isEditing}
              options={[
                { value: '', label: 'Select Country' },
                ...countries
              ]}
            />
          </div>
          <div>
            <Select
              label="Timezone"
              value={formData.timezone || ''}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              disabled={!isEditing}
              options={[
                { value: '', label: 'Select Timezone' },
                ...timezones
              ]}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};