import { Controller, Res, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { Users } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 

  @Get("all")
  async findAllUsers(@Res() response: Response) {
    const allusers = await this.usersService.findAllUsers()
    return response.status(200).json(allusers)
  }

  @Post('create')
  async createUser(@Res() response: Response, @Body() CreateUserDto:CreateUserDto) {
    const usercreated = await this.usersService.createUser(CreateUserDto)
    return response.status(201).json(usercreated);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userupdated = await this.usersService.updateUser(updateUserDto);
    return userupdated
  }

  @Delete('remove')
  async remove(@Param('id') id: string,  @Body() Users:Users) {
    const userremoved = await this.usersService.removeUser(id);
    return userremoved
  }

}
