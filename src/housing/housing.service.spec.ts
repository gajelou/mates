import { Test, TestingModule } from '@nestjs/testing';
import { HousingService } from './housing.service';
import { Repository } from 'typeorm';
import { Housing } from './entities/housing.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('HousingService', () => {
  let service: HousingService;
  let housingRepository: Repository<Housing>;

  const mockHousing = { id: 1, name: 'Casinha' };

  const mockHousingRepository = {
    save: jest.fn().mockResolvedValue(mockHousing),
    find: jest.fn().mockResolvedValue([mockHousing]),
    findOne: jest.fn().mockResolvedValue(mockHousing),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HousingService,
        {
          provide: getRepositoryToken(Housing),
          useValue: mockHousingRepository,
        },
      ],
    }).compile();

    service = module.get<HousingService>(HousingService);
    housingRepository = module.get<Repository<Housing>>(getRepositoryToken(Housing));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(housingRepository).toBeDefined();
  });

  it('should create a Housing', async () => {
    const result = await service.createHousing(mockHousing);
    expect(result).toEqual(mockHousing);
    expect(housingRepository.save).toHaveBeenCalledWith(mockHousing);
  });

  it('should list all usershousing', async () => {
    const result = await service.findAllHousing();
    expect(result).toEqual([mockHousing]);
    expect(housingRepository.find).toHaveBeenCalled();
  });

  it('should update a housing', async () => {
    const updatedHousing = { ...mockHousing, name: 'Toquinha' };
    housingRepository.save = jest.fn().mockResolvedValue(updatedHousing);

    const result = await service.updateHousing(updatedHousing);
    expect(result).toEqual(updatedHousing);
    expect(housingRepository.save).toHaveBeenCalledWith(updatedHousing);
  });

  it('should remove an existing Housing', async () => {
    const result = await service.removeHousing(1);
    expect(result).toEqual({ message: 'Housing 1 removida com sucesso.' });
    expect(housingRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when removing a non-existent user', async () => {
    housingRepository.findOne = jest.fn().mockResolvedValue(null);
    
    await expect(service.removeHousing(99)).rejects.toThrow(NotFoundException);
    expect(housingRepository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
  });
});
