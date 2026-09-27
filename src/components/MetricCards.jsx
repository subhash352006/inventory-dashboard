import React from 'react';

export default function MetricCards({ metrics, onFilterStock }) {
  if (!metrics) return null;

  const {
    totalSKUs,
    totalStockUnits,
    totalInventoryValue,
    totalCostValuation,
    lowStockCount,
    outOfStockCount,
    auditedTodayCount,
    discrepancyCount,
    auditComplianceRate
  } = metrics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* 1. Total Catalog SKUs */}
      <div 
        onClick={() => onFilterStock('all')}
        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-indigo-400 hover:shadow-md transition cursor-pointer group"
      >
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition">
            Active Catalog
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">{totalSKUs.toLocaleString()}</div>
        <div className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
          <span className="font-medium text-emerald-600">500+ Items</span>
          <span>across 8 categories</span>
        </div>
      </div>

      {/* 2. Total Stock Units */}
      <div 
        onClick={() => onFilterStock('in_stock')}
        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition cursor-pointer group"
      >
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition">
            Total Inventory Units
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">{totalStockUnits.toLocaleString()}</div>
        <div className="text-xs text-slate-500 mt-1">
          Physical inventory units in store
        </div>
      </div>

      {/* 3. Inventory Valuation */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Valuation (Retail / Cost)
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          ${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
        <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
          <span>Cost Basis:</span>
          <span className="font-semibold text-slate-700">${totalCostValuation.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      {/* 4. Stock Attention / Low & Out */}
      <div 
        onClick={() => onFilterStock('low_stock')}
        className={`rounded-xl p-4 border transition cursor-pointer group ${
          lowStockCount > 0 || outOfStockCount > 0
            ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400 hover:shadow-md'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 group-hover:text-amber-900 transition">
            Stock Alerts
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-amber-900 flex items-center space-x-2">
          <span>{lowStockCount}</span>
          <span className="text-xs font-normal text-amber-700">low stock</span>
        </div>
        <div className="text-xs text-red-600 font-medium mt-1 flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          <span>{outOfStockCount} SKUs completely out of stock</span>
        </div>
      </div>

      {/* 5. Daily Stock Audit Progress */}
      <div 
        onClick={() => onFilterStock('pending_audit')}
        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-teal-400 hover:shadow-md transition cursor-pointer group"
      >
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-teal-600 transition">
            Daily Audit Health
          </span>
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
          <span>{auditedTodayCount}</span>
          <span className="text-xs font-medium text-slate-500">audited today</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-slate-500">{auditComplianceRate}% verified</span>
          {discrepancyCount > 0 ? (
            <span className="text-orange-600 font-semibold bg-orange-50 px-1.5 py-0.5 rounded">
              {discrepancyCount} variances
            </span>
          ) : (
            <span className="text-emerald-600 font-medium">Counts aligned</span>
          )}
        </div>
      </div>
    </div>
  );
}
