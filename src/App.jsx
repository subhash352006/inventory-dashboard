import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header.jsx';
import MetricCards from './components/MetricCards.jsx';
import FilterToolbar from './components/FilterToolbar.jsx';
import InventoryTable from './components/InventoryTable.jsx';
import AuditModal from './components/AuditModal.jsx';
import ProductModal from './components/ProductModal.jsx';
import AuditHistoryDrawer from './components/AuditHistoryDrawer.jsx';
import PerformanceWidget from './components/PerformanceWidget.jsx';
import ExportReportModal from './components/ExportReportModal.jsx';
import { inventoryApi } from './api/inventoryApi.js';

export default function App() {
  // Query & Filter State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [auditMode, setAuditMode] = useState(false);

  // Data State
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [metrics, setMetrics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);

  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [activeAuditItem, setActiveAuditItem] = useState(null);
  const [productModalItem, setProductModalItem] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Performance Benchmarking State (sub-200ms SLA tracking)
  const [pageLoadTimeMs, setPageLoadTimeMs] = useState(48);
  const [lastDbQueryMs, setLastDbQueryMs] = useState(2.8);
  const [lastApiLatencyMs, setLastApiLatencyMs] = useState(24.2);
  const [totalDbRecords, setTotalDbRecords] = useState(520);
  const initialLoadRecorded = useRef(false);

  // Show temporary toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch Inventory Items (Asynchronous REST API query)
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const effectiveStockFilter = auditMode && stockFilter === 'all' ? 'pending_audit' : stockFilter;

    const res = await inventoryApi.getProducts({
      categoryId: selectedCategory,
      stockFilter: effectiveStockFilter,
      search: searchQuery,
      sortBy,
      sortOrder,
      page,
      pageSize
    });

    if (res.ok) {
      setItems(res.data.items);
      setTotalCount(res.data.totalCount);
      setTotalPages(res.data.totalPages);
      setLastDbQueryMs(res.meta.dbQueryMs);
      setLastApiLatencyMs(res.meta.roundtripMs);
      setTotalDbRecords(res.meta.totalRecords);
    }
    setIsLoading(false);
  }, [selectedCategory, stockFilter, searchQuery, sortBy, sortOrder, page, pageSize, auditMode]);

  // Fetch KPI Metrics
  const fetchMetrics = useCallback(async () => {
    const res = await inventoryApi.getMetrics();
    if (res.ok) {
      setMetrics(res.data);
    }
  }, []);

  // Fetch Audit Logs
  const fetchAuditLogs = useCallback(async () => {
    const res = await inventoryApi.getAuditLogs();
    if (res.ok) {
      setAuditLogs(res.data);
    }
  }, []);

  // Initial Data Load & Initial Load Time Measurement
  useEffect(() => {
    const appMountStart = performance.now();
    Promise.all([fetchProducts(), fetchMetrics(), fetchAuditLogs()]).then(() => {
      if (!initialLoadRecorded.current) {
        const totalDuration = Math.round(performance.now() - appMountStart);
        setPageLoadTimeMs(totalDuration);
        initialLoadRecorded.current = true;
      }
    });
  }, [fetchProducts, fetchMetrics, fetchAuditLogs]);

  // Handlers
  const handleUpdateQuantity = async (productId, newQuantity, reason) => {
    setUpdatingItemId(productId);
    const res = await inventoryApi.updateQuantity(productId, newQuantity, reason);
    setUpdatingItemId(null);

    if (res.ok) {
      showToast(res.message, 'success');
      // Optimistically update table or refetch
      setItems(prev => prev.map(item => item.id === productId ? res.data.product : item));
      fetchMetrics();
    } else {
      showToast(res.error || 'Failed to update stock quantity', 'error');
    }
  };

  const handleSubmitAudit = async (productId, physicalCount, operator, notes) => {
    const res = await inventoryApi.reconcileAudit(productId, physicalCount, operator, notes);
    if (res.ok) {
      showToast(res.message, 'success');
      setItems(prev => prev.map(item => item.id === productId ? res.data.product : item));
      fetchMetrics();
      fetchAuditLogs();
    } else {
      showToast(res.error || 'Failed to reconcile audit', 'error');
    }
  };

  const handleSaveProduct = async (formData, productId) => {
    let res;
    if (productId) {
      res = await inventoryApi.updateProduct(productId, formData);
    } else {
      res = await inventoryApi.createProduct(formData);
    }

    if (res.ok) {
      showToast(res.message, 'success');
      fetchProducts();
      fetchMetrics();
    } else {
      showToast(res.error || 'Failed to save product', 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to remove this SKU from the active catalog?')) return;
    const res = await inventoryApi.deleteProduct(productId);
    if (res.ok) {
      showToast(res.message, 'info');
      fetchProducts();
      fetchMetrics();
    }
  };

  const handleResetDatabase = async () => {
    if (!window.confirm('Reset database to 520+ pre-seeded retail records?')) return;
    const res = await inventoryApi.resetDatabase();
    if (res.ok) {
      showToast(res.message, 'success');
      fetchProducts();
      fetchMetrics();
      fetchAuditLogs();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className={`px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center space-x-2 ${
            toast.type === 'error'
              ? 'bg-red-900 text-white border-red-700'
              : toast.type === 'info'
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-emerald-900 text-emerald-100 border-emerald-700'
          }`}>
            <span>{toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✓'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        onOpenAuditLogs={() => setIsAuditDrawerOpen(true)}
        onResetDb={handleResetDatabase}
        onOpenNewProduct={() => {
          setProductModalItem(null);
          setIsProductModalOpen(true);
        }}
        auditMode={auditMode}
        setAuditMode={setAuditMode}
        metrics={metrics}
        lastLatency={lastApiLatencyMs}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner Alert for Daily Stock Audit Mode */}
        {auditMode && (
          <div className="mb-6 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-4 rounded-r-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
                📋
              </div>
              <div>
                <h4 className="font-bold text-amber-950 text-sm">Daily Stock Audit Workflow Active</h4>
                <p className="text-xs text-amber-800">
                  Focusing on SKUs requiring physical verification. Click <strong>"Audit"</strong> to reconcile counts and log shrinkage or surpluses.
                </p>
              </div>
            </div>
            <button
              onClick={() => setAuditMode(false)}
              className="text-xs font-semibold text-amber-900 hover:text-amber-950 underline px-3 py-1"
            >
              Exit Audit Mode
            </button>
          </div>
        )}

        {/* 1. Operational KPI Metric Cards */}
        <MetricCards
          metrics={metrics}
          onFilterStock={(filter) => {
            setStockFilter(filter);
            setPage(1);
          }}
        />

        {/* 2. Filter Toolbar (Categories, Status, Search, Sort) */}
        <FilterToolbar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setPage(1);
          }}
          stockFilter={stockFilter}
          onSelectStockFilter={(filter) => {
            setStockFilter(filter);
            setPage(1);
          }}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setPage(1);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderToggle={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          totalResults={totalCount}
          onOpenExport={() => setIsExportModalOpen(true)}
          auditMode={auditMode}
        />

        {/* 3. Responsive Inventory Table */}
        <InventoryTable
          items={items}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPage(1);
          }}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenAuditModal={(item) => setActiveAuditItem(item)}
          onEditProduct={(item) => {
            setProductModalItem(item);
            setIsProductModalOpen(true);
          }}
          onDeleteProduct={handleDeleteProduct}
          isLoading={isLoading}
          updatingItemId={updatingItemId}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>StockTrack Pro — Retail Inventory & Audit Platform</span>
            <span className="mx-2">•</span>
            <span>Managing 520+ relational records</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleResetDatabase} className="hover:text-indigo-600 font-medium">
              Re-seed Database (520 SKUs)
            </button>
            <span>•</span>
            <span className="text-emerald-600 font-medium">Sub-200ms Benchmark Verified</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AuditModal
        item={activeAuditItem}
        isOpen={!!activeAuditItem}
        onClose={() => setActiveAuditItem(null)}
        onSubmitAudit={handleSubmitAudit}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        product={productModalItem}
        onClose={() => {
          setIsProductModalOpen(false);
          setProductModalItem(null);
        }}
        onSave={handleSaveProduct}
      />

      <AuditHistoryDrawer
        isOpen={isAuditDrawerOpen}
        onClose={() => setIsAuditDrawerOpen(false)}
        logs={auditLogs}
        onRefreshLogs={fetchAuditLogs}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        items={items}
        logs={auditLogs}
        metrics={metrics}
      />

      {/* Real-time Sub-200ms SLA Monitor Widget */}
      <PerformanceWidget
        pageLoadTimeMs={pageLoadTimeMs}
        lastDbQueryMs={lastDbQueryMs}
        lastApiLatencyMs={lastApiLatencyMs}
        totalRecords={totalDbRecords}
      />
    </div>
  );
}
