import React from 'react';
import { CATEGORIES } from '../data/seedData.js';

export default function FilterToolbar({
  selectedCategory,
  onSelectCategory,
  stockFilter,
  onSelectStockFilter,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderToggle,
  totalResults,
  onOpenExport,
  auditMode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 mb-6">
      {/* Top Row: Search, Sort, Stock Status Pills & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 500+ items by SKU, name, barcode, supplier, aisle..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-slate-400 text-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Controls: Stock Status & Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Stock Filter Dropdown / Selector */}
          <div className="flex items-center text-xs">
            <span className="text-slate-400 mr-2 font-medium">Status:</span>
            <select
              value={stockFilter}
              onChange={(e) => onSelectStockFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium py-1.5 px-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Items</option>
              <option value="in_stock">In Stock (Healthy)</option>
              <option value="low_stock">⚠️ Low Stock (≤ Reorder)</option>
              <option value="out_of_stock">🚫 Out of Stock (0)</option>
              <option value="pending_audit">📋 Pending Daily Audit</option>
              <option value="audited_today">✅ Audited Today</option>
              <option value="discrepancy">⚡ Audit Discrepancies</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center text-xs">
            <span className="text-slate-400 mr-2 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium py-1.5 px-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="id">Default (ID)</option>
              <option value="currentStock">Stock Level</option>
              <option value="name">Product Name</option>
              <option value="sku">SKU Code</option>
              <option value="retailPrice">Retail Price</option>
              <option value="inventoryValue">Inventory Value</option>
              <option value="reorderPoint">Reorder Threshold</option>
            </select>

            <button
              onClick={onSortOrderToggle}
              className="ml-1 p-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 transition"
              title={sortOrder === 'asc' ? 'Ascending (click for Descending)' : 'Descending (click for Ascending)'}
            >
              {sortOrder === 'asc' ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              )}
            </button>
          </div>

          {/* Export Report */}
          <button
            onClick={onOpenExport}
            className="text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 py-1.5 px-3 rounded-lg transition flex items-center space-x-1"
            title="Export CSV / JSON Report"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Category Pills Horizontal Scrolling */}
      <div className="flex items-center space-x-2 pt-3 overflow-x-auto no-scrollbar">
        <span className="text-xs font-semibold text-slate-400 whitespace-nowrap mr-1">
          Categories:
        </span>
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id.toString() || selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id.toString())}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap flex items-center space-x-1 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicators */}
      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <span>Found <strong className="text-slate-800 font-semibold">{totalResults}</strong> matching items</span>
          {auditMode && (
            <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Daily Stock Audit Mode: Priority focus on physical counts</span>
            </span>
          )}
        </div>
        {(selectedCategory !== 'all' || stockFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectStockFilter('all');
              onSearchChange('');
            }}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-xs hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
