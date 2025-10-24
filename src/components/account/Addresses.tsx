import React, { useState, useEffect } from 'react';
import { PlusCircleIcon, MapPinIcon, HomeIcon, BriefcaseIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApi, useMutation } from '../../hooks/useApi';
import { apiClient, AuthAPI } from '../../apis';
import { Address } from '../../types';

export const Addresses: React.FC = () => {
  const { data: addresses, loading, error, execute: fetchAddresses, setData: setAddresses } = useApi<Address[]>();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id' | 'created_at' | 'updated_at' | 'user_id'>>({
    street: '',
    city: '',
    state: '',
    post_code: '',
    country: 'United States',
    kind: 'Shipping',
  });

  const addAddressMutation = useMutation<Address, Omit<Address, 'id' | 'created_at' | 'updated_at' | 'user_id'>>();
  const updateAddressMutation = useMutation<Address, { addressId: string, data: Omit<Address, 'id' | 'created_at' | 'updated_at' | 'user_id'> }>();
  const deleteAddressMutation = useMutation<{ message: string }, string>();

  useEffect(() => {
    fetchAddresses(AuthAPI.getAddresses);
  }, [fetchAddresses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressId) {
      const result = await updateAddressMutation.mutate(
        (vars) => AuthAPI.updateAddress(vars.addressId, vars.data),
        { addressId: editingAddressId, data: formData }
      );
      if (result) {
        setAddresses(addresses?.map(a => a.id === editingAddressId ? result : a));
        toast.success('Address updated successfully');
      }
    } else {
      const result = await addAddressMutation.mutate(AuthAPI.addAddress, formData);
      if (result) {
        setAddresses(addresses ? [...addresses, result] : [result]);
        toast.success('Address added successfully');
      }
    }
    resetForm();
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      post_code: address.post_code,
      country: address.country,
      kind: address.kind,
    });
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id: string) => {
    await deleteAddressMutation.mutate(AuthAPI.deleteAddress, id);
    setAddresses(addresses?.filter(a => a.id !== id));
    toast.success('Address removed');
  };

  const resetForm = () => {
    setFormData({
      street: '',
      city: '',
      state: '',
      post_code: '',
      country: 'United States',
      kind: 'Shipping',
    });
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'Shipping':
        return <HomeIcon size={16} />;
      case 'Billing':
        return <BriefcaseIcon size={16} />;
      default:
        return <MapPinIcon size={16} />;
    }
  };

  if (loading) {
    return <div>Loading addresses...</div>;
  }

  if (error) {
    const errorMessage = typeof error.message === 'object' ? JSON.stringify(error.message) : error.message;
    return <div>Error: {errorMessage}</div>;
  }

  return <div>
      <h1 className="text-2xl font-bold text-main dark:text-white mb-6">
        My Addresses
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-main dark:text-white">
            Saved Addresses
          </h2>
          <button onClick={() => setShowAddressForm(!showAddressForm)} className="flex items-center text-primary hover:text-primary-dark">
            <PlusCircleIcon size={18} className="mr-1" />
            <span>Add New Address</span>
          </button>
        </div>
        {addresses && addresses.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map(address => <div key={address.id} className={`border rounded-lg p-4 border-gray-200 dark:border-gray-700'`}>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <span className="mr-1">
                      {getAddressTypeIcon(address.kind)}
                    </span>
                    <span className="font-medium text-main dark:text-white capitalize">
                      {address.kind}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {address.street}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {address.city}, {address.state} {address.post_code}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {address.country}
                </p>
                <div className="flex mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={() => handleEditAddress(address)} className="flex items-center text-sm text-gray-600 hover:text-primary dark:text-gray-300 mr-4">
                    <PencilIcon size={14} className="mr-1" />
                    Edit
                  </button>
                  <button onClick={() => handleDeleteAddress(address.id)} className="flex items-center text-sm text-gray-600 hover:text-red-500 dark:text-gray-300 mr-4">
                    <TrashIcon size={14} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>)}
          </div> : <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <MapPinIcon size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-3">
              No addresses saved yet
            </p>
            <button onClick={() => setShowAddressForm(true)} className="text-primary hover:underline">
              Add your first address
            </button>
          </div>}
        {showAddressForm && <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-main dark:text-white mb-4">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <form onSubmit={handleAddressSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Street Address
                  </label>
                  <input type="text" name="street" value={formData.street} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State / Province
                  </label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Postal / Zip Code
                  </label>
                  <input type="text" name="post_code" value={formData.post_code} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" required />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address Type
                  </label>
                  <select name="kind" value={formData.kind} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white">
                    <option value="Shipping">Shipping</option>
                    <option value="Billing">Billing</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md">
                  {editingAddressId ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>}
      </div>
    </div>;
};
export default Addresses;