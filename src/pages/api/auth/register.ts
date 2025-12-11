import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phone } = body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return new Response(JSON.stringify({
        success: false,
        error: 'All required fields must be provided'
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

    // In production, save to database
    // For demo, create user object
    const user = {
      id: `user_${Date.now()}`,
      email,
      firstName,
      lastName,
      phone: phone || null,
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return new Response(JSON.stringify({
      success: true,
      user,
      token
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Register error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Registration failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

