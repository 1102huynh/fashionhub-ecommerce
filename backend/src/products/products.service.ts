import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { mockDB } from '../database/mock-database';

@Injectable()
export class ProductsService {
  // Using mock database instead of TypeORM
  // constructor(
  //   @InjectRepository(Product)
  //   private productsRepository: Repository<Product>,
  // ) {}

  async create(createProductDto: CreateProductDto) {
    const product = mockDB.createProduct({
      ...createProductDto,
      rating: createProductDto.rating || 0,
      reviewCount: createProductDto.reviewCount || 0,
      featured: createProductDto.featured || false,
      isActive: createProductDto.isActive !== false,
    });
    return product;
  }

  async findAll(query?: any) {
    let products = mockDB.getAllProducts();

    // Filter active products
    products = products.filter(p => p.isActive);

    if (query?.category) {
      products = products.filter(p => p.category === query.category);
    }

    if (query?.search) {
      const searchLower = query.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (query?.featured) {
      products = products.filter(p => p.featured === true);
    }

    const page = parseInt(query?.page) || 1;
    const limit = parseInt(query?.limit) || 10;
    const skip = (page - 1) * limit;

    const total = products.length;
    const paginatedProducts = products.slice(skip, skip + limit);

    return { products: paginatedProducts, total };
  }

  async findOne(id: string) {
    const product = mockDB.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Check if exists

    const updatedProduct = mockDB.updateProduct(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Check if exists
    const deleted = mockDB.deleteProduct(id);
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
