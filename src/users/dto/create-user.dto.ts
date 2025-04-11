import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {

    @IsString()
    readonly username:string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    readonly createdAt?: string;

    @IsString()
    readonly updatedAt?: string;

}
