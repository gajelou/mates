import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';
import { IsNumber, IsPositive, IsNotEmpty, MinLength, MaxLength, IsString } from "class-validator";

export class UpdateBillDto extends PartialType(CreateBillDto) {
    
    @IsString()
    description?: string;

    @IsPositive()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 0 })
    @MinLength(6)
    @MaxLength(6)
    amount?: number;

    dueDate?: string;
  }
