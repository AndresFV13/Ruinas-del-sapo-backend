// src/billing/dto/create-billing.dto.ts
import { IsInt, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class CreateBillingDto {
  @IsInt()
  readonly reservationId: number;

  @IsInt()
  readonly userId: number;

  @IsInt()
  @IsOptional()
  readonly invoiceNumber?: number;

  @IsInt()
  @IsOptional()
  readonly totalAmount?: number;

  @IsInt()
  @IsOptional()
  readonly taxAmount?: number;

  @IsBoolean()
  @IsOptional()
  readonly paymentStatus?: boolean;

  @IsDateString()
  readonly invoiceDate: string;
}
