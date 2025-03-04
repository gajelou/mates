import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bills } from './entities/bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bills)
    private readonly billsRepository: Repository<Bills>,
  ) {}

  async create(createBillDto: CreateBillDto): Promise<Bills> {
    const bill = this.billsRepository.create(createBillDto);
    return await this.billsRepository.save(bill);
  }

  async findAll(): Promise<Bills[]> {
    return await this.billsRepository.find({ relations: ['housing', 'user'] });
  }

  async update(id: number, updateBillDto: UpdateBillDto): Promise<Bills> {
    const bill = await this.billsRepository.preload({ id, ...updateBillDto });
    if (!bill) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }
    return await this.billsRepository.save(bill);
  }

  async remove(id: number): Promise<{ message: string }> {
    const bill = await this.billsRepository.findOne({ where: { id } });
    if (!bill) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }
    await this.billsRepository.delete(id);
    return { message: `Conta ${id} removida com sucesso.` };
  }
}
