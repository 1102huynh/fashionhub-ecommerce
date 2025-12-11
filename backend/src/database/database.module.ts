import { Module } from '@nestjs/common';

// Using mock database for now - will be replaced with real database later
// When ready to use real database:
// 1. Uncomment TypeORM imports and configuration
// 2. Update .env with database credentials
// 3. Run npm run start:dev

@Module({
  imports: [
    // TypeORM configuration is disabled - using mock data
    // Enable when database is ready
  ],
})
export class DatabaseModule {}

