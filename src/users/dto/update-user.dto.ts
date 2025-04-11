import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly username?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    readonly password?: string;

    @IsString()
    readonly createdAt?: string;

    @IsString()
    readonly updatedAt?: string;
}
