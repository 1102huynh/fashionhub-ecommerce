import type { APIRoute } from 'astro';

// GET - Get order by ID
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In production, fetch from database
    const order = {
      id,
      orderNumber: `ORD-${id.substring(0, 8).toUpperCase()}`,
      userId: 'user_123',
      status: 'pending',
      total: 99.99,
      items: [],
      shippingAddress: {},
      createdAt: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      success: true,
      order
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get order error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get order'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT - Update order
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In production, update in database
    const updatedOrder = {
      id,
      ...body,
      updatedAt: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      success: true,
      order: updatedOrder
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Update order error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update order'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE - Cancel order
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In production, update status in database
    return new Response(JSON.stringify({
      success: true,
      message: 'Order cancelled successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to cancel order'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

