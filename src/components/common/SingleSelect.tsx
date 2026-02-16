"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

interface SingleSelectProps<T> {
  data: T[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  valueKey: keyof T;
  labelKey: keyof T;
  isImage?: boolean;
  imageKey?: keyof T; // Key for the image URL, defaults to 'flag' or 'image' if not provided
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function SingleSelect<T>({
  data,
  selectedValue,
  onValueChange,
  valueKey,
  labelKey,
  isImage = false,
  imageKey,
  placeholder = "Select an item",
  emptyText = "All Data",
  disabled = false,
  isLoading = false,
  className = "",
}: SingleSelectProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedItemData = useMemo(
    () => data.find((item) => String(item[valueKey]) === String(selectedValue)),
    [data, selectedValue, valueKey],
  );

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lowerSearch = searchTerm.toLowerCase().trim();
    return data.filter((item) => {
      const label = String(item[labelKey]).toLowerCase();
      const value = String(item[valueKey]).toLowerCase();
      return label.includes(lowerSearch) || value.includes(lowerSearch);
    });
  }, [data, searchTerm, labelKey, valueKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!isDropdownOpen) {
      setSearchTerm("");
    }
  }, [isDropdownOpen]);

  // Determine which key to use for image
  const finalImageKey = imageKey || ("flag" as keyof T) || ("image" as keyof T);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={disabled || isLoading}
        className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary transition-all min-w-[140px] justify-between text-gray-700 dark:text-gray-300 disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          {selectedItemData ? (
            <>
              {isImage && selectedItemData[finalImageKey] && (
                <img
                  src={String(selectedItemData[finalImageKey])}
                  alt={String(selectedItemData[labelKey])}
                  className="w-5 h-3.5 object-cover rounded-sm"
                />
              )}
              <span className="font-medium text-sm">
                {String(selectedItemData[labelKey])}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium">{emptyText}</span>
          )}
        </div>
        <i
          className={`pi pi-chevron-down transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
        ></i>
      </button>

      {isDropdownOpen && (
        <div className="absolute z-50 left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-3 border-b border-gray-50 dark:border-gray-700">
            <div className="relative">
              <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {!searchTerm && (
              <button
                type="button"
                onClick={() => {
                  onValueChange("");
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 ${!selectedValue ? "bg-primary/5 text-primary" : "text-gray-700 dark:text-gray-300"}`}
              >
                <div className="w-5 h-3.5 flex items-center justify-center">
                  <i className="pi pi-globe text-xs opacity-40"></i>
                </div>
                <span className="text-sm font-medium">{emptyText}</span>
              </button>
            )}

            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <button
                  key={`${String(item[valueKey])}-${index}`}
                  type="button"
                  onClick={() => {
                    onValueChange(String(item[valueKey]));
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${String(selectedValue) === String(item[valueKey]) ? "bg-primary/5 text-primary" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {isImage && item[finalImageKey] && (
                    <img
                      src={String(item[finalImageKey])}
                      alt={String(item[labelKey])}
                      className="w-5 h-3.5 object-cover rounded-sm"
                    />
                  )}
                  <div className="flex flex-col items-start truncate">
                    <span className="text-sm font-bold truncate w-full text-left">
                      {String(item[labelKey])}
                    </span>
                    <span className="text-xs opacity-60">
                      {String(item[valueKey])}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <i className="pi pi-search text-gray-300 text-xl mb-2"></i>
                <p className="text-sm text-gray-500">No data found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
