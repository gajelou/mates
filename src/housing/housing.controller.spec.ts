import { Test, TestingModule } from '@nestjs/testing';
import { HousingController } from './housing.controller';
import { HousingService } from './housing.service';
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';
import { NotFoundException } from '@nestjs/common';
import { Response } from 'express';

describe('HousingController', () => {
    let controller: HousingController;
    let housingService: HousingService;
    let response: Response;
  
    const mockHousing = { id: 1, name: 'Apartamento Centro', address: 'Rua 123', price: 1500 };

    const mockHousingService = {
        findAllHousing: jest.fn().mockResolvedValue([mockHousing]),
        createHousing: jest.fn().mockResolvedValue(mockHousing),
        updateHousing: jest.fn().mockResolvedValue(mockHousing),
        removeHousing: jest.fn().mockResolvedValue({ message: 'Moradia removida com sucesso.' }),
      };
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [HousingController],
        providers: [
        {
            provide: HousingService,
            useValue: mockHousingService,
        },
        ],
    }).compile();

        controller = module.get<HousingController>(HousingController);
        housingService = module.get<HousingService>(HousingService);

        response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    });
    
    it('deve retornar todas as moradias', async () => {
        await controller.findAllHousing(response);

        expect(housingService.findAllHousing).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith([mockHousing]);
    });

    it('deve criar uma moradia', async () => {
        const createHousingDto: CreateHousingDto = { id: 1, name: 'Apartamento Centro'};
    
        await controller.createHousing(response, createHousingDto);
    
        expect(housingService.createHousing).toHaveBeenCalledWith(createHousingDto);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith(mockHousing);
    });
    
    it('deve atualizar uma moradia', async () => {
        const updateHousingDto: UpdateHousingDto = { name: 'Casa Nova' };
    
        const result = await controller.update(1, updateHousingDto);
    
        expect(housingService.updateHousing).toHaveBeenCalledWith(updateHousingDto);
        expect(result).toEqual(mockHousing);
    });
    
    it('deve remover uma moradia existente', async () => {
        const result = await controller.remove(1);
    
        expect(housingService.removeHousing).toHaveBeenCalledWith(1);
        expect(result).toEqual({ message: 'Moradia removida com sucesso.' });
    });
    
    it('deve lançar NotFoundException ao remover uma moradia inexistente', async () => {
        housingService.removeHousing = jest.fn().mockRejectedValue(new NotFoundException('Moradia não encontrada'));
    
        await expect(controller.remove(99)).rejects.toThrow(NotFoundException);
        expect(housingService.removeHousing).toHaveBeenCalledWith(99);
    });
    
})  