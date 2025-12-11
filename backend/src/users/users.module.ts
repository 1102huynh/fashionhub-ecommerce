import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { User } from './entities/user.entity';

// Using mock data - TypeORM commented out for now
@Module({
  imports: [
    // TypeOrmModule.forFeature([User])  // Will be enabled when using real database
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

