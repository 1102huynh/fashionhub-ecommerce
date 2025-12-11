import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { mockDB } from '../database/mock-database';

@Injectable()
export class OrdersService {
  // Using mock database instead of TypeORM
  // constructor(
  //   @InjectRepository(Order)
  //   private ordersRepository: Repository<Order>,
  // ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = mockDB.createOrder({
      ...createOrderDto,
      userId: createOrderDto.userId || '',
      status: 'pending',
    });

    return order;
  }

  async findAll(query?: any) {
    let orders = mockDB.getAllOrders();

    if (query?.userId) {
      orders = orders.filter(o => o.userId === query.userId);
    }

    if (query?.status) {
      orders = orders.filter(o => o.status === query.status);
    }

    // Sort by createdAt descending
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const page = parseInt(query?.page) || 1;
    const limit = parseInt(query?.limit) || 10;
    const skip = (page - 1) * limit;

    const total = orders.length;
    const paginatedOrders = orders.slice(skip, skip + limit);

    return { orders: paginatedOrders, total };
  }

  async findOne(id: string) {
    const order = mockDB.getOrderById(id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id); // Check if exists

    const updatedOrder = mockDB.updateOrder(id, updateOrderDto);
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return updatedOrder;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Check if exists
    const deleted = mockDB.deleteOrder(id);
    if (!deleted) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
