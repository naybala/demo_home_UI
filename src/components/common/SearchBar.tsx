"use client";

import React from "react";

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClear?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  showClearButton?: boolean;
  currentSearchTerm?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function SearchBar({
  searchValue,
  onSearchChange,
  onSearch,
  onClear,
  placeholder = "Search...",
  isLoading = false,
  showClearButton = false,
  currentSearchTerm,
  disabled = false,
  children,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) {
      onSearch();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filter Composition Area */}
        {children}

        <div className="flex-1 relative">
          <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          onClick={onSearch}
          disabled={disabled || isLoading}
          className="px-8 py-3 bg-[#2D4356] hover:bg-[#1f2e3d] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <i
            className={`pi ${isLoading ? "pi-spin pi-spinner" : "pi-search"}`}
          ></i>
          <span>{isLoading ? "Searching..." : "Search"}</span>
        </button>
        {showClearButton && onClear && (
          <button
            onClick={onClear}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="pi pi-times"></i>
            <span>Clear</span>
          </button>
        )}
      </div>
      {currentSearchTerm && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <i className="pi pi-filter mr-2"></i>
          Searching for:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentSearchTerm}
          </span>
        </p>
      )}
    </div>
  );
}
