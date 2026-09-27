import React from 'react';

export default function Header({
  operatorName = 'Alex Rivera (Retail Lead)',
  onOpenAuditLogs,
  onResetDb,
  onOpenNewProduct,
  auditMode,
  setAuditMode,
  metrics,
  lastLatency
}) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Store Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">StockTrack Pro</span>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Sub-200ms Active
                </span>
              </div>
              <p className="text-xs text-slate-400">Retail Inventory & Daily Stock Audit System</p>
            </div>
          </div>

          {/* Quick Actions & Audit Switcher */}
          <div className="flex items-center space-x-3">
            {/* Audit Mode Quick Toggle */}
            <button
              onClick={() => setAuditMode(!auditMode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-2 border ${
                auditMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle Daily Stock Audit Focus Mode"
            >
              <svg className={`w-4 h-4 ${auditMode ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>{auditMode ? 'Audit Mode Active' : 'Daily Audit Mode'}</span>
            </button>

            {/* Audit Trail Drawer Trigger */}
            <button
              onClick={onOpenAuditLogs}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition flex items-center space-x-1.5"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Audit Trail</span>
            </button>

            {/* Add New SKU Button */}
            <button
              onClick={onOpenNewProduct}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition flex items-center space-x-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New SKU</span>
            </button>

            {/* Operator Badge */}
            <div className="hidden md:flex items-center pl-3 border-l border-slate-800 space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-200">
                AR
              </div>
              <div className="text-left text-xs">
                <div className="font-medium text-slate-200">{operatorName}</div>
                <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Shift #1 • Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
