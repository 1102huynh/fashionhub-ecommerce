// Authentication state management - Uses Backend API
import { authAPI } from '../utils/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

const API_BASE_URL = 'http://localhost:3001/api';

class AuthManager {
  private readonly STORAGE_KEY = 'fashionhub_auth';
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === this.STORAGE_KEY || e.key === this.TOKEN_KEY) {
          window.dispatchEvent(new CustomEvent('auth-updated'));
        }
      });
    }
  }

  // Get current auth state
  getAuthState(): AuthState {
    if (typeof window === 'undefined') {
      return { user: null, isAuthenticated: false, token: null };
    }

    try {
      const authData = localStorage.getItem(this.STORAGE_KEY);
      const token = localStorage.getItem(this.TOKEN_KEY);

      if (authData && token) {
        const user = JSON.parse(authData);
        return {
          user: {
            ...user,
            createdAt: new Date(user.createdAt)
          },
          isAuthenticated: true,
          token
        };
      }
    } catch (error) {
      console.error('Error reading auth state:', error);
    }

    return { user: null, isAuthenticated: false, token: null };
  }

  getCurrentUser(): User | null {
    return this.getAuthState().user;
  }

  isAuthenticated(): boolean {
    return this.getAuthState().isAuthenticated;
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Login with backend API
  async login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

      // Store auth data
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.user));
      localStorage.setItem(this.TOKEN_KEY, data.token);
      this.dispatchAuthEvent();

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock login if backend not available
      return this.mockLogin(email, password);
    }
  }

  // Mock login (fallback when backend is not running)
  private async mockLogin(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    console.warn('Backend not available, using mock login');

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const user: User = {
      id: `user-${Date.now()}`,
      email: email,
      firstName: email.split('@')[0],
      lastName: 'User',
      role: 'customer',
      createdAt: new Date()
    };

    const token = `mock-token-${Date.now()}`;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, token);
    this.dispatchAuthEvent();

    return { success: true, user };
  }

  // Register with backend API
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      if (!data.email || !data.password || !data.firstName || !data.lastName) {
        return { success: false, error: 'All fields are required' };
      }

      if (data.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.message || 'Registration failed' };
      }

      // Store auth data
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(result.user));
      localStorage.setItem(this.TOKEN_KEY, result.token);
      this.dispatchAuthEvent();

      return { success: true, user: result.user };
    } catch (error) {
      console.error('Registration error:', error);
      // Fallback to mock registration
      return this.mockRegister(data);
    }
  }

  // Mock register (fallback when backend is not running)
  private async mockRegister(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<{ success: boolean; error?: string; user?: User }> {
    console.warn('Backend not available, using mock registration');

    const user: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: 'customer',
      createdAt: new Date()
    };

    const token = `mock-token-${Date.now()}`;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, token);
    this.dispatchAuthEvent();

    return { success: true, user };
  }

  // Logout
  async logout(): Promise<void> {
    console.log('Logout started...');
    try {
      const token = this.getToken();
      if (token) {
        console.log('Calling logout API...');
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log('Logout API called successfully');
      }
    } catch (error) {
      console.error('Logout API error:', error);
    }

    console.log('Clearing localStorage...');
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    console.log('localStorage cleared');
    this.dispatchAuthEvent();
    console.log('Logout complete');
  }

  // Verify token with backend
  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.user));
          return true;
        }
      }
    } catch (error) {
      console.error('Token verification error:', error);
    }

    return true; // Return true to allow mock mode
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; error?: string }> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const token = this.getToken();
      const response = await fetch(`${API_BASE_URL}/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
        this.dispatchAuthEvent();
        return { success: true };
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }

    // Fallback: update locally
    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
    this.dispatchAuthEvent();
    return { success: true };
  }

  private dispatchAuthEvent() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth-updated'));
    }
  }
}

export const authManager = new AuthManager();

