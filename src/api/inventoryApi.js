// Asynchronous REST API Client for Retail Inventory Dashboard
// Communicates with the backend relational database with simulated network latency,
// tracking response time headers and maintaining sub-200ms SLA.

import { db } from '../db/relationalDb.js';

// Simulate typical local or cloud REST API roundtrip (20-40ms)
const simulateNetworkLatency = (minMs = 15, maxMs = 40) => {
  const latency = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, latency));
};

export const inventoryApi = {
  // GET /api/products
  async getProducts(params = {}) {
    const start = performance.now();
    await simulateNetworkLatency(15, 35);

    try {
      const result = db.queryProducts(params);
      const networkRoundtrip = parseFloat((performance.now() - start).toFixed(2));

      return {
        status: 200,
        ok: true,
        data: result,
        meta: {
          roundtripMs: networkRoundtrip,
          dbQueryMs: result.executionTimeMs,
          totalRecords: result.totalDatabaseRecords,
          sub200msCompliant: networkRoundtrip < 200
        }
      };
    } catch (err) {
      return {
        status: 500,
        ok: false,
        error: err.message
      };
    }
  },

  // GET /api/products/:id
  async getProductById(id) {
    const start = performance.now();
    await simulateNetworkLatency(10, 25);
    const product = db.products.find(p => p.id === parseInt(id, 10));

    if (!product) {
      return { status: 404, ok: false, error: 'Product not found' };
    }

    const duration = parseFloat((performance.now() - start).toFixed(2));
    return {
      status: 200,
      ok: true,
      data: db.joinProductDetails(product),
      meta: { roundtripMs: duration }
    };
  },

  // PATCH /api/products/:id/quantity
  // Asynchronous REST API request to update item quantities through backend database operations
  async updateQuantity(productId, newQuantity, reason = 'Quick Adjustment', operator = 'Retail Store Operator') {
    const start = performance.now();
    await simulateNetworkLatency(20, 50);

    try {
      const { product, adjustmentRecord } = db.updateQuantity(productId, newQuantity, reason, operator);
      const duration = parseFloat((performance.now() - start).toFixed(2));

      return {
        status: 200,
        ok: true,
        message: `Inventory updated for SKU ${product.sku} to ${product.currentStock} units`,
        data: {
          product,
          adjustmentRecord
        },
        meta: {
          roundtripMs: duration,
          sub200msCompliant: duration < 200
        }
      };
    } catch (err) {
      return {
        status: 400,
        ok: false,
        error: err.message
      };
    }
  },

  // POST /api/audit/reconcile
  // Daily physical stock audit count reconciliation
  async reconcileAudit(productId, physicalCount, operator = 'Stock Auditor', notes = '') {
    const start = performance.now();
    await simulateNetworkLatency(25, 55);

    try {
      const { product, logEntry } = db.reconcileAudit(productId, physicalCount, operator, notes);
      const duration = parseFloat((performance.now() - start).toFixed(2));

      return {
        status: 200,
        ok: true,
        message: `Audit recorded for ${product.name} (Variance: ${logEntry.discrepancy >= 0 ? '+' : ''}${logEntry.discrepancy})`,
        data: {
          product,
          logEntry
        },
        meta: {
          roundtripMs: duration,
          sub200msCompliant: duration < 200
        }
      };
    } catch (err) {
      return {
        status: 400,
        ok: false,
        error: err.message
      };
    }
  },

  // POST /api/products
  async createProduct(productData) {
    const start = performance.now();
    await simulateNetworkLatency(30, 60);

    try {
      const product = db.createProduct(productData);
      const duration = parseFloat((performance.now() - start).toFixed(2));

      return {
        status: 201,
        ok: true,
        message: `Created SKU ${product.sku} successfully`,
        data: product,
        meta: { roundtripMs: duration }
      };
    } catch (err) {
      return {
        status: 400,
        ok: false,
        error: err.message
      };
    }
  },

  // PUT /api/products/:id
  async updateProduct(id, productData) {
    const start = performance.now();
    await simulateNetworkLatency(25, 55);

    try {
      const product = db.updateProduct(id, productData);
      const duration = parseFloat((performance.now() - start).toFixed(2));

      return {
        status: 200,
        ok: true,
        message: `Updated SKU ${product.sku} successfully`,
        data: product,
        meta: { roundtripMs: duration }
      };
    } catch (err) {
      return {
        status: 400,
        ok: false,
        error: err.message
      };
    }
  },

  // DELETE /api/products/:id
  async deleteProduct(id) {
    const start = performance.now();
    await simulateNetworkLatency(20, 45);

    try {
      const deleted = db.deleteProduct(id);
      const duration = parseFloat((performance.now() - start).toFixed(2));

      return {
        status: 200,
        ok: true,
        message: `Product ${deleted.sku} removed from catalog`,
        data: deleted,
        meta: { roundtripMs: duration }
      };
    } catch (err) {
      return {
        status: 400,
        ok: false,
        error: err.message
      };
    }
  },

  // GET /api/metrics
  async getMetrics() {
    const start = performance.now();
    await simulateNetworkLatency(10, 25);

    const metrics = db.getMetrics();
    const duration = parseFloat((performance.now() - start).toFixed(2));

    return {
      status: 200,
      ok: true,
      data: metrics,
      meta: { roundtripMs: duration }
    };
  },

  // GET /api/audit-logs
  async getAuditLogs() {
    const start = performance.now();
    await simulateNetworkLatency(15, 30);

    db.init();
    const duration = parseFloat((performance.now() - start).toFixed(2));

    return {
      status: 200,
      ok: true,
      data: db.auditLogs,
      meta: { roundtripMs: duration }
    };
  },

  // POST /api/database/reset
  async resetDatabase() {
    const start = performance.now();
    await simulateNetworkLatency(30, 70);

    const result = db.resetToSeed();
    const duration = parseFloat((performance.now() - start).toFixed(2));

    return {
      status: 200,
      ok: true,
      message: `Database re-seeded with ${result.count} retail product records`,
      data: result,
      meta: { roundtripMs: duration }
    };
  }
};
