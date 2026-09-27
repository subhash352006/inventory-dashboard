// Relational Database Layer for Inventory Management
// Implements in-memory relational schema with local persistence, indexing, joins, and transaction logs.

import { CATEGORIES, SUPPLIERS, generateSeedInventory } from '../data/seedData.js';

const STORAGE_KEY_PRODUCTS = 'retail_inv_products_v1';
const STORAGE_KEY_LOGS = 'retail_inv_audit_logs_v1';
const STORAGE_KEY_ADJUSTMENTS = 'retail_inv_adjustments_v1';

class RelationalInventoryDatabase {
  constructor() {
    this.categories = [...CATEGORIES];
    this.suppliers = [...SUPPLIERS];
    this.products = [];
    this.auditLogs = [];
    this.stockAdjustments = [];
    this.indexes = {
      bySku: new Map(),
      byCategory: new Map(),
      byStatus: new Map()
    };
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Load from storage or initialize with 520+ pre-seeded items
    try {
      const savedProducts = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_PRODUCTS) : null;
      const savedLogs = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_LOGS) : null;
      const savedAdjustments = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ADJUSTMENTS) : null;

      if (savedProducts) {
        this.products = JSON.parse(savedProducts);
      } else {
        this.products = generateSeedInventory();
        this.persistProducts();
      }

      if (savedLogs) {
        this.auditLogs = JSON.parse(savedLogs);
      } else {
        // Initial sample audit logs
        this.auditLogs = [
          {
            id: 'LOG-001',
            productId: 1,
            sku: 'ELC-1001',
            productName: 'Pro ANC Wireless Headphones',
            systemCount: 38,
            physicalCount: 38,
            discrepancy: 0,
            costImpact: 0,
            operatorName: 'Alex Rivera (Auditor #04)',
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            notes: 'Physical shelf count matches system count exactly. Packaging verified intact.',
            actionType: 'AUDIT_VERIFIED'
          },
          {
            id: 'LOG-002',
            productId: 13,
            sku: 'ELC-1013',
            productName: 'Braided Audio Aux Cable 3.5mm',
            systemCount: 24,
            physicalCount: 22,
            discrepancy: -2,
            costImpact: -15.40,
            operatorName: 'Jordan Chen (Floor Lead)',
            timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
            notes: 'Discrepancy resolved: 2 units identified as display test samples damaged in transit.',
            actionType: 'DISCREPANCY_RECONCILED'
          }
        ];
        this.persistLogs();
      }

      if (savedAdjustments) {
        this.stockAdjustments = JSON.parse(savedAdjustments);
      }
    } catch (err) {
      console.warn('Storage access unavailable, running in memory-only mode', err);
      this.products = generateSeedInventory();
    }

    this.rebuildIndexes();
    this.initialized = true;
  }

  rebuildIndexes() {
    this.indexes.bySku.clear();
    this.indexes.byCategory.clear();
    this.indexes.byStatus.clear();

    for (let i = 0; i < this.products.length; i++) {
      const p = this.products[i];
      // Index by SKU (case insensitive)
      this.indexes.bySku.set(p.sku.toUpperCase(), i);

      // Index by Category
      if (!this.indexes.byCategory.has(p.categoryId)) {
        this.indexes.byCategory.set(p.categoryId, []);
      }
      this.indexes.byCategory.get(p.categoryId).push(i);

      // Index by Stock Health Status
      let statusKey = 'in_stock';
      if (p.currentStock === 0) {
        statusKey = 'out_of_stock';
      } else if (p.currentStock <= p.reorderPoint) {
        statusKey = 'low_stock';
      }
      if (!this.indexes.byStatus.has(statusKey)) {
        this.indexes.byStatus.set(statusKey, []);
      }
      this.indexes.byStatus.get(statusKey).push(i);
    }
  }

  persistProducts() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(this.products));
      } catch (e) {
        console.error('LocalStorage write failed:', e);
      }
    }
  }

  persistLogs() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(this.auditLogs));
      } catch (e) {
        console.error('LocalStorage write failed:', e);
      }
    }
  }

  persistAdjustments() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY_ADJUSTMENTS, JSON.stringify(this.stockAdjustments));
      } catch (e) {
        console.error('LocalStorage write failed:', e);
      }
    }
  }

  // Relational Join: Product + Category + Supplier
  joinProductDetails(product) {
    if (!product) return null;
    const category = this.categories.find(c => c.id === product.categoryId);
    const supplier = this.suppliers.find(s => s.id === product.supplierId);

    return {
      ...product,
      categoryDetails: category || { name: product.category, code: 'N/A' },
      supplierDetails: supplier || { name: product.supplierName, leadTimeDays: 3, rating: 4.5 }
    };
  }

  // Fast query with filtering, sorting, pagination, and query time measurement
  queryProducts({
    search = '',
    categoryId = null,
    stockFilter = 'all', // 'all' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'pending_audit' | 'audited_today' | 'discrepancy'
    sortBy = 'id',
    sortOrder = 'asc',
    page = 1,
    pageSize = 25
  } = {}) {
    this.init();
    const startTime = performance.now();

    let candidateIndexes = null;

    // Use category index if specified
    if (categoryId && categoryId !== 'all') {
      const catNum = parseInt(categoryId, 10);
      candidateIndexes = new Set(this.indexes.byCategory.get(catNum) || []);
    }

    const cleanSearch = search.trim().toLowerCase();
    const todayStr = new Date().toISOString().slice(0, 10);

    let results = [];

    const totalLen = this.products.length;
    for (let i = 0; i < totalLen; i++) {
      if (candidateIndexes && !candidateIndexes.has(i)) {
        continue;
      }

      const p = this.products[i];

      // Stock status filter check
      if (stockFilter === 'low_stock') {
        if (p.currentStock > p.reorderPoint || p.currentStock === 0) continue;
      } else if (stockFilter === 'out_of_stock') {
        if (p.currentStock > 0) continue;
      } else if (stockFilter === 'in_stock') {
        if (p.currentStock === 0) continue;
      } else if (stockFilter === 'pending_audit') {
        if (p.auditStatus !== 'pending') continue;
      } else if (stockFilter === 'audited_today') {
        if (p.auditStatus !== 'audited' || !p.lastAudited.startsWith(todayStr)) continue;
      } else if (stockFilter === 'discrepancy') {
        if (p.auditStatus !== 'discrepancy') continue;
      }

      // Search filter check (SKU, Name, Barcode, Location, Supplier)
      if (cleanSearch) {
        const matchesSku = p.sku.toLowerCase().includes(cleanSearch);
        const matchesName = p.name.toLowerCase().includes(cleanSearch);
        const matchesBarcode = p.barcode.includes(cleanSearch);
        const matchesSupplier = p.supplierName.toLowerCase().includes(cleanSearch);
        const matchesLoc = p.location.toLowerCase().includes(cleanSearch);

        if (!matchesSku && !matchesName && !matchesBarcode && !matchesSupplier && !matchesLoc) {
          continue;
        }
      }

      results.push(this.joinProductDetails(p));
    }

    // Sorting
    results.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'inventoryValue') {
        valA = a.currentStock * a.retailPrice;
        valB = b.currentStock * b.retailPrice;
      }

      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    const totalCount = results.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = pageSize === 'all' ? results : results.slice(startIndex, startIndex + pageSize);

    const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

    return {
      items: paginatedItems,
      totalCount,
      page,
      pageSize: pageSize === 'all' ? totalCount : pageSize,
      totalPages: pageSize === 'all' ? 1 : Math.ceil(totalCount / pageSize),
      executionTimeMs,
      totalDatabaseRecords: this.products.length
    };
  }

  // Atomic stock quantity update
  updateQuantity(productId, newQuantity, reason = 'Direct Adjustment', operator = 'Retail Operator') {
    this.init();
    const idx = this.products.findIndex(p => p.id === parseInt(productId, 10));
    if (idx === -1) {
      throw new Error(`Product with ID ${productId} not found in database.`);
    }

    const previousQty = this.products[idx].currentStock;
    const delta = newQuantity - previousQty;
    const updatedTimestamp = new Date().toISOString();

    // Update product
    this.products[idx] = {
      ...this.products[idx],
      currentStock: Math.max(0, newQuantity),
      updatedAt: updatedTimestamp
    };

    // Record adjustment transaction log
    const adjustmentRecord = {
      id: `ADJ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId: this.products[idx].id,
      sku: this.products[idx].sku,
      productName: this.products[idx].name,
      previousQty,
      newQty: Math.max(0, newQuantity),
      delta,
      reason,
      operator,
      timestamp: updatedTimestamp
    };

    this.stockAdjustments.unshift(adjustmentRecord);
    if (this.stockAdjustments.length > 500) this.stockAdjustments.pop();

    this.persistProducts();
    this.persistAdjustments();
    this.rebuildIndexes();

    return {
      product: this.joinProductDetails(this.products[idx]),
      adjustmentRecord
    };
  }

  // Stock audit reconciliation
  reconcileAudit(productId, physicalCount, operator = 'Retail Auditor', notes = '') {
    this.init();
    const idx = this.products.findIndex(p => p.id === parseInt(productId, 10));
    if (idx === -1) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    const item = this.products[idx];
    const systemCount = item.currentStock;
    const discrepancy = physicalCount - systemCount;
    const costImpact = parseFloat((discrepancy * item.costPrice).toFixed(2));
    const nowIso = new Date().toISOString();

    const auditStatus = discrepancy === 0 ? 'audited' : 'discrepancy';

    // Update product record
    this.products[idx] = {
      ...item,
      currentStock: physicalCount, // Physical count reconciles inventory
      lastAudited: nowIso,
      auditStatus,
      discrepancyQty: discrepancy,
      updatedAt: nowIso
    };

    // Record Audit Log Entry
    const logEntry = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId: item.id,
      sku: item.sku,
      productName: item.name,
      category: item.category,
      location: item.location,
      systemCount,
      physicalCount,
      discrepancy,
      costImpact,
      operatorName: operator,
      timestamp: nowIso,
      notes: notes || (discrepancy === 0 ? 'Physical audit verified. No discrepancy.' : `Physical variance of ${discrepancy} units recorded.`),
      actionType: discrepancy === 0 ? 'AUDIT_VERIFIED' : 'DISCREPANCY_RECONCILED'
    };

    this.auditLogs.unshift(logEntry);
    if (this.auditLogs.length > 500) this.auditLogs.pop();

    this.persistProducts();
    this.persistLogs();
    this.rebuildIndexes();

    return {
      product: this.joinProductDetails(this.products[idx]),
      logEntry
    };
  }

  // Create Product
  createProduct(data) {
    this.init();
    const maxId = this.products.reduce((max, p) => Math.max(max, p.id), 0);
    const newId = maxId + 1;
    const category = this.categories.find(c => c.id === parseInt(data.categoryId, 10)) || this.categories[0];
    const supplier = this.suppliers.find(s => s.id === parseInt(data.supplierId, 10)) || this.suppliers[0];

    const sku = data.sku ? data.sku.trim().toUpperCase() : `${category.code}-${1000 + newId}`;
    const barcode = data.barcode ? data.barcode.trim() : `890${category.id.toString().padStart(2, '0')}${(1000 + newId).toString().padStart(8, '0')}`;

    const newProduct = {
      id: newId,
      sku,
      barcode,
      name: data.name.trim(),
      categoryId: category.id,
      category: category.name,
      currentStock: Math.max(0, parseInt(data.currentStock || 0, 10)),
      reorderPoint: Math.max(1, parseInt(data.reorderPoint || 15, 10)),
      costPrice: parseFloat(parseFloat(data.costPrice || 10).toFixed(2)),
      retailPrice: parseFloat(parseFloat(data.retailPrice || 19.99).toFixed(2)),
      supplierId: supplier.id,
      supplierName: supplier.name,
      location: data.location ? data.location.trim() : 'Warehouse Bay A, Shelf 1',
      lastAudited: new Date().toISOString(),
      auditStatus: 'pending',
      discrepancyQty: 0,
      active: true,
      updatedAt: new Date().toISOString()
    };

    this.products.unshift(newProduct);
    this.persistProducts();
    this.rebuildIndexes();

    return this.joinProductDetails(newProduct);
  }

  // Update Product
  updateProduct(id, data) {
    this.init();
    const idx = this.products.findIndex(p => p.id === parseInt(id, 10));
    if (idx === -1) throw new Error(`Product ${id} not found.`);

    const category = this.categories.find(c => c.id === parseInt(data.categoryId, 10)) || this.categories[0];
    const supplier = this.suppliers.find(s => s.id === parseInt(data.supplierId, 10)) || this.suppliers[0];

    this.products[idx] = {
      ...this.products[idx],
      name: data.name !== undefined ? data.name.trim() : this.products[idx].name,
      categoryId: category.id,
      category: category.name,
      reorderPoint: data.reorderPoint !== undefined ? Math.max(1, parseInt(data.reorderPoint, 10)) : this.products[idx].reorderPoint,
      costPrice: data.costPrice !== undefined ? parseFloat(parseFloat(data.costPrice).toFixed(2)) : this.products[idx].costPrice,
      retailPrice: data.retailPrice !== undefined ? parseFloat(parseFloat(data.retailPrice).toFixed(2)) : this.products[idx].retailPrice,
      supplierId: supplier.id,
      supplierName: supplier.name,
      location: data.location !== undefined ? data.location.trim() : this.products[idx].location,
      updatedAt: new Date().toISOString()
    };

    this.persistProducts();
    this.rebuildIndexes();
    return this.joinProductDetails(this.products[idx]);
  }

  // Delete Product
  deleteProduct(id) {
    this.init();
    const idx = this.products.findIndex(p => p.id === parseInt(id, 10));
    if (idx === -1) throw new Error(`Product ${id} not found.`);
    const deleted = this.products.splice(idx, 1)[0];
    this.persistProducts();
    this.rebuildIndexes();
    return deleted;
  }

  // KPI Metrics Calculation
  getMetrics() {
    this.init();
    const todayStr = new Date().toISOString().slice(0, 10);
    let totalSKUs = this.products.length;
    let totalStockUnits = 0;
    let totalInventoryValue = 0;
    let totalCostValuation = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let auditedTodayCount = 0;
    let discrepancyCount = 0;

    for (let i = 0; i < totalSKUs; i++) {
      const p = this.products[i];
      totalStockUnits += p.currentStock;
      totalInventoryValue += (p.currentStock * p.retailPrice);
      totalCostValuation += (p.currentStock * p.costPrice);

      if (p.currentStock === 0) {
        outOfStockCount++;
      } else if (p.currentStock <= p.reorderPoint) {
        lowStockCount++;
      }

      if (p.auditStatus === 'audited' && p.lastAudited.startsWith(todayStr)) {
        auditedTodayCount++;
      } else if (p.auditStatus === 'discrepancy') {
        discrepancyCount++;
      }
    }

    const auditComplianceRate = totalSKUs > 0 ? parseFloat(((auditedTodayCount / totalSKUs) * 100).toFixed(1)) : 0;

    return {
      totalSKUs,
      totalStockUnits,
      totalInventoryValue: parseFloat(totalInventoryValue.toFixed(2)),
      totalCostValuation: parseFloat(totalCostValuation.toFixed(2)),
      lowStockCount,
      outOfStockCount,
      healthyStockCount: totalSKUs - lowStockCount - outOfStockCount,
      auditedTodayCount,
      discrepancyCount,
      auditComplianceRate
    };
  }

  // Reset database back to fresh 520+ seeded items
  resetToSeed() {
    this.products = generateSeedInventory();
    this.auditLogs = [];
    this.stockAdjustments = [];
    this.persistProducts();
    this.persistLogs();
    this.persistAdjustments();
    this.rebuildIndexes();
    return { success: true, count: this.products.length };
  }
}

export const db = new RelationalInventoryDatabase();
