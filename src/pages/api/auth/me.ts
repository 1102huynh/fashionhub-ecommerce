import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No authorization token provided'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In production, decode token and fetch user from database
    // For demo, return mock user
    const user = {
      id: 'user_123',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'customer'
    };

    return new Response(JSON.stringify({
      success: true,
      user
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get user error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get user'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

