const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Helper function to get auth token
function getAuthToken() {
  return localStorage.getItem('token');
}

// Enhanced fetch function with error handling and auth
export async function fetchJSON(path, opts = {}) {
  const token = getAuthToken();
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'x-auth-token': token })
  };

  const config = {
    ...opts,
    headers: {
      ...defaultHeaders,
      ...opts.headers
    }
  };

  try {
    const res = await fetch(`${BASE}${path}`, config);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Network error' }));
      
      // Handle token expiration
      if (res.status === 401 && errorData.message?.includes('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      throw new Error(errorData.message || `HTTP ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Specific API functions
export const api = {
  // Auth
  login: (username, password) => 
    fetchJSON('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
  
  register: (userData) => 
    fetchJSON('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  // Orders
  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/orders${query ? `?${query}` : ''}`);
  },
  
  createOrder: (orderData) => 
    fetchJSON('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    }),
  
  updateOrderStatus: (id, status) => 
    fetchJSON(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }),

  // Menu
  getMenu: () => fetchJSON('/menu'),
  
  createMenuItem: (itemData) => 
    fetchJSON('/menu', {
      method: 'POST',
      body: JSON.stringify(itemData)
    }),

  // Customers
  getCustomers: () => fetchJSON('/customers'),
  
  createCustomer: (customerData) => 
    fetchJSON('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData)
    }),

  updateCustomer: (id, customerData) => 
    fetchJSON(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData)
    }),

  deleteCustomer: (id) => 
    fetchJSON(`/customers/${id}`, {
      method: 'DELETE'
    }),

  // Staff
  // Returns backend shape { success, data: { staff, pagination } }
  // Keep shape so pages expecting response.data.staff continue to work
  getStaff: () => fetchJSON('/staff'),
  
  createStaff: (staffData) => 
    fetchJSON('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData)
    }),

  updateStaff: (id, staffData) => 
    fetchJSON(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(staffData)
    }),

  deleteStaff: (id) => 
    fetchJSON(`/staff/${id}`, {
      method: 'DELETE'
    }),

  // Unwrap to data object so reports page can use fields directly
  getStaffStats: async () => {
    const res = await fetchJSON('/staff/stats/overview');
    return res.data ?? res;
  },

  // Inventory
  // Unwrap to data object so pages can read response.inventory
  getInventory: async () => {
    const res = await fetchJSON('/inventory');
    return res.data ?? res;
  },
  
  createInventory: (inventoryData) => 
    fetchJSON('/inventory', {
      method: 'POST',
      body: JSON.stringify(inventoryData)
    }),

  updateInventory: (id, inventoryData) => 
    fetchJSON(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inventoryData)
    }),

  deleteInventory: (id) => 
    fetchJSON(`/inventory/${id}`, {
      method: 'DELETE'
    }),

  updateStock: (id, stockData) => 
    fetchJSON(`/inventory/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify(stockData)
    }),

  // Unwrap to data for reports and inventory pages
  getInventoryStats: async () => {
    const res = await fetchJSON('/inventory/stats/overview');
    return res.data ?? res;
  },

  // Return the array directly for UI convenience
  getLowStockAlerts: async () => {
    const res = await fetchJSON('/inventory/alerts/low-stock');
    return res.data ?? res;
  },

  // Reviews
  getReviews: () => fetchJSON('/reviews'),
  createReview: (reviewData) => fetchJSON('/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),
  updateReview: (id, reviewData) => fetchJSON(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify(reviewData) }),
  deleteReview: (id) => fetchJSON(`/reviews/${id}`, { method: 'DELETE' }),
  // Unwrap to data so reports and reviews pages read fields directly
  getReviewStats: async () => {
    const res = await fetchJSON('/reviews/stats/overview');
    return res.data ?? res;
  }
};