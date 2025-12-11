// Authentication state management
import { nanoid } from 'nanoid';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

class AuthManager {
  private readonly STORAGE_KEY = 'fashionhub_auth';
  private readonly TOKEN_KEY = 'fashionhub_token';

  constructor() {
    // Listen for storage changes (for multi-tab support)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === this.STORAGE_KEY) {
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

  // Get current user
  getCurrentUser(): User | null {
    return this.getAuthState().user;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getAuthState().isAuthenticated;
  }

  // Login with email and password
  async login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      // Simulate API call - In production, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo: Accept any email/password for testing
      // In production, validate against backend
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Create user object
      const user: User = {
        id: nanoid(),
        email: email,
        firstName: email.split('@')[0],
        lastName: 'User',
        createdAt: new Date()
      };

      // Generate token (in production, this comes from backend)
      const token = nanoid(32);

      // Store auth data
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);

      // Dispatch event
      this.dispatchAuthEvent();

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  // Register new user
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate input
      if (!data.email || !data.password || !data.firstName || !data.lastName) {
        return { success: false, error: 'All fields are required' };
      }

      if (data.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Create user
      const user: User = {
        id: nanoid(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        createdAt: new Date()
      };

      // Generate token
      const token = nanoid(32);

      // Store auth data
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);

      // Dispatch event
      this.dispatchAuthEvent();

      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.dispatchAuthEvent();
  }

  // Update user profile
  updateProfile(updates: Partial<User>): { success: boolean; error?: string } {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return { success: false, error: 'Not authenticated' };
      }

      const updatedUser = {
        ...currentUser,
        ...updates,
        id: currentUser.id, // Prevent ID change
        createdAt: currentUser.createdAt // Prevent date change
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
      this.dispatchAuthEvent();

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }

  // Dispatch auth update event
  private dispatchAuthEvent(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth-updated'));
    }
  }
}

// Export singleton instance
export const authManager = new AuthManager();

