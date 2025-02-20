
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Housing } from './entities/housing.entity';
import { Injectable } from '@nestjs/common';



@Injectable()
export class HousingService {
  constructor(
    @InjectRepository(Housing)
    private readonly housingRepository: Repository<Housing>
  ) { }


  async createHousing(housingDto: CreateHousingDto): Promise<CreateHousingDto> {
    const createdHousing = await this.housingRepository.save(housingDto);
    return createdHousing;
  }

  async findAllHousing(): Promise<Housing[]> {
    const findAllHousing = await this.housingRepository.find();
    return findAllHousing;
  }

  async updateHousing(housingDto: UpdateHousingDto): Promise<UpdateHousingDto> {
    const updatedHousing = await this.housingRepository.save(housingDto)
    return updatedHousing;
  }
 
  async removeHousing(id: number): Promise<{ message: string }> {
    const user = await this.housingRepository.findOne({ where: { id:id } });

    if (!user) {
      throw new NotFoundException(`Housing com ID ${id} não encontrado.`);
    }

    await this.housingRepository.delete(id);
    return { message: `Housing ${id} removida com sucesso.` };}


}
