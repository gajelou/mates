import { IsNumber, IsPositive, isNumberString, IsNotEmpty, IsString, MinLength, MaxLength, } from "class-validator";

export class CreateBillDto {
    @IsString()
    readonly description: string;

    @IsPositive()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 0 })
    @MinLength(6)
    @MaxLength(6)
    amount: number;

    @IsString()
    dueDate: string;

    @IsNumber()
    housingId: number;

    @IsNumber()
    userId: number;
  }
  