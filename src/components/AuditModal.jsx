import React, { useState, useEffect } from 'react';

export default function AuditModal({
  item,
  isOpen,
  onClose,
  onSubmitAudit,
  operatorName = 'Alex Rivera (Auditor #04)'
}) {
  const [physicalCount, setPhysicalCount] = useState(0);
  const [operator, setOperator] = useState(operatorName);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setPhysicalCount(item.currentStock);
      setNotes('');
      setOperator(operatorName);
    }
  }, [item, operatorName]);

  if (!isOpen || !item) return null;

  const systemCount = item.currentStock;
  const discrepancy = physicalCount - systemCount;
  const costImpact = discrepancy * item.costPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmitAudit(item.id, physicalCount, operator, notes);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Daily Stock Audit Check</h3>
              <p className="text-xs text-slate-400">Physical Stock Count & Discrepancy Reconciliation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Product Overview Banner */}
        <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              {item.category} • <span className="font-mono">{item.sku}</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">{item.name}</div>
            <div className="text-xs text-slate-500 flex items-center space-x-2 mt-0.5">
              <span>📍 {item.location}</span>
              <span>•</span>
              <span>Unit Cost: ${item.costPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">System Count</span>
            <span className="text-2xl font-extrabold text-slate-800">{systemCount}</span>
          </div>
        </div>

        {/* Audit Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Physical Count Stepper & Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Physical Count Found on Shelf / Bin
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPhysicalCount(Math.max(0, physicalCount - 5))}
                className="px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => setPhysicalCount(Math.max(0, physicalCount - 1))}
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg transition flex items-center justify-center"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                required
                value={physicalCount}
                onChange={(e) => setPhysicalCount(Math.max(0, parseInt(e.target.value || '0', 10)))}
                className="flex-1 text-center py-2 text-2xl font-extrabold text-slate-900 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <button
                type="button"
                onClick={() => setPhysicalCount(physicalCount + 1)}
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg transition flex items-center justify-center"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setPhysicalCount(physicalCount + 5)}
                className="px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                +5
              </button>
            </div>
          </div>

          {/* Variance Calculation Summary Box */}
          <div className={`p-4 rounded-xl border transition-all ${
            discrepancy === 0
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
              : discrepancy < 0
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Variance Status:
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80">
                {discrepancy === 0 ? '✓ Matched Exactly' : discrepancy < 0 ? '⚠️ Stock Deficit / Shrinkage' : '📦 Stock Surplus'}
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black">
                  {discrepancy > 0 ? `+${discrepancy}` : discrepancy} units
                </span>
                <span className="text-xs ml-1.5 opacity-80">variance</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium block opacity-75">Cost Impact</span>
                <span className="text-sm font-bold">
                  {costImpact < 0 ? `-$${Math.abs(costImpact).toFixed(2)}` : `+$${costImpact.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>

          {/* Auditor Name & Reason Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Auditor / Operator</label>
              <input
                type="text"
                required
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Audit Notes / Reason</label>
              <input
                type="text"
                placeholder={discrepancy === 0 ? "Daily routine audit verified" : "Shrinkage, misplacement, damaged..."}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow-sm transition flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Writing Database...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reconcile Database</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
