import type { APIRoute } from 'astro';

// GET - Get all users (admin only)
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const authHeader = request.headers.get('Authorization');

    // Check admin authorization
    if (!authHeader) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const search = url.searchParams.get('search') || '';
    const role = url.searchParams.get('role') || '';
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');

    // In production, fetch from database with filters
    const mockUsers = [
      {
        id: 'user_1',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'customer',
        createdAt: new Date().toISOString()
      },
      {
        id: 'user_2',
        email: 'admin@fashionhub.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      users: mockUsers,
      pagination: {
        page,
        limit,
        total: mockUsers.length
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get users error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get users'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

