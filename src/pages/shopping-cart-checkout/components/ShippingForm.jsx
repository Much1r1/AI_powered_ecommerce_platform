import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShippingForm = ({ onSubmit, savedAddresses, isGuest }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveAddress: false,
    useAsBilling: true
  });
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(true);

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' }
  ];

  const states = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'IL', label: 'Illinois' }
  ];

  useEffect(() => {
    if (selectedAddress && savedAddresses?.length > 0) {
      const address = savedAddresses?.find(addr => addr?.id === selectedAddress);
      if (address) {
        setFormData(prev => ({
          ...prev,
          ...address,
          saveAddress: false
        }));
        setShowAddressForm(false);
      }
    } else if (selectedAddress === 'new') {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        saveAddress: false,
        useAsBilling: true
      });
      setShowAddressForm(true);
    }
  }, [selectedAddress, savedAddresses]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName) newErrors.firstName = 'First name is required';
    if (!formData?.lastName) newErrors.lastName = 'Last name is required';
    if (isGuest && !formData?.email) newErrors.email = 'Email is required';
    if (!formData?.phone) newErrors.phone = 'Phone number is required';
    if (!formData?.address) newErrors.address = 'Address is required';
    if (!formData?.city) newErrors.city = 'City is required';
    if (!formData?.state) newErrors.state = 'State is required';
    if (!formData?.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData?.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addressOptions = [
    ...(savedAddresses?.map(addr => ({
      value: addr?.id,
      label: `${addr?.firstName} ${addr?.lastName} - ${addr?.address}, ${addr?.city}`
    })) || []),
    { value: 'new', label: 'Add new address' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Icon name="Truck" size={20} className="mr-3 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Shipping Information
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Saved Addresses */}
        {!isGuest && savedAddresses && savedAddresses?.length > 0 && (
          <div className="mb-6">
            <Select
              label="Choose shipping address"
              options={addressOptions}
              value={selectedAddress}
              onChange={setSelectedAddress}
              placeholder="Select an address or add new"
            />
          </div>
        )}

        {/* Address Form */}
        {showAddressForm && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData?.firstName}
                onChange={handleInputChange}
                error={errors?.firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData?.lastName}
                onChange={handleInputChange}
                error={errors?.lastName}
                required
              />
            </div>

            {isGuest && (
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                description="We'll send order updates to this email"
                required
              />
            )}

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              error={errors?.phone}
              description="For delivery updates and coordination"
              required
            />

            <Input
              label="Address"
              name="address"
              value={formData?.address}
              onChange={handleInputChange}
              error={errors?.address}
              placeholder="Street address"
              required
            />

            <Input
              label="Apartment, suite, etc."
              name="apartment"
              value={formData?.apartment}
              onChange={handleInputChange}
              placeholder="Optional"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                name="city"
                value={formData?.city}
                onChange={handleInputChange}
                error={errors?.city}
                required
              />
              <Select
                label="State"
                name="state"
                options={states}
                value={formData?.state}
                onChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                error={errors?.state}
                required
              />
              <Input
                label="ZIP Code"
                name="zipCode"
                value={formData?.zipCode}
                onChange={handleInputChange}
                error={errors?.zipCode}
                required
              />
            </div>

            <Select
              label="Country"
              name="country"
              options={countries}
              value={formData?.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              error={errors?.country}
              required
            />

            {/* Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-border">
              {!isGuest && (
                <Checkbox
                  label="Save this address for future orders"
                  checked={formData?.saveAddress}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    saveAddress: e?.target?.checked 
                  }))}
                />
              )}
              
              <Checkbox
                label="Use this address for billing"
                checked={formData?.useAsBilling}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  useAsBilling: e?.target?.checked 
                }))}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="pt-6">
          <Button type="submit" fullWidth>
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;