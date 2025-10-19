import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { PlusIcon, EditIcon, TrashIcon, MapPinIcon } from 'lucide-react';

export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  post_code: string;
  kind: 'Billing' | 'Shipping';
}

interface AddressManagerProps {
  addresses: Address[];
  onAdd: (address: Address) => void;
  onUpdate: (id: string, address: Address) => void;
  onDelete: (id: string) => void;
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
];

const addressTypes = [
  { value: 'Billing', label: 'Billing Address' },
  { value: 'Shipping', label: 'Shipping Address' }
];

export const AddressManager: React.FC<AddressManagerProps> = ({
  addresses,
  onAdd,
  onUpdate,
  onDelete,
  loading = false
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Address>({
    street: '',
    city: '',
    state: '',
    country: '',
    post_code: '',
    kind: 'Shipping'
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.street?.trim()) {
      errors.street = 'Street address is required';
    }

    if (!formData.city?.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state?.trim()) {
      errors.state = 'State/Province is required';
    }

    if (!formData.country?.trim()) {
      errors.country = 'Country is required';
    }

    if (!formData.post_code?.trim()) {
      errors.post_code = 'Postal code is required';
    }

    if (!formData.kind) {
      errors.kind = 'Address type is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
      setIsAddingNew(false);
    }

    // Reset form
    setFormData({
      street: '',
      city: '',
      state: '',
      country: '',
      post_code: '',
      kind: 'Shipping'
    });
    setValidationErrors({});
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingId(address.id || '');
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setFormData({
      street: '',
      city: '',
      state: '',
      country: '',
      post_code: '',
      kind: 'Shipping'
    });
    setValidationErrors({});
    setIsAddingNew(false);
    setEditingId(null);
  };

  const getCountryLabel = (countryCode: string) => {
    const country = countries.find(c => c.value === countryCode);
    return country ? country.label : countryCode;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Address Management
        </h2>
        {!isAddingNew && !editingId && (
          <Button
            onClick={() => setIsAddingNew(true)}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <PlusIcon size={16} />
            Add Address
          </Button>
        )}
      </div>

      {/* Address List */}
      <div className="space-y-4 mb-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon size={16} className="text-gray-500" />
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    address.kind === 'Billing'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                      : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  }`}>
                    {address.kind}
                  </span>
                </div>
                <div className="text-gray-900 dark:text-white">
                  <p className="font-medium">{address.street}</p>
                  <p>{address.city}, {address.state} {address.post_code}</p>
                  <p>{getCountryLabel(address.country)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(address)}
                  disabled={loading || isAddingNew || editingId !== null}
                >
                  <EditIcon size={14} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => address.id && onDelete(address.id)}
                  disabled={loading || isAddingNew || editingId !== null}
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <TrashIcon size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {addresses.length === 0 && !isAddingNew && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <MapPinIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>No addresses added yet</p>
            <p className="text-sm">Add your first address to get started</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Select
                label="Address Type"
                value={formData.kind}
                onChange={(value) => handleInputChange('kind', value as 'Billing' | 'Shipping')}
                error={validationErrors.kind}
                options={addressTypes}
                required
              />
            </div>

            <div>
              <Input
                label="Street Address"
                type="text"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                error={validationErrors.street}
                placeholder="123 Main Street, Apt 4B"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  error={validationErrors.city}
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <Input
                  label="State/Province"
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  error={validationErrors.state}
                  placeholder="NY"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  label="Country"
                  value={formData.country}
                  onChange={(value) => handleInputChange('country', value)}
                  error={validationErrors.country}
                  options={[
                    { value: '', label: 'Select Country' },
                    ...countries
                  ]}
                  required
                />
              </div>
              <div>
                <Input
                  label="Postal Code"
                  type="text"
                  value={formData.post_code}
                  onChange={(e) => handleInputChange('post_code', e.target.value)}
                  error={validationErrors.post_code}
                  placeholder="10001"
                  required
                />
              </div>
            </div>

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
                    {editingId ? 'Updating...' : 'Adding...'}
                  </div>
                ) : (
                  editingId ? 'Update Address' : 'Add Address'
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};