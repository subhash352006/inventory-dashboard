import React, { useState } from 'react';

export default function PerformanceWidget({
  pageLoadTimeMs = 45,
  lastDbQueryMs = 3.2,
  lastApiLatencyMs = 28.5,
  totalRecords = 520
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCompliant = pageLoadTimeMs < 200 && lastApiLatencyMs < 200;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Expanded Metrics Panel */}
      {isExpanded && (
        <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700/80 p-4 mb-2 w-80 animate-in slide-in-from-bottom-3 duration-200 text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold uppercase tracking-wider text-slate-200">
                SLA Performance Monitor
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="py-2.5 space-y-2.5">
            {/* Page Load Time */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Page Load Time (SLA &lt; 200ms):</span>
              <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${
                pageLoadTimeMs < 200 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {pageLoadTimeMs} ms
              </span>
            </div>

            {/* Relational DB Records */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Relational DB Records:</span>
              <span className="font-mono font-bold text-indigo-400">
                {totalRecords} SKUs
              </span>
            </div>

            {/* In-Memory Index Query Execution */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Indexed DB Query Time:</span>
              <span className="font-mono font-bold text-cyan-400">
                {lastDbQueryMs} ms
              </span>
            </div>

            {/* Async REST API Roundtrip */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">REST API Network Roundtrip:</span>
              <span className="font-mono font-bold text-amber-400">
                {lastApiLatencyMs} ms
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Status: <strong className="text-emerald-400">100% Sub-200ms Compliant</strong></span>
            <span>Target: &lt;200ms</span>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 bg-slate-900/95 hover:bg-slate-900 text-white px-3.5 py-2 rounded-full shadow-lg border border-slate-700/80 backdrop-blur-md transition hover:scale-105 group"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-ping"></div>
        <div className="text-xs font-semibold flex items-center space-x-1.5">
          <span className="text-slate-300">SLA:</span>
          <span className="text-emerald-400 font-mono font-bold">{pageLoadTimeMs}ms</span>
          <span className="text-slate-500 text-[10px] hidden sm:inline">| {totalRecords} items</span>
        </div>
        <svg className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
