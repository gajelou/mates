import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './entities/bill.entity';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bills])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
