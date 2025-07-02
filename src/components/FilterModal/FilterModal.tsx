import React from "react";
import { CHARACTER_STATUS, CHARACTER_GENDER } from "../../types/character";

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
  onClear,
}) => {
  if (!isOpen) return null;

  const statusOptions = [
    { value: "", label: "All" },
    { value: CHARACTER_STATUS.ALIVE, label: "Alive" },
    { value: CHARACTER_STATUS.DEAD, label: "Dead" },
    { value: CHARACTER_STATUS.UNKNOWN, label: "Unknown" },
  ];

  const genderOptions = [
    { value: "", label: "All" },
    { value: CHARACTER_GENDER.MALE, label: "Male" },
    { value: CHARACTER_GENDER.FEMALE, label: "Female" },
    { value: CHARACTER_GENDER.GENDERLESS, label: "Genderless" },
    { value: CHARACTER_GENDER.UNKNOWN, label: "Unknown" },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl p-6 w-full max-w-md shadow-2xl border"
        style={{
          backgroundColor: "rgb(60, 68, 82)",
          borderColor: "rgb(75, 85, 99)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-600"
          >
            ×
          </button>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-gray-200">Status</h3>
          <div className="space-y-3">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-500 focus:ring-blue-500 focus:ring-2"
                  style={{
                    backgroundColor:
                      selectedStatus === option.value
                        ? "rgb(59, 130, 246)"
                        : "rgb(75, 85, 99)",
                    borderColor: "rgb(75, 85, 99)",
                  }}
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="mb-8">
          <h3 className="font-medium mb-3 text-gray-200">Gender</h3>
          <div className="space-y-3">
            {genderOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={selectedGender === option.value}
                  onChange={(e) => onGenderChange(e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-500 focus:ring-blue-500 focus:ring-2"
                  style={{
                    backgroundColor:
                      selectedGender === option.value
                        ? "rgb(59, 130, 246)"
                        : "rgb(75, 85, 99)",
                    borderColor: "rgb(75, 85, 99)",
                  }}
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-300 hover:text-white"
            style={{
              backgroundColor: "rgb(75, 85, 99)",
              border: "1px solid rgb(107, 114, 128)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgb(107, 114, 128)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgb(75, 85, 99)";
            }}
          >
            Clear All
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all duration-200"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
