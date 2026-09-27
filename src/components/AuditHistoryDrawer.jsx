import React, { useState } from 'react';

export default function AuditHistoryDrawer({
  isOpen,
  onClose,
  logs = [],
  onRefreshLogs
}) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredLogs = logs.filter(log => {
    if (filterType !== 'ALL' && log.actionType !== filterType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        log.sku.toLowerCase().includes(q) ||
        log.productName.toLowerCase().includes(q) ||
        (log.operatorName && log.operatorName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Stock Audit & Adjustment Trail</h3>
              <p className="text-xs text-slate-400">Immutable transaction log of inventory counts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search audit trail by SKU or Auditor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={onRefreshLogs}
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 text-xs"
              title="Refresh logs"
            >
              🔄
            </button>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Filter:</span>
            {['ALL', 'AUDIT_VERIFIED', 'DISCREPANCY_RECONCILED'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2 py-0.5 rounded-full font-medium transition ${
                  filterType === type
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {type === 'ALL' ? 'All Logs' : type === 'AUDIT_VERIFIED' ? 'Verified (0 Var)' : 'Discrepancies'}
              </button>
            ))}
          </div>
        </div>

        {/* Log Entries List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No audit logs recorded matching criteria.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isDiscrepancy = log.actionType === 'DISCREPANCY_RECONCILED' || log.discrepancy !== 0;
              const formattedDate = new Date(log.timestamp).toLocaleString();

              return (
                <div
                  key={log.id}
                  className={`p-3.5 rounded-xl border transition ${
                    isDiscrepancy
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                      {log.sku}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDiscrepancy
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isDiscrepancy ? `Variance: ${log.discrepancy > 0 ? `+${log.discrepancy}` : log.discrepancy} units` : 'Matched'}
                    </span>
                  </div>

                  <div className="font-semibold text-xs text-slate-900 mt-1 line-clamp-1">
                    {log.productName}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <div>
                      <span>Physical Count: <strong>{log.physicalCount}</strong></span>
                      <span className="text-slate-400 ml-1.5">(Sys: {log.systemCount})</span>
                    </div>
                    <div className="text-right">
                      {log.costImpact !== 0 && (
                        <span className={`font-semibold ${log.costImpact < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                          Impact: {log.costImpact < 0 ? `-$${Math.abs(log.costImpact).toFixed(2)}` : `+$${log.costImpact.toFixed(2)}`}
                        </span>
                      )}
                    </div>
                  </div>

                  {log.notes && (
                    <div className="text-[11px] text-slate-500 italic mt-1.5 bg-slate-50 p-1.5 rounded">
                      "{log.notes}"
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>Auditor: {log.operatorName || 'System'}</span>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
