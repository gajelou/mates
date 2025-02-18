import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<Users>;

  const mockUser = { id: 1, name: 'João', email: 'joao@email.com', password: '123456' };

  const mockUserRepository = {
    save: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('deve criar um usuário', async () => {
    const result = await service.createUser(mockUser);
    expect(result).toEqual(mockUser);
    expect(userRepository.save).toHaveBeenCalledWith(mockUser);
  });

  it('deve listar todos os usuários', async () => {
    const result = await service.findAllUsers();
    expect(result).toEqual([mockUser]);
    expect(userRepository.find).toHaveBeenCalled();
  });

  it('deve atualizar um usuário', async () => {
    const updatedUser = { ...mockUser, name: 'Carlos' };
    userRepository.save = jest.fn().mockResolvedValue(updatedUser);

    const result = await service.updateUser(updatedUser);
    expect(result).toEqual(updatedUser);
    expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
  });

  it('deve remover um usuário existente', async () => {
    const result = await service.removeUser(1);
    expect(result).toEqual({ message: 'Usuário 1 removido com sucesso.' });
    expect(userRepository.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException ao remover um usuário inexistente', async () => {
    userRepository.findOne = jest.fn().mockResolvedValue(null);
    
    await expect(service.removeUser(99)).rejects.toThrow(NotFoundException);
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
  });
});
