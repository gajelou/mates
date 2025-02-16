import { Controller, Res, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ParseIntPipe } from '@nestjs/common';
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
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const userupdated = await this.usersService.updateUser(updateUserDto);
    return userupdated
  }

  @Delete(':id')
async remove(@Param('id', ParseIntPipe) id: number) {
  return await this.usersService.removeUser(id);
}
}
