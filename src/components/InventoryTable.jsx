import React, { useState } from 'react';

export default function InventoryTable({
  items = [],
  totalCount = 0,
  page = 1,
  pageSize = 25,
  totalPages = 1,
  onPageChange,
  onPageSizeChange,
  onUpdateQuantity,
  onOpenAuditModal,
  onEditProduct,
  onDeleteProduct,
  isLoading = false,
  updatingItemId = null
}) {
  const [editingStockId, setEditingStockId] = useState(null);
  const [tempStockValue, setTempStockValue] = useState('');

  const handleStockInputStart = (item) => {
    setEditingStockId(item.id);
    setTempStockValue(item.currentStock.toString());
  };

  const handleStockInputSubmit = (item) => {
    const val = parseInt(tempStockValue, 10);
    if (!isNaN(val) && val >= 0 && val !== item.currentStock) {
      onUpdateQuantity(item.id, val, 'Direct Table Edit');
    }
    setEditingStockId(null);
  };

  const getStockHealthClass = (stock, reorder) => {
    if (stock === 0) return { bar: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', label: 'Out of Stock' };
    if (stock <= reorder) return { bar: 'bg-amber-500', text: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Low Stock' };
    return { bar: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Healthy' };
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden mb-6">
      {/* Table Container */}
      <div className="overflow-x-auto min-h-[420px]">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Item Details & SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4 min-w-[200px]">Inventory Level & Reorder</th>
              <th className="py-3 px-4 min-w-[150px]">Quick Quantity</th>
              <th className="py-3 px-4">Unit Pricing</th>
              <th className="py-3 px-4">Daily Audit</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              // Loading Skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-3.5 px-4"><div className="h-4 bg-slate-200 rounded w-36 mb-1"></div><div className="h-3 bg-slate-100 rounded w-20"></div></td>
                  <td className="py-3.5 px-4"><div className="h-4 bg-slate-100 rounded w-24"></div></td>
                  <td className="py-3.5 px-4"><div className="h-4 bg-slate-100 rounded w-28"></div></td>
                  <td className="py-3.5 px-4"><div className="h-3 bg-slate-200 rounded w-full mb-1.5"></div><div className="h-3 bg-slate-100 rounded w-20"></div></td>
                  <td className="py-3.5 px-4"><div className="h-7 bg-slate-100 rounded w-24"></div></td>
                  <td className="py-3.5 px-4"><div className="h-4 bg-slate-100 rounded w-16"></div></td>
                  <td className="py-3.5 px-4"><div className="h-5 bg-slate-200 rounded-full w-20"></div></td>
                  <td className="py-3.5 px-4 text-right"><div className="h-6 bg-slate-100 rounded w-16 ml-auto"></div></td>
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-500">
                  <div className="w-12 h-12 mx-auto mb-3 text-slate-300">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="font-semibold text-slate-700">No inventory items found</p>
                  <p className="text-xs text-slate-400 mt-1">Try clearing your category or status filters</p>
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const health = getStockHealthClass(item.currentStock, item.reorderPoint);
                const maxDisplayCapacity = Math.max(item.reorderPoint * 3, item.currentStock, 30);
                const percentage = Math.min(100, Math.round((item.currentStock / maxDisplayCapacity) * 100));
                const isUpdating = updatingItemId === item.id;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      item.currentStock === 0 ? 'bg-red-50/30' : ''
                    }`}
                  >
                    {/* Item Details & SKU */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 leading-snug line-clamp-1" title={item.name}>
                        {item.name}
                      </div>
                      <div className="flex items-center space-x-2 mt-0.5 text-xs text-slate-500">
                        <span className="font-mono font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                          {item.sku}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px] hidden sm:inline">
                          EAN: {item.barcode.slice(-6)}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="flex items-center space-x-1">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate max-w-[120px]" title={item.location}>{item.location}</span>
                      </div>
                    </td>

                    {/* Inventory Level & Health Gauge */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-bold ${health.text}`}>
                            {item.currentStock} units
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Min: {item.reorderPoint}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${health.bar}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className={`font-semibold px-1.5 py-0.2 rounded border ${health.bg} ${health.text} ${health.border}`}>
                            {health.label}
                          </span>
                          <span className="text-slate-400">
                            ${(item.currentStock * item.retailPrice).toFixed(0)} val
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Quick Quantity Adjuster (+/- REST API) */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        {/* Decrement Button */}
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.currentStock - 1), 'Floor Decrease (-1)')}
                          disabled={item.currentStock <= 0 || isUpdating}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition font-bold"
                          title="Decrease 1 unit"
                        >
                          -
                        </button>

                        {/* Direct Editable Stock */}
                        {editingStockId === item.id ? (
                          <input
                            type="number"
                            min="0"
                            autoFocus
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(e.target.value)}
                            onBlur={() => handleStockInputSubmit(item)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleStockInputSubmit(item);
                              if (e.key === 'Escape') setEditingStockId(null);
                            }}
                            className="w-14 text-center py-0.5 text-xs font-bold border-2 border-indigo-500 rounded bg-white focus:outline-none"
                          />
                        ) : (
                          <div
                            onClick={() => handleStockInputStart(item)}
                            className="w-14 text-center py-1 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded cursor-pointer hover:border-indigo-400 transition"
                            title="Click to manually type exact quantity"
                          >
                            {isUpdating ? (
                              <span className="inline-block w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                              item.currentStock
                            )}
                          </div>
                        )}

                        {/* Increment Button */}
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.currentStock + 1, 'Restock Increase (+1)')}
                          disabled={isUpdating}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 transition font-bold"
                          title="Increase 1 unit"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Unit Pricing */}
                    <td className="py-3 px-4 text-xs">
                      <div className="font-semibold text-slate-800">${item.retailPrice.toFixed(2)}</div>
                      <div className="text-[11px] text-slate-400">Cost: ${item.costPrice.toFixed(2)}</div>
                    </td>

                    {/* Daily Audit Status & Quick Audit */}
                    <td className="py-3 px-4">
                      {item.auditStatus === 'audited' ? (
                        <div className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-medium">
                          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Audited</span>
                        </div>
                      ) : item.auditStatus === 'discrepancy' ? (
                        <div className="inline-flex items-center space-x-1 bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full text-xs font-medium">
                          <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                          </svg>
                          <span>Var: {item.discrepancyQty > 0 ? `+${item.discrepancyQty}` : item.discrepancyQty}</span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full text-xs font-medium">
                          Pending Audit
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {/* Audit Verification Trigger */}
                        <button
                          onClick={() => onOpenAuditModal(item)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200/80 transition flex items-center space-x-1"
                          title="Record physical stock count audit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span>Audit</span>
                        </button>

                        {/* Edit Product Details */}
                        <button
                          onClick={() => onEditProduct(item)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition"
                          title="Edit Product Details"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Delete Product */}
                        <button
                          onClick={() => onDeleteProduct(item.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                          title="Delete SKU"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 flex items-center space-x-3">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{items.length > 0 ? (page - 1) * pageSize + 1 : 0}</strong> to{' '}
            <strong className="text-slate-800 font-semibold">{Math.min(page * pageSize, totalCount)}</strong> of{' '}
            <strong className="text-slate-800 font-semibold">{totalCount}</strong> records
          </span>

          {/* Page size dropdown */}
          <div className="flex items-center space-x-1.5 border-l border-slate-200 pl-3">
            <span>Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
              className="bg-white border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-700 font-medium"
            >
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All (500+)</option>
            </select>
          </div>
        </div>

        {pageSize !== 'all' && totalPages > 1 && (
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onPageChange(1)}
              disabled={page === 1}
              className="px-2 py-1 text-xs border border-slate-200 rounded bg-white disabled:opacity-40 hover:bg-slate-100"
              title="First Page"
            >
              «
            </button>
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-2.5 py-1 text-xs border border-slate-200 rounded bg-white disabled:opacity-40 hover:bg-slate-100 font-medium"
            >
              Previous
            </button>
            <span className="text-xs text-slate-600 px-2 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-2.5 py-1 text-xs border border-slate-200 rounded bg-white disabled:opacity-40 hover:bg-slate-100 font-medium"
            >
              Next
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={page >= totalPages}
              className="px-2 py-1 text-xs border border-slate-200 rounded bg-white disabled:opacity-40 hover:bg-slate-100"
              title="Last Page"
            >
              »
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
