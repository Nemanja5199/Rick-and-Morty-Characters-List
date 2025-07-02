import React from 'react';
import { CHARACTER_STATUS, CHARACTER_GENDER } from '../../types/character';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStatus: string;
  selectedGender: string;
  onStatusChange: (status: string) => void;
  onGenderChange: (gender: string) => void;  
  onApply: () => void;
  onClear: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedStatus,
  selectedGender,
  onStatusChange,
  onGenderChange,
  onApply,
  onClear
}) => {
  if (!isOpen) return null;

  const statusOptions = [
    { value: '', label: 'All' },
    { value: CHARACTER_STATUS.ALIVE, label: 'Alive' },
    { value: CHARACTER_STATUS.DEAD, label: 'Dead' },
    { value: CHARACTER_STATUS.UNKNOWN, label: 'Unknown' }
  ];


  const genderOptions = [
    { value: '', label: 'All' },
    { value: CHARACTER_GENDER.MALE, label: 'Male' },
    { value: CHARACTER_GENDER.FEMALE, label: 'Female' },
    { value: CHARACTER_GENDER.GENDERLESS, label: 'Genderless' },
    { value: CHARACTER_GENDER.UNKNOWN, label: 'Unknown' }
  ];


  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-sm mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Status</h3>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Gender</h3>
          <div className="space-y-2">
            {genderOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={selectedGender === option.value}
                  onChange={(e) => onGenderChange(e.target.value)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Clear All
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};