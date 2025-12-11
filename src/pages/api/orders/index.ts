import type { APIRoute } from 'astro';

// GET - Get all orders (with filters)
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const userId = url.searchParams.get('userId');
    const status = url.searchParams.get('status');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');

    // In production, fetch from database
    // For demo, return mock orders
    const mockOrders = [
      {
        id: 'order_1',
        orderNumber: 'ORD-001',
        userId: userId || 'user_123',
        status: status || 'pending',
        total: 99.99,
        items: [],
        createdAt: new Date().toISOString()
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      orders: mockOrders,
      pagination: {
        page,
        limit,
        total: mockOrders.length
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get orders'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Create new order
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { userId, items, shippingAddress, paymentInfo, total } = body;

    // Validate input
    if (!userId || !items || !shippingAddress || !paymentInfo || !total) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In production, save to database
    const order = {
      id: `order_${Date.now()}`,
      orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}`,
      userId,
      items,
      shippingAddress,
      paymentInfo,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      success: true,
      order
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create order error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to create order'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

