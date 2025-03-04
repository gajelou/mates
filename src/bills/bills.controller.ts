import { Controller, Post, Get, Patch, Delete, Param, Body, Res } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Response } from 'express';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post('create')
  async create(@Res() res: Response, @Body() createBillDto: CreateBillDto) {
    const bill = await this.billsService.create(createBillDto);
    return res.status(201).json(bill);
  }

  @Get('all')
  async findAll(@Res() res: Response) {
    const bills = await this.billsService.findAll();
    return res.status(200).json(bills);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBillDto: UpdateBillDto) {
    return await this.billsService.update(id, updateBillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.billsService.remove(id);
  }
}
