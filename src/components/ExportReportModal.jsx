import React, { useState } from 'react';

export default function ExportReportModal({
  isOpen,
  onClose,
  items = [],
  logs = [],
  metrics = null
}) {
  const [reportType, setReportType] = useState('audit');
  const [format, setFormat] = useState('csv');

  if (!isOpen) return null;

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const timestamp = new Date().toISOString().slice(0, 10);

    if (reportType === 'audit') {
      if (format === 'csv') {
        const headers = ['Audit ID', 'SKU', 'Product Name', 'Physical Count', 'System Count', 'Variance', 'Cost Impact ($)', 'Auditor', 'Timestamp', 'Notes'];
        const rows = logs.map(l => [
          l.id,
          l.sku,
          `"${l.productName.replace(/"/g, '""')}"`,
          l.physicalCount,
          l.systemCount,
          l.discrepancy,
          l.costImpact.toFixed(2),
          `"${l.operatorName}"`,
          l.timestamp,
          `"${(l.notes || '').replace(/"/g, '""')}"`
        ]);
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        downloadFile(csvContent, `daily-stock-audit-report-${timestamp}.csv`, 'text/csv;charset=utf-8;');
      } else {
        const jsonContent = JSON.stringify({ generatedAt: new Date().toISOString(), metrics, logs }, null, 2);
        downloadFile(jsonContent, `daily-stock-audit-report-${timestamp}.json`, 'application/json');
      }
    } else if (reportType === 'low_stock') {
      const lowStockItems = items.filter(i => i.currentStock <= i.reorderPoint);
      if (format === 'csv') {
        const headers = ['SKU', 'Product Name', 'Category', 'Current Stock', 'Reorder Point', 'Deficit', 'Supplier', 'Cost Price', 'Reorder Cost'];
        const rows = lowStockItems.map(i => [
          i.sku,
          `"${i.name.replace(/"/g, '""')}"`,
          i.category,
          i.currentStock,
          i.reorderPoint,
          Math.max(0, i.reorderPoint - i.currentStock),
          `"${i.supplierName}"`,
          i.costPrice.toFixed(2),
          (Math.max(0, i.reorderPoint - i.currentStock) * i.costPrice).toFixed(2)
        ]);
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        downloadFile(csvContent, `low-stock-reorder-list-${timestamp}.csv`, 'text/csv;charset=utf-8;');
      } else {
        downloadFile(JSON.stringify(lowStockItems, null, 2), `low-stock-reorder-list-${timestamp}.json`, 'application/json');
      }
    } else {
      // Full Catalog
      if (format === 'csv') {
        const headers = ['SKU', 'Barcode', 'Product Name', 'Category', 'Current Stock', 'Reorder Point', 'Cost Price', 'Retail Price', 'Location', 'Audit Status'];
        const rows = items.map(i => [
          i.sku,
          i.barcode,
          `"${i.name.replace(/"/g, '""')}"`,
          i.category,
          i.currentStock,
          i.reorderPoint,
          i.costPrice.toFixed(2),
          i.retailPrice.toFixed(2),
          `"${i.location}"`,
          i.auditStatus
        ]);
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        downloadFile(csvContent, `inventory-catalog-500-plus-${timestamp}.csv`, 'text/csv;charset=utf-8;');
      } else {
        downloadFile(JSON.stringify(items, null, 2), `inventory-catalog-${timestamp}.json`, 'application/json');
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <h3 className="font-bold text-base">Export Inventory Report</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Report Scope
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="reportType"
                  value="audit"
                  checked={reportType === 'audit'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Daily Stock Audit & Reconciliation Log</span>
                  <span className="text-[11px] text-slate-500">Counts verified, variance logs, shrinkage impact</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="reportType"
                  value="low_stock"
                  checked={reportType === 'low_stock'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Low Stock Purchase Reorder Sheet</span>
                  <span className="text-[11px] text-slate-500">Items below reorder point grouped by supplier</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="reportType"
                  value="catalog"
                  checked={reportType === 'catalog'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Full Inventory Catalog Snapshot (500+ SKUs)</span>
                  <span className="text-[11px] text-slate-500">Complete item specifications, prices, and locations</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Export Format
            </label>
            <div className="flex space-x-3">
              <label className={`flex-1 flex items-center justify-center space-x-2 py-2 border rounded-lg cursor-pointer text-xs font-semibold ${
                format === 'csv' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'
              }`}>
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={format === 'csv'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="sr-only"
                />
                <span>CSV (Excel Compatible)</span>
              </label>

              <label className={`flex-1 flex items-center justify-center space-x-2 py-2 border rounded-lg cursor-pointer text-xs font-semibold ${
                format === 'json' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'
              }`}>
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={format === 'json'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="sr-only"
                />
                <span>JSON (Structured Data)</span>
              </label>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition flex items-center space-x-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
