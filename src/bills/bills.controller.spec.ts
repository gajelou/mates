import { Test, TestingModule } from '@nestjs/testing';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Response } from 'express';

describe('BillsController', () => {
  let controller: BillsController;
  let service: BillsService;

  const mockService = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Conta de Luz' }]),
    update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn().mockResolvedValue({ message: 'Conta 1 removida com sucesso.' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillsController],
      providers: [
        {
          provide: BillsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BillsController>(BillsController);
    service = module.get<BillsService>(BillsService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar uma conta e retornar status 201', async () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const dto: CreateBillDto = { description: 'Conta de Água', amount: 12, dueDate: '03/12/1990', housingId:1, userId:1  };

    await controller.create(res, dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...dto });
  });

  it('deve retornar todas as contas com status 200', async () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    await controller.findAll(res);

    expect(service.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Conta de Luz' }]);
  });

  it('deve atualizar uma conta e retornar os dados atualizados', async () => {
    const dto: UpdateBillDto = { description: 'Conta Atualizada' };
    const result = await controller.update(1, dto);

    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('deve remover uma conta e retornar mensagem de sucesso', async () => {
    const result = await controller.remove(1);

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ message: 'Conta 1 removida com sucesso.' });
  });
});
