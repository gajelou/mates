import { Controller, Res, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HousingService } from './housing.service';
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';
import { Response } from 'express';
import { ParseIntPipe } from '@nestjs/common';
@Controller('users')
export class HousingController {
  constructor(private readonly housingService: HousingService) {}

 

  @Get("all")
  async findAllHousing(@Res() response: Response) {
    const allhousing = await this.housingService.findAllHousing();
    return response.status(200).json(allhousing);
  }

  @Post('create')
  async createHousing(@Res() response: Response, @Body() CreateHousingDto:CreateHousingDto) {
    const housingcreated = await this.housingService.createHousing(CreateHousingDto);
    return response.status(201).json(housingcreated);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() UpdateHousingDto: UpdateHousingDto) {
    const housingupdated = await this.housingService.updateHousing(UpdateHousingDto);
    return housingupdated;
  }

  @Delete(':id')
async remove(@Param('id', ParseIntPipe) id: number) {
  return await this.housingService.removeHousing(id);
}
}
