import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import {Repository} from 'typeorm';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>
  ) { }


  async createUser(userDto: CreateUserDto): Promise<CreateUserDto> {
    const createdUser = await this.userRepository.save(userDto);
    return createdUser;
  }

  async findAllUsers(): Promise<Users[]> {
    const findAllUsers = await this.userRepository.find()
    return findAllUsers;
  }

  async updateUser(userDto: UpdateUserDto): Promise<UpdateUserDto> {
    const updatedUser = await this.userRepository.save(userDto)
    return updatedUser;
  }
 
  async removeUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id:id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    await this.userRepository.delete(id);
    return { message: `Usuário ${id} removido com sucesso.` };}


}