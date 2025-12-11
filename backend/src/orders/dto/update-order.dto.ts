import { IsOptional, IsEnum, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  estimatedDelivery?: Date;
}

