// API Configuration for FashionHub Frontend
// This file contains all API endpoints and helper functions

export const API_BASE_URL = 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    me: `${API_BASE_URL}/auth/me`,
    logout: `${API_BASE_URL}/auth/logout`,
  },

  // Products
  products: {
    list: `${API_BASE_URL}/products`,
    detail: (id: string) => `${API_BASE_URL}/products/${id}`,
    create: `${API_BASE_URL}/products`,
    update: (id: string) => `${API_BASE_URL}/products/${id}`,
    delete: (id: string) => `${API_BASE_URL}/products/${id}`,
  },

  // Orders
  orders: {
    list: `${API_BASE_URL}/orders`,
    detail: (id: string) => `${API_BASE_URL}/orders/${id}`,
    create: `${API_BASE_URL}/orders`,
    update: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },

  // Users
  users: {
    list: `${API_BASE_URL}/users`,
    detail: (id: string) => `${API_BASE_URL}/users/${id}`,
    update: (id: string) => `${API_BASE_URL}/users/${id}`,
    delete: (id: string) => `${API_BASE_URL}/users/${id}`,
  },
};

// Helper function for API calls
export async function apiCall<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { data: null, error: data.message || 'An error occurred' };
    }

    return { data, error: null };
  } catch (error) {
    console.error('API Error:', error);
    return { data: null, error: 'Network error. Please try again.' };
  }
}

// Auth API functions
export const authAPI = {
  async login(email: string, password: string) {
    return apiCall<{ success: boolean; user: any; token: string }>(
      API_ENDPOINTS.auth.login,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
  },

  async register(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) {
    return apiCall<{ success: boolean; user: any; token: string }>(
      API_ENDPOINTS.auth.register,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  async getMe() {
    return apiCall<{ success: boolean; user: any }>(API_ENDPOINTS.auth.me);
  },

  async logout() {
    return apiCall<{ success: boolean; message: string }>(
      API_ENDPOINTS.auth.logout,
      { method: 'POST' }
    );
  },
};

// Products API functions
export const productsAPI = {
  async getAll(params?: { category?: string; search?: string; featured?: boolean; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.featured) searchParams.append('featured', 'true');
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const url = `${API_ENDPOINTS.products.list}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    return apiCall<{ products: any[]; total: number }>(url);
  },

  async getById(id: string) {
    return apiCall<any>(API_ENDPOINTS.products.detail(id));
  },

  async create(data: any) {
    return apiCall<any>(API_ENDPOINTS.products.create, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return apiCall<any>(API_ENDPOINTS.products.update(id), {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiCall<void>(API_ENDPOINTS.products.delete(id), {
      method: 'DELETE',
    });
  },
};

// Orders API functions
export const ordersAPI = {
  async getAll(params?: { status?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const url = `${API_ENDPOINTS.orders.list}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    return apiCall<{ orders: any[]; total: number }>(url);
  },

  async getById(id: string) {
    return apiCall<any>(API_ENDPOINTS.orders.detail(id));
  },

  async create(data: any) {
    return apiCall<any>(API_ENDPOINTS.orders.create, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return apiCall<any>(API_ENDPOINTS.orders.update(id), {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

// Users API functions
export const usersAPI = {
  async getAll(params?: { role?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.role) searchParams.append('role', params.role);
    if (params?.search) searchParams.append('search', params.search);

    const url = `${API_ENDPOINTS.users.list}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    return apiCall<any[]>(url);
  },

  async getById(id: string) {
    return apiCall<any>(API_ENDPOINTS.users.detail(id));
  },

  async update(id: string, data: any) {
    return apiCall<any>(API_ENDPOINTS.users.update(id), {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiCall<void>(API_ENDPOINTS.users.delete(id), {
      method: 'DELETE',
    });
  },
};

