import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email and password are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Password must be at least 6 characters'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In production, validate against database
    // For demo, accept any valid email/password
    const user = {
      id: `user_${Date.now()}`,
      email: email,
      firstName: email.split('@')[0],
      lastName: 'User',
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return new Response(JSON.stringify({
      success: true,
      user,
      token
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Login failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

