import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
// import { Order } from './entities/order.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Order])  // Will be enabled when using real database
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}

