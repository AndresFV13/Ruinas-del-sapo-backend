// src/billing/dto/update-billing.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingDto } from './create-billing.dto';

export class UpdateBillingDto extends PartialType(CreateBillingDto) {}
