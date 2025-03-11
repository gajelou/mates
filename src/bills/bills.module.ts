import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './entities/bill.entity';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Users } from '../users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Bills, Users])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
