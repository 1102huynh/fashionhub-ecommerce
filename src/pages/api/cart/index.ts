import type { APIRoute } from 'astro';
import type { CartItem } from '../../../types/ecommerce.js';

// Simple in-memory cart storage for demo
// In production, this would use a database
const carts = new Map<string, CartItem[]>();

export const GET: APIRoute = async ({ url, request }) => {
  const sessionId = getSessionId(request);
  const cartItems = carts.get(sessionId) || [];

  return new Response(JSON.stringify({
    success: true,
    data: cartItems,
    total: calculateCartTotal(cartItems)
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { productId, variantId, quantity = 1 } = await request.json();
    const sessionId = getSessionId(request);

    if (!productId || !variantId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Product ID and variant ID are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current cart
    let cartItems = carts.get(sessionId) || [];

    // Check if item already exists
    const existingItemIndex = cartItems.findIndex(
      item => item.variantId === variantId
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item - in a real app, you'd fetch product/variant data from database
      const newItem: CartItem = {
        id: `cartitem-${Date.now()}`,
        productId,
        variantId,
        quantity,
        product: null as any, // Would be populated from database
        variant: null as any, // Would be populated from database
        addedAt: new Date()
      };
      cartItems.push(newItem);
    }

    carts.set(sessionId, cartItems);

    return new Response(JSON.stringify({
      success: true,
      data: cartItems,
      total: calculateCartTotal(cartItems),
      message: 'Item added to cart'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const { variantId, quantity } = await request.json();
    const sessionId = getSessionId(request);

    if (!variantId || typeof quantity !== 'number') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Variant ID and quantity are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let cartItems = carts.get(sessionId) || [];

    if (quantity <= 0) {
      // Remove item
      cartItems = cartItems.filter(item => item.variantId !== variantId);
    } else {
      // Update quantity
      const itemIndex = cartItems.findIndex(item => item.variantId === variantId);
      if (itemIndex >= 0) {
        cartItems[itemIndex].quantity = quantity;
      }
    }

    carts.set(sessionId, cartItems);

    return new Response(JSON.stringify({
      success: true,
      data: cartItems,
      total: calculateCartTotal(cartItems),
      message: quantity <= 0 ? 'Item removed from cart' : 'Cart updated'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { variantId } = await request.json();
    const sessionId = getSessionId(request);

    let cartItems = carts.get(sessionId) || [];

    if (variantId) {
      // Remove specific item
      cartItems = cartItems.filter(item => item.variantId !== variantId);
    } else {
      // Clear entire cart
      cartItems = [];
    }

    carts.set(sessionId, cartItems);

    return new Response(JSON.stringify({
      success: true,
      data: cartItems,
      total: calculateCartTotal(cartItems),
      message: variantId ? 'Item removed from cart' : 'Cart cleared'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Helper functions
function getSessionId(request: Request): string {
  // In a real app, you'd get this from cookies or session
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `session-${btoa(userAgent).slice(0, 10)}`;
}

function calculateCartTotal(items: CartItem[]): number {
  // Simplified calculation - in real app, you'd use actual product prices
  return items.reduce((total, item) => total + (29.99 * item.quantity), 0);
}
