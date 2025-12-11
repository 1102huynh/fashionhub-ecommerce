import { IsArray, IsObject, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  items: any[];

  @IsObject()
  shippingAddress: any;

  @IsObject()
  paymentInfo: any;

  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsNumber()
  @Min(0)
  shippingCost: number;

  @IsNumber()
  @Min(0)
  tax: number;

  @IsNumber()
  @Min(0)
  total: number;

  @IsOptional()
  userId?: string;
}

