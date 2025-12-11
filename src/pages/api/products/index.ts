import type { APIRoute } from 'astro';
import { mockProducts } from '../../../utils/mock-data.js';

export const GET: APIRoute = async ({ url }) => {
  const searchParams = new URL(url).searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured') === 'true';
  const sale = searchParams.get('sale') === 'true';
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const sortBy = searchParams.get('sortBy') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  try {
    let filteredProducts = [...mockProducts];

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.slug === category
      );
    }

    if (search) {
      const query = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (featured) {
      filteredProducts = filteredProducts.filter(product => product.featured);
    }

    if (sale) {
      filteredProducts = filteredProducts.filter(product => !!product.salePrice);
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.salePrice || product.price;
        return price >= minPrice;
      });
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.salePrice || product.price;
        return price <= maxPrice;
      });
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'price':
          aValue = a.salePrice || a.price;
          bValue = b.salePrice || b.price;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'createdAt':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }

      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    // Apply pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return new Response(JSON.stringify({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
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
