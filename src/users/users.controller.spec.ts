import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { Response } from 'express';


describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;
    let response: Response;
  
    const mockUser = { id: 1, name: 'João', email: 'joao@email.com', password: '123456' };

    const mockUsersService = {
        findAllUsers: jest.fn().mockResolvedValue([mockUser]),
        createUser: jest.fn().mockResolvedValue(mockUser),
        updateUser: jest.fn().mockResolvedValue(mockUser),
        removeUser: jest.fn().mockResolvedValue({ message: 'Usuário removido com sucesso.' }),
      };
    
    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
        {
            provide: UsersService,
            useValue: mockUsersService,
        },
        ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);

    response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    });

    it('deve retornar todos os usuários', async () => {
        await controller.findAllUsers(response);

        expect(usersService.findAllUsers).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith([mockUser]);
    });
    
    it('deve criar um usuário', async () => {
        const createUserDto: CreateUserDto = { id: 123, name: 'João', email: 'joao@email.com', password: '123456' };

        await controller.createUser(response, createUserDto);

        expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith(mockUser);
    });
    
    it('deve atualizar um usuário', async () => {
        const updateUserDto: UpdateUserDto = {id: 123, name: 'Carlos' };
    
        const result = await controller.update(1, updateUserDto);
    
        expect(usersService.updateUser).toHaveBeenCalledWith(updateUserDto);
        expect(result).toEqual(mockUser);
    });

    it('deve remover um usuário existente', async () => {
        const result = await controller.remove(1);

        expect(usersService.removeUser).toHaveBeenCalledWith(1);
        expect(result).toEqual({ message: 'Usuário removido com sucesso.' });
    });
    
    it('deve lançar NotFoundException ao remover um usuário inexistente', async () => {
        usersService.removeUser = jest.fn().mockRejectedValue(new NotFoundException('Usuário não encontrado'));
    
        await expect(controller.remove(99)).rejects.toThrow(NotFoundException);
        expect(usersService.removeUser).toHaveBeenCalledWith(99);
    });
    
    
})  