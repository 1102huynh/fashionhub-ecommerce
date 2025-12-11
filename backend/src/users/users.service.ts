import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { mockDB } from '../database/mock-database';

@Injectable()
export class UsersService {
  // Using mock database instead of TypeORM for now
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  // ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = mockDB.createUser({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'customer',
      isActive: true,
    });

    return user;
  }

  async findAll(query?: any) {
    let users = mockDB.getAllUsers();

    if (query?.role) {
      users = users.filter(user => user.role === query.role);
    }

    if (query?.search) {
      const searchLower = query.search.toLowerCase();
      users = users.filter(user =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    return users;
  }

  async findOne(id: string) {
    const user = mockDB.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return mockDB.getUserByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = mockDB.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Check if exists
    const deleted = mockDB.deleteUser(id);
    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
